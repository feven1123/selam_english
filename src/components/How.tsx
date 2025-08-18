'use client';

import React, { useState } from 'react';

const steps = [
  {
    title: 'Choose Your Course',
    description: 'Explore our English courses and pick the one that fits your level and goals.',
    icon: '📚',
  },
  {
    title: 'Book Your Class',
    description: 'Schedule live sessions or self-paced lessons at your convenience.',
    icon: '🗓️',
  },
  {
    title: 'Learn with Experts',
    description: 'Join interactive classes led by experienced instructors.',
    icon: '👩‍🏫',
  },
  {
    title: 'Practice & Improve',
    description: 'Engage in speaking, writing, and real-life exercises to build confidence.',
    icon: '🎯',
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-white/80 backdrop-blur-md text-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center relative select-none">
        <h2 className="text-5xl font-extrabold mb-20 text-green-700 drop-shadow-md">
          How It Works
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-20">
          {/* Vertical connecting line for desktop */}
          <div className="hidden md:block absolute top-28 left-1/2 transform -translate-x-1/2 h-[calc(100%-112px)] border-l-4 border-gradient-to-b from-green-400 via-green-600 to-green-700 rounded" />

          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center px-6 cursor-pointer"
                onClick={() => setActiveStep(idx)}
              >
                <div
                  className={`flex items-center justify-center w-24 h-24 rounded-full text-6xl shadow-xl transition-transform duration-500 ${
                    isActive
                      ? 'bg-gradient-to-tr from-green-600 to-green-800 text-white scale-110 shadow-2xl'
                      : 'bg-gradient-to-tr from-green-400 to-green-600 text-white hover:scale-110'
                  }`}
                >
                  {step.icon}
                </div>
                <h3
                  className={`mt-8 mb-4 text-3xl font-semibold drop-shadow-sm transition-colors duration-300 ${
                    isActive ? 'text-green-900' : 'text-green-700'
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`max-w-xs text-lg leading-relaxed transition-opacity duration-300 ${
                    isActive ? 'text-gray-900 opacity-100' : 'text-gray-500 opacity-70'
                  }`}
                >
                  {step.description}
                </p>

                {/* Connector circles for desktop except last */}
                {idx !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-tr from-green-400 to-green-700 rounded-full mt-6 shadow-lg" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
