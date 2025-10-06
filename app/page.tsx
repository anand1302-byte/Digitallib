'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, BookOpen, Star } from 'lucide-react';
import BookCard from '@/components/BookCard';
import { categories } from '@/lib/data';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

export default function HomePage() {
  const { token } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const featuredCategories = categories.slice(0, 6);

  useEffect(() => {
    fetchPopularBooks();
  }, []);

  const fetchPopularBooks = async () => {
    try {
      const result = await api.getBooks({ limit: 4 });
      setPopularBooks(result.books || []);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (bookId: string) => {
    if (!token) {
      alert('Please login to borrow books');
      return;
    }
    
    try {
      const result = await api.borrowBook(bookId, token);
      if (result.success) {
        alert('Book borrowed successfully!');
        fetchPopularBooks();
      } else {
        alert(result.error || 'Failed to borrow book');
      }
    } catch (error) {
      alert('Failed to borrow book');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight"
            >
              Welcome to <span className="text-gradient">DigitalLib</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Discover thousands of books, audiobooks, magazines, and newspapers. 
              Your gateway to unlimited knowledge and entertainment.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="btn-primary text-lg px-10 py-4 flex items-center justify-center">
                Explore Books <ArrowRight className="ml-3 h-5 w-5" />
              </button>
              <button className="btn-secondary text-lg px-10 py-4">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-2">10,000+</h3>
              <p className="text-slate-600 font-semibold">Books Available</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-2">50,000+</h3>
              <p className="text-slate-600 font-semibold">Active Members</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-2">4.8/5</h3>
              <p className="text-slate-600 font-semibold">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Books */}
      <section className="py-20 gradient-bg relative">
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-3">Popular Books</h2>
              <p className="text-slate-600 font-medium text-lg">Trending reads this month</p>
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-700 font-bold text-lg hover:bg-blue-50 px-4 py-2 rounded-xl transition-all duration-200">
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BookCard book={book} onClick={() => handleBorrow(book._id)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Browse Categories</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg font-medium">
              Explore our vast collection organized by categories to find exactly what you're looking for.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-100 p-8 transition-all duration-300 cursor-pointer group hover:border-blue-200 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-blue-600 transition-all duration-200 group-hover:translate-x-1" />
                </div>
                <p className="text-slate-600 mb-6 font-medium">{category.description}</p>
                <div className="flex items-center text-sm text-slate-500 font-semibold">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  {category.bookCount} books available
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">
            Join thousands of readers and get access to our entire digital library today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
              Sign Up Free
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:-translate-y-1">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}