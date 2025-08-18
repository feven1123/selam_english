'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Lesson {
  id: number;
  title: string;
  content: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  image?: string;
  isFree: boolean;
  lessons: Lesson[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses?id=${courseId}&includeLessons=true`);
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error('Failed to fetch course:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  if (loading) return <p className="p-8 text-center">Loading...</p>;
  if (!course) return <p className="p-8 text-center text-red-600">Course not found.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-green-700">{course.title}</h1>
      {course.image && (
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover rounded-md"
        />
      )}
      <p className="text-gray-700">{course.description}</p>

      <h2 className="text-2xl font-semibold text-green-700 mt-6">Lessons</h2>
      <div className="space-y-4">
        {course.lessons.length === 0 ? (
          <p className="text-gray-500">No lessons added for this course yet.</p>
        ) : (
          course.lessons.map((lesson) => (
            <div key={lesson.id} className="p-4 border rounded-md shadow-sm">
              <h3 className="font-semibold text-lg">{lesson.title}</h3>
              <p className="text-gray-700 mt-2">{lesson.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
