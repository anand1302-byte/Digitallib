import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { Logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    Logger.info('Login attempt', { email });

    if (!email || !password) {
      Logger.warn('Login failed: Missing credentials', { email });
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('digitallib');
    Logger.db('FIND', 'users', { email });
    
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      Logger.warn('Login failed: User not found', { email });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      Logger.warn('Login failed: Invalid password', { email });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    Logger.success('User logged in successfully', { email, role: user.role });
    return NextResponse.json({ 
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });

  } catch (error) {
    Logger.error('Login error', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}