'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Users, Upload, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const adminNavItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/books', label: 'Manage Books', icon: BookOpen },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/upload', label: 'Upload Book', icon: Upload },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-slate-900 shadow-lg border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-2 rounded-xl shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">DigitalLib</span>
              <span className="text-xs text-purple-300 block">Admin Panel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-slate-300 font-medium">{user?.name}</span>
            <Link
              href="/"
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            <div className="px-3 py-3 border-t border-slate-700 mt-3">
              <p className="text-slate-300 font-medium mb-3">{user?.name}</p>
              <div className="space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors block text-center"
                >
                  View Site
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}