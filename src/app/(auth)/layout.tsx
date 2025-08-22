'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { Bell, User, LogOut } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

// Sidebar links
const userLinks: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Course', href: '/courses' },
  { label: 'Live Session', href: '/live-sessions' },
  { label: 'Books', href: '/books' },
  { label: 'Check Level', href: '/check-level' },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine if this is a login/signup page
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // Fetch logged-in user info (only if not on auth page)
  useEffect(() => {
    if (!isAuthPage) {
      async function fetchUser() {
        try {
          const res = await fetch('/api/auth/me'); // API should return { name, email }
          if (!res.ok) throw new Error('Not authenticated');
          const data = await res.json();
          setUser(data);
        } catch {
          setUser(null);
        }
      }
      fetchUser();
    }
  }, [isAuthPage]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // TODO: clear auth tokens or session
    router.push('/login');
  };

  // Show only children for login/signup pages
  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 font-bold text-lg border-b">
          Welcome, {user?.name || 'User'}
        </div>
        <nav className="flex-1 flex flex-col p-4 space-y-2">
          {userLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md ${
                pathname === link.href
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
          <h1 className="text-xl font-bold text-blue-600">Selam English</h1>
          <div className="flex items-center space-x-4 relative">
          <button onClick={() => router.push('/notifications')}>
              <Bell className="w-5 h-5 text-gray-700" />
            </button>

            {/* User Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <User className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="px-4 py-3 flex items-center space-x-3">
                    <User className="w-6 h-6 text-gray-600" />
                    <span className="text-gray-800 font-semibold">{user?.name}</span>
                  </div>

                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>

                  <hr className="border-gray-200 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600 flex items-center space-x-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
