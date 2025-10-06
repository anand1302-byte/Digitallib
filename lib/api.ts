const API_BASE = '/api';

export const api = {
  // Auth
  register: async (data: any) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  logout: async () => {
    const res = await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
    return res.json();
  },

  // Books
  getBooks: async (params?: any) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/books/list?${query}`);
    return res.json();
  },

  addBook: async (formData: FormData) => {
    const res = await fetch(`${API_BASE}/books/add`, {
      method: 'POST',
      body: formData
    });
    return res.json();
  },

  borrowBook: async (bookId: string, token: string) => {
    const res = await fetch(`${API_BASE}/books/borrow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ bookId })
    });
    return res.json();
  },

  getBorrowedBooks: async (token: string) => {
    const res = await fetch(`${API_BASE}/books/borrow`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  // Profile
  getProfile: async (token: string) => {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  updateProfile: async (data: any, token: string) => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};