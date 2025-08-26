'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  category: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  

  // Fetch books from API
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

  // Filter & search logic
  useEffect(() => {
    let temp = books;
    if (category !== 'All') {
      temp = temp.filter((b) => b.category === category);
    }
    if (search.trim() !== '') {
      temp = temp.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredBooks(temp);
  }, [books, search, category]);

  const categories = ['All', ...Array.from(new Set(books.map((b) => b.category)))];

  const handleReadBook = (id: number) => {
    if (isLoggedIn) {
      router.push(`/books/${id}`); // navigate to book detail if logged in
    } else {
      router.push('/login'); // redirect to login if not
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 bg-green-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-green-100 py-16 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 drop-shadow-md">
            Free English Books
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-green-800">
            Browse our collection of books added by the admin. Use search and filters to find the right book.
          </p>
        </section>

        {/* Search & Filter */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-xl px-4 py-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-xl px-4 py-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Books Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            {filteredBooks.length === 0 ? (
              <p className="text-center text-green-700 col-span-full">No books found.</p>
            ) : (
              filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow cursor-pointer"
                >
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-green-700 mb-2">{book.title}</h3>
                    <p className="text-green-800 mb-2 font-medium">By {book.author}</p>
                    <p className="text-gray-700 mb-4">{book.description}</p>
                    <button
                      onClick={() => handleReadBook(book.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                    >
                      Read Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
