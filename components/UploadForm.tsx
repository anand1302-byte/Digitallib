'use client';

import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

export default function UploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    type: 'ebook',
    description: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    Object.entries(formData).forEach(([key, value]) => {
      uploadData.append(key, value);
    });

    try {
      const response = await fetch('/api/books/add', {
        method: 'POST',
        body: uploadData
      });

      const result = await response.json();
      if (result.success) {
        alert('Book uploaded successfully!');
        setFormData({ title: '', author: '', category: '', type: 'ebook', description: '' });
        setFile(null);
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (error) {
      alert('Upload error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-black text-slate-900 mb-8">Upload Book</h2>
      
      <form onSubmit={handleSubmit} className="glass-card space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Author</label>
          <input
            type="text"
            required
            value={formData.author}
            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="ebook">E-book</option>
              <option value="audiobook">Audiobook</option>
              <option value="magazine">Magazine</option>
              <option value="newspaper">Newspaper</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">File</label>
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
            <input
              type="file"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
              accept=".pdf,.epub,.txt,.doc,.docx"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">
                {file ? file.name : 'Click to upload file'}
              </p>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUploading || !file}
          className="w-full btn-primary py-4 disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload Book'}
        </button>
      </form>
    </div>
  );
}