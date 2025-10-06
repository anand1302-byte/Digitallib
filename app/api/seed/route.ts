import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('digitallib');
    
    // Check if admin already exists
    const existingAdmin = await db.collection('users').findOne({ email: 'admin@lib.com' });
    
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin user already exists' });
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('pass1234', 12);
    
    const adminUser = {
      name: 'Admin User',
      email: 'admin@lib.com',
      phone: '+1234567890',
      gender: 'other',
      language: 'english',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('users').insertOne(adminUser);
    
    return NextResponse.json({ 
      success: true,
      message: 'Admin user created successfully',
      credentials: {
        email: 'admin@lib.com',
        password: 'pass1234'
      }
    });
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed admin user' }, { status: 500 });
  }
}