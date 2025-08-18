'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md text-gray-900 pt-10 pb-6 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-gray-900 select-none">Selam English</h2>
          <p className="text-sm text-gray-700">
            Your trusted platform to master English step-by-step. Join thousands of learners improving their skills every day.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link href="/" className="hover:underline hover:text-green-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline hover:text-green-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/course" className="hover:underline hover:text-green-600 transition">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/liveclass" className="hover:underline hover:text-green-600 transition">
                Live Class
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline hover:text-green-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📍 Addis Ababa, Ethiopia</li>
            <li>📞 +251 953 947 848</li>
            <li>✉️ info@selamenglish.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-600 select-none">
        &copy; {new Date().getFullYear()} Selam English. All rights reserved.
      </div>
    </footer>
  );
}
