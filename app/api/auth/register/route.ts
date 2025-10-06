import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { UserDocument } from '@/lib/models';
import { Logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, gender, language, password } = await request.json();
    Logger.info('Registration attempt', { email, name });

    if (!name || !email || !password) {
      Logger.warn('Registration failed: Missing required fields', { email, name });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('digitallib');
    Logger.db('FIND', 'users', { email });
    
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      Logger.warn('Registration failed: User already exists', { email });
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData: UserDocument = {
      name,
      email,
      phone,
      gender,
      language,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    Logger.db('INSERT', 'users', { email, name });
    const result = await db.collection('users').insertOne(userData);
    Logger.success('User registered successfully', { email, userId: result.insertedId });
    
    return NextResponse.json({ 
      success: true, 
      userId: result.insertedId,
      message: 'User registered successfully' 
    });

  } catch (error) {
    Logger.error('Registration error', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}