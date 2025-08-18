'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function LessonListPage() {
  const params = useParams();
  const courseId = params.id;
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const router = useRouter();

  const fetchLessons = async () => {
    const res = await fetch(`/api/lessons?courseId=${courseId}`);
    const data = await res.json();
    setLessons(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this lesson?')) return;
    await fetch(`/api/lessons?id=${id}`, { method: 'DELETE' });
    setLessons(lessons.filter((l) => l.id !== id));
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Lessons Management</h1>
        <Link
          href={`/admin/courses/${courseId}/lessons/add`}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Add New Lesson
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-xl transition-shadow relative">
            <CardHeader>
              <CardTitle className="text-green-700">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{lesson.content}</p>
              <div className="flex gap-2 absolute top-2 right-2">
                <Link
                  href={`/admin/courses/${courseId}/lessons/edit/${lesson.id}`}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(lesson.id)}
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
