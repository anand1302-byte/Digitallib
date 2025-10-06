'use client';

import { Book } from '@/types';
import { Star, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audiobook':
        return '🎧';
      case 'magazine':
        return '📰';
      case 'newspaper':
        return '📄';
      default:
        return '📚';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-slate-100 p-6 cursor-pointer group transition-all duration-300 hover:border-blue-200"
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-xl mb-6 flex items-center justify-center text-6xl shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          {getTypeIcon(book.type)}
        </div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold shadow-lg border border-white/20">
          {book.type}
        </div>
        {!book.isAvailable && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <div className="bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-700">
              <Clock className="inline h-4 w-4 mr-1" />
              Unavailable
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors text-lg">
          {book.title}
        </h3>
        <p className="text-slate-600 font-medium">{book.author}</p>
        <p className="text-xs text-slate-500 bg-slate-50 rounded-full px-3 py-1 inline-block font-medium border border-slate-100">
          {book.category}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-amber-400 fill-current drop-shadow-sm" />
            <span className="text-sm font-bold text-slate-700">{book.rating}</span>
            <span className="text-xs text-gray-500">({book.totalRatings})</span>
          </div>
          <span className="text-xs text-gray-500">{book.publishedYear}</span>
        </div>
      </div>
    </motion.div>
  );
}