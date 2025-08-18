'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  image?: string;
  isFree: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchCourses = async () => {
    const res = await fetch('/api/courses');
    const data = await res.json();
    setCourses(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    await fetch(`/api/courses?id=${id}`, { method: 'DELETE' });
    setCourses(courses.filter((c) => c.id !== id));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Courses Management</h1>
        <Link
          href="/admin/courses/add"
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Add New Course
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-xl transition-shadow relative">
            <CardHeader>
              <CardTitle className="text-green-700">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">{course.description}</p>
              <p className="text-sm text-gray-500 mb-2">{course.isFree ? 'Free' : 'Paid'}</p>

              <div className="flex gap-2 mt-4">
                <Link
                  href={`/admin/courses/${course.id}/lessons`}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition text-sm font-medium"
                >
                  Manage Lessons
                </Link>

                <Link
                  href={`/admin/courses/edit/${course.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-1 text-sm font-medium"
                  title="Edit"
                >
                  <Edit size={20} />
                </Link>

                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition flex items-center gap-1 text-sm font-medium"
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
