'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { BookOpen, Users, Upload, BarChart3 } from 'lucide-react';

export default function AdminPage() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      window.location.href = '/auth/login';
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Access denied. Admin only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back, {user?.name}</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Books</p>
                <p className="text-2xl font-bold text-slate-900">1,234</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Active Users</p>
                <p className="text-2xl font-bold text-slate-900">567</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Borrowed</p>
                <p className="text-2xl font-bold text-slate-900">89</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">This Month</p>
                <p className="text-2xl font-bold text-slate-900">234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/upload" className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Upload className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-slate-900">Upload New Book</span>
              </Link>
              <Link href="/admin/users" className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium text-slate-900">Manage Users</span>
              </Link>
              <Link href="/admin/books" className="flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <BookOpen className="h-5 w-5 text-purple-600 mr-3" />
                <span className="font-medium text-slate-900">View All Books</span>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-slate-600">New user registered</span>
              </div>
              <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-slate-600">Book uploaded successfully</span>
              </div>
              <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm text-slate-600">Book borrowed by user</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}