import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { BorrowDocument } from '@/lib/models';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const { bookId } = await request.json();
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    const userId = decoded.userId;

    const client = await clientPromise;
    const db = client.db('digitallib');

    // Check if book exists and is available
    const book = await db.collection('books').findOne({ _id: new ObjectId(bookId) });
    if (!book || !book.isAvailable) {
      return NextResponse.json({ error: 'Book not available' }, { status: 400 });
    }

    // Check if user already borrowed this book
    const existingBorrow = await db.collection('borrows').findOne({
      bookId,
      userId,
      status: 'active'
    });

    if (existingBorrow) {
      return NextResponse.json({ error: 'Book already borrowed' }, { status: 400 });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14 days from now

    const borrowData: BorrowDocument = {
      bookId,
      userId,
      borrowedAt: new Date(),
      dueDate,
      status: 'active'
    };

    await db.collection('borrows').insertOne(borrowData);
    await db.collection('books').updateOne(
      { _id: new ObjectId(bookId) },
      { $set: { isAvailable: false } }
    );

    return NextResponse.json({ 
      success: true,
      dueDate,
      message: 'Book borrowed successfully' 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to borrow book' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    const userId = decoded.userId;

    const client = await clientPromise;
    const db = client.db('digitallib');

    const borrows = await db.collection('borrows').aggregate([
      { $match: { userId, status: 'active' } },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'book'
        }
      },
      { $unwind: '$book' },
      {
        $project: {
          _id: 1,
          borrowedAt: 1,
          dueDate: 1,
          status: 1,
          'book.title': 1,
          'book.author': 1,
          'book.category': 1
        }
      }
    ]).toArray();

    return NextResponse.json({ borrows });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch borrowed books' }, { status: 500 });
  }
}