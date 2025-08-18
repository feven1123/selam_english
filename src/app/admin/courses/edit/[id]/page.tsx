'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isFree, setIsFree] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      const res = await fetch(`/api/courses?id=${courseId}`);
      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image || '');
      setIsFree(data.isFree);
    }
    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/courses?id=${courseId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, image, isFree }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) router.push('/admin/courses');
    else alert('Failed to update course');
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-green-700">Edit Course</h1>
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
          Update Course
        </button>
      </form>
    </div>
  );
}
