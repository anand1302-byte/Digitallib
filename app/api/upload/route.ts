import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { BookDocument } from '@/lib/models';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;

    if (!file || !title || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    const client = await clientPromise;
    const db = client.db('digitallib');
    
    const bookData: BookDocument = {
      title,
      author,
      category,
      type: type as any,
      description,
      fileData: base64Data,
      fileName: file.name,
      fileType: file.type,
      rating: 0,
      totalRatings: 0,
      isAvailable: true,
      publishedYear: new Date().getFullYear(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('books').insertOne(bookData);
    
    return NextResponse.json({ 
      success: true, 
      bookId: result.insertedId,
      message: 'Book uploaded successfully' 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}