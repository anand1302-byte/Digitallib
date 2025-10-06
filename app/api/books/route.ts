import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    const client = await clientPromise;
    const db = client.db('digitallib');
    
    let filter: any = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (type && type !== 'all') {
      filter.type = type;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const books = await db.collection('books')
      .find(filter)
      .project({ fileData: 0 }) // Exclude file data from list
      .toArray();

    return NextResponse.json({ books });

  } catch (error) {
    console.error('Books fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}