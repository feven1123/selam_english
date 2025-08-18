'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface DashboardStats {
  title: string;
  value: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats[]>([
    { title: 'Total Courses', value: 0 },
    { title: 'Total Books', value: 0 },
    { title: 'Live Sessions', value: 0 },
    { title: 'Registered Users', value: 0 },
  ]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [coursesRes, booksRes, liveRes, usersRes] = await Promise.all([
          fetch('/api/courses/count'),
          fetch('/api/books/count'),
          fetch('/api/live-sessions/count'),
          fetch('/api/users/count'),
        ]);

        if (!coursesRes.ok || !booksRes.ok || !liveRes.ok || !usersRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [coursesData, booksData, liveData, usersData] = await Promise.all([
          coursesRes.json(),
          booksRes.json(),
          liveRes.json(),
          usersRes.json(),
        ]);

        setStats([
          { title: 'Total Courses', value: coursesData.count },
          { title: 'Total Books', value: booksData.count },
          { title: 'Live Sessions', value: liveData.count },
          { title: 'Registered Users', value: usersData.count },
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <Card
            key={i}
            className="transform hover:scale-105 transition-transform shadow-lg rounded-xl overflow-hidden border-none"
          >
            <CardHeader
              className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4 text-center"
            >
              <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="text-3xl font-bold text-green-800">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="shadow-lg rounded-xl overflow-hidden border-none">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4">
          <CardTitle className="text-lg font-semibold">Monthly Activity Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={[
                { name: 'Jan', activities: 12 },
                { name: 'Feb', activities: 18 },
                { name: 'Mar', activities: 9 },
                { name: 'Apr', activities: 22 },
                { name: 'May', activities: 27 },
              ]}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#16a34a" />
              <YAxis stroke="#16a34a" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="activities"
                fill="url(#colorGreen)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#16a34a" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#a7f3d0" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
