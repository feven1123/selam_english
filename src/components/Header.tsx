'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
}

// Public (no login)
const publicLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/About' },
  { label: 'Course', href: '/Course' },
  { label: 'Live Session', href: '/Liveclass' },
  { label: 'Books', href: '/Books' },
  { label: 'Check Level', href: '/Checklevel' },
  { label: 'Contact Us', href: '/Contact' },
];

// Logged-in user
const userLinks: NavLink[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Course', href: '/Course' },
  { label: 'Live Session', href: '/Liveclass' },
  { label: 'Books', href: '/Books' },
  { label: 'Check Level', href: '/Checklevel' },
  { label: 'Notification', href: '/notifications' },
  { label: 'Account', href: '/account' },
];

// Admin
const adminLinks: NavLink[] = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'User Management', href: '/admin/users' },
  { label: 'Course Management', href: '/admin/courses' },
  { label: 'Live Session', href: '/admin/livesessions' },
  { label: 'Books Management', href: '/admin/books' },
  { label: 'Notification', href: '/admin/notifications' },
  { label: 'Account', href: '/admin/account' },
];

export default function Header() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsAdmin(pathname.startsWith('/admin'));
    setIsLoggedIn(pathname.startsWith('/dashboard') || pathname.startsWith('/account') || pathname.startsWith('/notifications'));
    // Replace this with actual auth check (e.g., token/session)
  }, [pathname]);

  let links = publicLinks;

  if (isAdmin) {
    links = adminLinks;
  } else if (isLoggedIn) {
    links = userLinks;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href={isAdmin ? '/admin/dashboard' : isLoggedIn ? '/dashboard' : '/'}
            className="flex items-center space-x-0 group"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/y.png"
              alt="Logo"
              width={150}
              height={50}
              className="transition-transform duration-300 transform group-hover:scale-105"
            />
            <span className="text-gray-900 text-xl font-bold select-none">Selam English</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-600 hover:text-primary transition-colors font-medium relative group"
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Login/Signup only if public */}
            {!isAdmin && !isLoggedIn && (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-white/80 backdrop-blur-md shadow-lg px-4 py-3 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block py-2 px-3 rounded hover:bg-primary hover:text-white font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          {!isAdmin && !isLoggedIn && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border border-green-500 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
