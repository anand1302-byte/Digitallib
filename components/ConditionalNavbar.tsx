'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/auth')) return null;
  if (pathname?.startsWith('/admin')) return <AdminNavbar />;
  
  return <Navbar />;
}