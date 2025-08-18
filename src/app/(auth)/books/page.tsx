'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  fileUrl: string;
}

export default function UserBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch('/api/books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    }
    fetchBooks();
  }, []);

  const handleViewBook = (id: number) => {
    // Redirect to login page instead of book detail page
    router.push('/auth/login');
  };

  return (
    <>
      <Header />
      <main className="pt-24 bg-green-50 min-h-screen p-8 max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-green-700">Available Books</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4 cursor-pointer"
              onClick={() => handleViewBook(book.id)}
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">{book.title}</h2>
              <p className="text-gray-700 mb-2">Author: {book.author}</p>
              {book.description && <p className="text-gray-600 mb-4">{book.description.substring(0, 80)}...</p>}
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition">
                View Book
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
