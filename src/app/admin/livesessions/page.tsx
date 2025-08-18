'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';

interface LiveSession {
  id: number;
  title: string;
  description?: string;
  link: string;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminLiveSessionsPage() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);

  const fetchSessions = async () => {
    const res = await fetch('/api/livesessions');
    const data = await res.json();
    setSessions(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this session?')) return;
    await fetch(`/api/livesessions?id=${id}`, { method: 'DELETE' });
    setSessions(sessions.filter((s) => s.id !== id));
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Live Sessions Management</h1>
        <Link
          href="/admin/livesessions/add"
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Add New Session
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <Card key={session.id} className="hover:shadow-xl transition-shadow relative">
            <CardHeader>
              <CardTitle className="text-green-700">{session.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">{session.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Scheduled: {new Date(session.scheduledAt).toLocaleString()}
              </p>
              <div className="flex gap-2 absolute top-2 right-2">
                <Link
                  href={`/admin/livesessions/edit/${session.id}`}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(session.id)}
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
