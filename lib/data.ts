import { Book, Category } from '@/types';

export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self-Help',
    type: 'ebook',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    coverImage: '/api/placeholder/300/400',
    rating: 4.8,
    totalRatings: 12543,
    isAvailable: true,
    publishedYear: 2018
  },
  {
    id: '2',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    category: 'Fantasy',
    type: 'ebook',
    description: 'The first book in the magical Harry Potter series',
    coverImage: '/api/placeholder/300/400',
    rating: 4.9,
    totalRatings: 25678,
    isAvailable: true,
    publishedYear: 1997
  },
  {
    id: '3',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    category: 'Finance',
    type: 'audiobook',
    description: 'Timeless lessons on wealth, greed, and happiness',
    coverImage: '/api/placeholder/300/400',
    rating: 4.7,
    totalRatings: 8934,
    isAvailable: true,
    publishedYear: 2020
  },
  {
    id: '4',
    title: 'National Geographic',
    author: 'National Geographic Society',
    category: 'Science',
    type: 'magazine',
    description: 'Monthly magazine featuring nature, science, and culture',
    coverImage: '/api/placeholder/300/400',
    rating: 4.5,
    totalRatings: 3421,
    isAvailable: true,
    publishedYear: 2024
  }
];

export const categories: Category[] = [
  { id: '1', name: 'Fiction', description: 'Novels and short stories', bookCount: 1250 },
  { id: '2', name: 'Non-Fiction', description: 'Real-world topics and biographies', bookCount: 890 },
  { id: '3', name: 'Science', description: 'Scientific research and discoveries', bookCount: 567 },
  { id: '4', name: 'Technology', description: 'Programming, AI, and tech trends', bookCount: 423 },
  { id: '5', name: 'Self-Help', description: 'Personal development and growth', bookCount: 334 },
  { id: '6', name: 'Fantasy', description: 'Magic, dragons, and mythical worlds', bookCount: 678 }
];