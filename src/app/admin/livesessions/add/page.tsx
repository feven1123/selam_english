'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddLiveSessionPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/livesessions', {
      method: 'POST',
      body: JSON.stringify({ title, description, link, scheduledAt }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) router.push('/admin/livesessions');
    else alert('Failed to add session');
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h1 className="text-2xl font-bold text-green-700">Add Live Session</h1>
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
        />
        <input
          type="url"
          placeholder="Zoom/Jitsi Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Add Session
        </button>
      </form>
    </div>
  );
}
