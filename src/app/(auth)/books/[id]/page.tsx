'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  fileUrl: string;
}

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`/api/books?id=${bookId}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error('Error fetching book:', err);
      }
    }
    fetchBook();
  }, [bookId]);

  if (!book) return <p className="p-8 text-green-700">Loading book details...</p>;

  return (
    <main className="pt-24 bg-green-50 min-h-screen p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-green-700">{book.title}</h1>
      <p className="text-gray-700 font-semibold">Author: {book.author}</p>
      {book.description && <p className="text-gray-600 mt-4">{book.description}</p>}
      
      <a
        href={book.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition"
      >
        Download / View Book
      </a>
    </main>
  );
}
