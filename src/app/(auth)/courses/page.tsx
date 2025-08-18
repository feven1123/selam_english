'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  description: string;
  image?: string;
  isFree: boolean;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch('/api/courses');
      const data = await res.json();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div className="pt-24 bg-green-50 min-h-screen p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-green-700">Available Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4">
            {course.image && (
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-md mb-4" />
            )}
            <h2 className="text-xl font-semibold text-green-700 mb-2">{course.title}</h2>
            <p className="text-gray-700 mb-2">{course.description.substring(0, 80)}...</p>
            <span className="text-sm text-gray-500 mb-4 block">{course.isFree ? 'Free' : 'Paid'}</span>
            <Link
              href={`/courses/${course.id}`}
              className={`block text-center w-full py-2 rounded ${
                course.isFree ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {course.isFree ? 'Start Course' : 'View Course'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
