export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  language?: string;
  createdAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  type: 'ebook' | 'audiobook' | 'magazine' | 'newspaper';
  description: string;
  coverImage: string;
  rating: number;
  totalRatings: number;
  isAvailable: boolean;
  publishedYear: number;
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  userId: string;
  borrowedAt: Date;
  dueDate: Date;
  returnedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  bookCount: number;
}