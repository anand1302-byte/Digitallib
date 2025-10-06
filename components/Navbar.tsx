'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, User, BookOpen, Home, HelpCircle, Info } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/books', label: 'Books', icon: BookOpen },
    { href: '/account', label: 'My Account', icon: User },
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">DigitalLib</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="flex">
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All</option>
                  <option value="ebook">E-books</option>
                  <option value="audiobook">Audio books</option>
                  <option value="magazine">Magazines</option>
                  <option value="newspaper">Newspapers</option>
                </select>
                <input
                  type="text"
                  placeholder="Search books, authors, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-r-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-200 px-4 py-2 rounded-xl hover:bg-blue-50 font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
            
            {user ? (
              <div className="flex items-center space-x-2 ml-4">
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors ml-4"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="flex">
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="ebook">E-books</option>
              <option value="audiobook">Audio books</option>
              <option value="magazine">Magazines</option>
              <option value="newspaper">Newspapers</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300"
            />
            <button className="bg-primary-600 text-white px-4 py-2 rounded-r-lg">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {user ? (
              <div className="px-4 py-3 border-t border-gray-200">
                <p className="text-slate-600 font-medium mb-2">{user.name}</p>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-medium transition-colors block text-center mb-2"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 border-t border-gray-200">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors block text-center"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}