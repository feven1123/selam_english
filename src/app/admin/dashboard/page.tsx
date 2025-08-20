'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface Stats {
  totalCourses: number;
  totalBooks: number;
  registeredUsers: number;
}

const chartData = [
  { name: 'Jan', activities: 12 },
  { name: 'Feb', activities: 18 },
  { name: 'Mar', activities: 9 },
  { name: 'Apr', activities: 22 },
  { name: 'May', activities: 27 },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats ? (
          <>
            <Card className="transform hover:scale-105 transition-transform shadow-lg rounded-xl overflow-hidden border-none">
              <CardHeader className="bg-gradient-to-r from-green-500 to-indigo-600 text-white py-4 text-center">
                <CardTitle className="text-lg font-semibold">Total Courses</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-6">
                <p className="text-3xl font-bold text-green-800">{stats.totalCourses}</p>
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-transform shadow-lg rounded-xl overflow-hidden border-none">
              <CardHeader className="bg-gradient-to-r from-green-500 to-indigo-600 text-white py-4 text-center">
                <CardTitle className="text-lg font-semibold">Total Books</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-6">
                <p className="text-3xl font-bold text-green-800">{stats.totalBooks}</p>
              </CardContent>
            </Card>

            <Card className="transform hover:scale-105 transition-transform shadow-lg rounded-xl overflow-hidden border-none">
              <CardHeader className="bg-gradient-to-r from-green-500 to-indigo-600 text-white py-4 text-center">
                <CardTitle className="text-lg font-semibold">Registered Users</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-6">
                <p className="text-3xl font-bold text-green-800">{stats.registeredUsers}</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <p>Loading stats...</p>
        )}
      </div>

      {/* Activity Chart */}
      <Card className="shadow-lg rounded-xl overflow-hidden border-none">
        <CardHeader className="bg-gradient-to-r from-green-500 to-indigo-600 text-white py-4">
          <CardTitle className="text-lg font-semibold">Monthly Activity Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#166534" />
              <YAxis stroke="#166534" />
              <Tooltip />
              <Legend />
              <Bar dataKey="activities" fill="url(#colorgreen)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorgreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#166534" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
