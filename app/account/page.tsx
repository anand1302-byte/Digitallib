'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Heart, Bell, CreditCard, Settings, Calendar, Star } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

export default function AccountPage() {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState<any>(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchBorrowedBooks();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const result = await api.getProfile(token!);
      setProfile(result.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const result = await api.getBorrowedBooks(token!);
      setBorrowedBooks(result.borrows || []);
    } catch (error) {
      console.error('Failed to fetch borrowed books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (formData: any) => {
    try {
      const result = await api.updateProfile(formData, token!);
      if (result.success) {
        alert('Profile updated successfully!');
        fetchProfile();
      } else {
        alert(result.error || 'Failed to update profile');
      }
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to access your account.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'borrowed', label: 'Borrowed Books', icon: BookOpen },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payment History', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];



  const wishlistBooks = [
    { id: '3', title: 'Harry Potter', author: 'J.K. Rowling', available: true },
    { id: '4', title: 'Dune', author: 'Frank Herbert', available: false },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                <p className="text-gray-600">john.doe@email.com</p>
                <p className="text-sm text-gray-500">Member since January 2024</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue="john.doe@email.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
            
            <button className="btn-primary">Update Profile</button>
          </div>
        );

      case 'borrowed':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Currently Borrowed Books</h3>
            {loading ? (
              <p>Loading borrowed books...</p>
            ) : borrowedBooks.length === 0 ? (
              <p className="text-gray-500">No borrowed books</p>
            ) : (
              borrowedBooks.map((borrow: any) => (
                <div key={borrow._id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{borrow.book.title}</h4>
                    <p className="text-gray-600">by {borrow.book.author}</p>
                    <p className="text-sm text-gray-500">Due: {new Date(borrow.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      new Date(borrow.dueDate) < new Date() ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {new Date(borrow.dueDate) < new Date() ? 'Overdue' : 'Active'}
                    </span>
                    <button className="btn-secondary text-sm">Renew</button>
                    <button className="btn-primary text-sm">Return</button>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">My Wishlist</h3>
            {wishlistBooks.map(book => (
              <div key={book.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{book.title}</h4>
                  <p className="text-gray-600">by {book.author}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    book.available ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {book.available ? 'Available' : 'Waitlist'}
                  </span>
                  <button className="btn-primary text-sm">
                    {book.available ? 'Borrow' : 'Notify Me'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                'Email notifications for due dates',
                'SMS reminders',
                'New book recommendations',
                'Library news and updates'
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{item}</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">No payment history available</p>
              <p className="text-sm text-gray-500">Your membership is currently free</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Privacy Settings</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary-600 mr-2" />
                    Make my reading list public
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-primary-600 mr-2" />
                    Allow friend recommendations
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Account Actions</h4>
                <div className="space-y-2">
                  <button className="text-primary-600 hover:text-primary-700">Change Password</button>
                  <br />
                  <button className="text-red-600 hover:text-red-700">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 mb-4">My Account</h1>
          <p className="text-slate-600 text-xl font-medium">Manage your profile, books, and preferences</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-8 py-5 text-sm font-bold whitespace-nowrap border-b-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-10"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}