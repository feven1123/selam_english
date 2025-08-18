'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);
    if (data.user.role === 'admin') router.push('/admin/dashboard');
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-green-700 text-center">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-4 py-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-4 py-2 rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Login</button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account? <Link href="/signup" className="text-green-600 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
