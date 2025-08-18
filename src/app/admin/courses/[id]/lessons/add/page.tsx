'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function AddLessonPage() {
  const params = useParams();
  const courseId = params.id;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/lessons', {
      method: 'POST',
      body: JSON.stringify({ courseId, title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) router.push(`/admin/courses/${courseId}/lessons`);
    else alert('Failed to add lesson');
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-green-700">Add New Lesson</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          placeholder="Lesson Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Add Lesson
        </button>
      </form>
    </div>
  );
}
