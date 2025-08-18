'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    await fetch(`/api/books?id=${id}`, { method: 'DELETE' });
    setBooks(books.filter((b) => b.id !== id));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Books Management</h1>
        <Link
          href="/admin/books/add"
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Add New Book
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="hover:shadow-xl transition-shadow relative">
            <CardHeader>
              <CardTitle className="text-green-700">{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">Author: {book.author}</p>
              <p className="text-gray-600 mb-4">{book.description}</p>
              <div className="flex gap-2 absolute top-2 right-2">
                <Link
                  href={`/admin/books/edit/${book.id}`}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
