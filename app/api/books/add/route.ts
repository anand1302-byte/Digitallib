import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { BookDocument } from '@/lib/models';
import { Logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;

    Logger.info('Book upload attempt', { title, author, category, type });

    if (!title || !author || !category) {
      Logger.warn('Book upload failed: Missing required fields', { title, author, category });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let fileData = '';
    let fileName = '';
    let fileType = '';

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fileData = buffer.toString('base64');
      fileName = file.name;
      fileType = file.type;
    }

    const client = await clientPromise;
    const db = client.db('digitallib');
    
    const bookData: BookDocument = {
      title,
      author,
      category,
      type: type as any || 'ebook',
      description: description || '',
      fileData,
      fileName,
      fileType,
      rating: 0,
      totalRatings: 0,
      isAvailable: true,
      publishedYear: new Date().getFullYear(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    Logger.db('INSERT', 'books', { title, author, category });
    const result = await db.collection('books').insertOne(bookData);
    Logger.success('Book added successfully', { title, bookId: result.insertedId });
    
    return NextResponse.json({ 
      success: true, 
      bookId: result.insertedId,
      message: 'Book added successfully' 
    });

  } catch (error) {
    Logger.error('Book upload failed', error);
    return NextResponse.json({ error: 'Failed to add book' }, { status: 500 });
  }
}