import './globals.css';
import type { Metadata } from 'next';
import ConditionalNavbar from '@/components/ConditionalNavbar';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'DigitalLib - Modern Digital Library',
  description: 'Explore thousands of books, audiobooks, magazines, and newspapers in our modern digital library.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <ConditionalNavbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}