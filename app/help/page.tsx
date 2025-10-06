'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, BookOpen, Users, Settings } from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'account', label: 'Account & Profile', icon: Users },
    { id: 'borrowing', label: 'Borrowing Books', icon: BookOpen },
    { id: 'technical', label: 'Technical Issues', icon: Settings },
  ];

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top navigation. Fill out the registration form with your name, email, and password. You\'ll receive a confirmation email to verify your account.'
    },
    {
      id: 2,
      category: 'account',
      question: 'I forgot my password. How can I reset it?',
      answer: 'Click on "Forgot Password" on the login page. Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      id: 3,
      category: 'borrowing',
      question: 'How many books can I borrow at once?',
      answer: 'You can borrow up to 5 books at a time. Each book has a 14-day borrowing period, which can be renewed once if no one else has placed a hold on the book.'
    },
    {
      id: 4,
      category: 'borrowing',
      question: 'What happens if I return a book late?',
      answer: 'Late returns may result in temporary suspension of borrowing privileges. We send reminder emails before due dates to help you avoid late returns.'
    },
    {
      id: 5,
      category: 'technical',
      question: 'The app is running slowly. What should I do?',
      answer: 'Try clearing your browser cache and cookies. If the problem persists, try using a different browser or device. Contact our technical support if you continue experiencing issues.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'Can I read books offline?',
      answer: 'Yes! Our mobile app allows you to download books for offline reading. Simply tap the download icon next to any available book to save it to your device.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const newsUpdates = [
    {
      id: 1,
      title: 'New Mobile App Features',
      date: '2024-01-15',
      content: 'We\'ve added offline reading capabilities and improved search functionality to our mobile app.'
    },
    {
      id: 2,
      title: 'Extended Library Hours',
      date: '2024-01-10',
      content: 'Our digital library is now available 24/7 with improved server capacity and faster loading times.'
    },
    {
      id: 3,
      title: 'New Book Categories Added',
      date: '2024-01-05',
      content: 'We\'ve expanded our collection with new categories including Graphic Novels, Poetry, and Technical Manuals.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black mb-8"
          >
            How Can We Help You?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-12 font-medium"
          >
            Find answers to common questions or get in touch with our support team.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help topics, tutorials, or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-slate-900 bg-white/95 backdrop-blur-md rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 font-medium"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sticky top-8">
              <h3 className="text-xl font-black text-slate-900 mb-6">Help Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Contact */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Need More Help?</h4>
                <div className="space-y-3">
                  <a href="#" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>Live Chat</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600">
                    <Phone className="h-4 w-4" />
                    <span>Call Support</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600">
                    <Mail className="h-4 w-4" />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* FAQs */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="card"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search or browse different categories.</p>
                </div>
              )}
            </section>

            {/* Tutorials */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Getting Started with DigitalLib',
                  'How to Borrow and Return Books',
                  'Using the Mobile App',
                  'Managing Your Account Settings'
                ].map((tutorial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-0 h-0 border-l-[12px] border-l-primary-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900">{tutorial}</h3>
                    <p className="text-sm text-gray-500 mt-1">5 min tutorial</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Technical Support */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Support</h2>
              <div className="card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Live Chat</h3>
                    <p className="text-sm text-gray-600 mb-3">Get instant help from our support team</p>
                    <button className="btn-primary text-sm">Start Chat</button>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-sm text-gray-600 mb-3">Call us Mon-Fri, 9AM-6PM EST</p>
                    <button className="btn-secondary text-sm">+1 (555) 123-4567</button>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Email Support</h3>
                    <p className="text-sm text-gray-600 mb-3">We'll respond within 24 hours</p>
                    <button className="btn-secondary text-sm">Send Email</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Library News & Updates */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Library News & Updates</h2>
              <div className="space-y-4">
                {newsUpdates.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{news.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{news.content}</p>
                        <p className="text-xs text-gray-500">{news.date}</p>
                      </div>
                      <div className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full text-xs font-medium ml-4">
                        New
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}