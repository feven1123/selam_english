'use client';

import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Liya Abera',
    role: 'Student',
    photo: '/images/testimonial1.jpg', // replace with actual image paths or use placeholder
    review:
      "Selam English helped me gain confidence in speaking. The classes are interactive and the instructors are amazing!",
  },
  {
    id: 2,
    name: 'Kebede Alem',
    role: 'Student',
    photo: '/images/testimonial2.jpg',
    review:
      "The live sessions are really engaging. I improved my grammar and pronunciation faster than I expected.",
  },
  {
    id: 3,
    name: 'Saba Tadesse',
    role: 'Student',
    photo: '/images/testimonial3.jpg',
    review:
      "I love the flexible schedule and personalized lessons. It’s the best English learning platform I’ve tried.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white/80 backdrop-blur-md text-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-16 text-green-700 drop-shadow-md select-none">
          What Our Students Say
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {testimonials.map(({ id, name, role, photo, review }) => (
            <div
              key={id}
              className="bg-green-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-default flex flex-col items-center"
            >
              <img
                src={photo}
                alt={`${name}'s photo`}
                className="w-24 h-24 rounded-full object-cover mb-6 shadow-md"
                loading="lazy"
              />
              <p className="text-green-900 italic mb-6 text-lg leading-relaxed">"{review}"</p>
              <h3 className="text-xl font-semibold text-green-800">{name}</h3>
              <p className="text-green-700 text-sm">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
