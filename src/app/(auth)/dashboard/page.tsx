'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Book, Clock, Target, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Course {
  id: string;
  title: string;
  progress: number;
  thumbnail: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Fetch user
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user));

    // Fetch recent courses
    fetch('/api/courses/recent')
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  }, []);

  const weeklyData = [
    { day: 'Mon', hours: 1 },
    { day: 'Tue', hours: 2 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 1 },
    { day: 'Sat', hours: 3 },
    { day: 'Sun', hours: 2 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'Student'} 🎉</h1>
        <p className="text-sm opacity-90">Keep up the great work! Here’s your learning progress.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-indigo-600" /> Courses Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" /> Hours Learned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">34h</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-pink-600" /> Active Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">7 days 🔥</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Your Weekly Study Hours</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Courses */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Courses</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl border shadow-md overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="font-semibold">{course.title}</h3>
                <Progress value={course.progress} className="mt-2" />
                <p className="text-sm mt-1 text-gray-500">{course.progress}% complete</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-500" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>📌 You have 2 new assignments due this week</p>
          <p>🔥 You are on a 7-day streak, keep it up!</p>
          <p>🎯 New course "Business English" has been added to your library</p>
        </CardContent>
      </Card>
    </div>
  );
}
