'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  cover: string;
}

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Fetch courses from API
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    }
    fetchCourses();
  }, []);

  // Filter and search courses
  useEffect(() => {
    let temp = courses;
    if (category !== 'All') {
      temp = temp.filter((c) => c.category === category);
    }
    if (search.trim() !== '') {
      temp = temp.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCourses(temp);
  }, [courses, search, category]);

  const categories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))];

  // Always redirect to login
  const handleViewCourse = () => {
    router.push('/login'); // go to login page
  };

  return (
    <>
      <Header />
      <main className="pt-24 bg-green-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-green-100 py-16 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 drop-shadow-md">
            Free English Courses
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-green-800">
            Browse all courses added by the admin. Click &quot;View Course&quot; to sign in and start learning.
          </p>
        </section>

        {/* Search & Filter */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Search by title or description..."
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

        {/* Courses Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            {filteredCourses.length === 0 ? (
              <p className="text-center text-green-700 col-span-full">No courses found.</p>
            ) : (
              filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow"
                >
                  <Image
                    src={course.cover}
                    alt={course.title}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-green-700 mb-2">{course.title}</h3>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                      onClick={handleViewCourse}
                    >
                      View Course
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
