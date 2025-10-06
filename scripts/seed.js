const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = 'mongodb+srv://anandjethava538:4SWcDk5OcAB7mDCk@shapetinduction.qw8ya.mongodb.net/LMS?retryWrites=true&w=majority&appName=ShapetInduction';

async function seedAdmin() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('digitallib');
    
    // Check if admin already exists
    const existingAdmin = await db.collection('users').findOne({ email: 'admin@lib.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
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
    console.log('Admin user created successfully');
    console.log('Email: admin@lib.com');
    console.log('Password: pass1234');
    
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await client.close();
  }
}

seedAdmin();