'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isFree, setIsFree] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify({ title, description, image, isFree }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) router.push('/admin/courses');
    else alert('Failed to add course');
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-green-700">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            id="isFree"
            className="w-4 h-4"
          />
          <label htmlFor="isFree">Free Course</label>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}
