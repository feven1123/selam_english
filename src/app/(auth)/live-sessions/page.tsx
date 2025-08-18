'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface LiveSession {
  id: number;
  title: string;
  description: string;
  link: string;
  scheduledAt: string; // unified field name
}

export default function LiveSessionsPage() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch('/api/livesessions');
        const data = await res.json();
        setSessions(data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      }
    }
    fetchSessions();
  }, []);

  return (
    <main className="pt-24 bg-green-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-100 py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 drop-shadow-md">
          Upcoming Live Sessions
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-green-800">
          Join interactive live classes with our instructors. Click "Join Session" to participate.
        </p>
      </section>

      {/* Sessions Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {sessions.length === 0 ? (
            <p className="text-center text-green-700 col-span-full">No upcoming sessions.</p>
          ) : (
            sessions.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition"
              >
                <h3 className="text-2xl font-bold text-green-700 mb-2">{s.title}</h3>
                <p className="text-gray-700 mb-2">{s.description}</p>
                <p className="text-green-800 mb-4">
                  Scheduled: {new Date(s.scheduledAt).toLocaleString()}
                </p>

                {/* Join Button & Embedded Video */}
                {s.link.includes('zoom') || s.link.includes('jitsi') ? (
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={s.link}
                      allow="camera; microphone; fullscreen; display-capture"
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <Link href={s.link} target="_blank">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition">
                      Join Session
                    </button>
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
