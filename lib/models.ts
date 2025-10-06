import { ObjectId } from 'mongodb';

export interface UserDocument {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  language?: string;
  password: string;
  role?: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface BookDocument {
  _id?: ObjectId;
  title: string;
  author: string;
  category: string;
  type: 'ebook' | 'audiobook' | 'magazine' | 'newspaper';
  description: string;
  coverImage?: string;
  fileData?: string; // Base64 encoded file
  fileName?: string;
  fileType?: string;
  rating: number;
  totalRatings: number;
  isAvailable: boolean;
  publishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BorrowDocument {
  _id?: ObjectId;
  bookId: string;
  userId: string;
  borrowedAt: Date;
  dueDate: Date;
  returnedAt?: Date;
  status: 'active' | 'returned' | 'overdue';
}