'use client';

import React from 'react';

const reasons = [
  {
    icon: '📚',
    title: 'Comprehensive Lessons',
    description: 'Structured courses designed to build your English skills step-by-step.',
  },
  {
    icon: '🗣️',
    title: 'Interactive Speaking Practice',
    description: 'Engage in live classes and real conversations to boost your confidence.',
  },
  {
    icon: '🎯',
    title: 'Personalized Learning',
    description: 'Customized study plans tailored to your goals and pace.',
  },
  {
    icon: '🏅',
    title: 'Experienced Instructors',
    description: 'Learn from certified teachers dedicated to your success.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-white/90 via-white/70 to-white/90 backdrop-blur-md text-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-16 tracking-tight text-green-800 select-none drop-shadow-md">
          Why Choose Selam English
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-shadow duration-700 cursor-default overflow-hidden"
            >
              {/* Glowing gradient circle behind icon */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-tr from-green-400 to-green-600 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

              <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-green-500 to-green-700 text-7xl text-white shadow-lg group-hover:scale-110 transform transition-transform duration-500">
                {reason.icon}
              </div>
              <h3 className="text-3xl font-semibold mb-4 text-green-800 group-hover:text-green-600 transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
