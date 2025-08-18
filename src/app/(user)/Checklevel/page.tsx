'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const questions = [
  {
    question: "Choose the correct sentence:",
    options: ["She go to school every day.", "She goes to school every day.", "She going to school every day."],
    answer: 1,
  },
  {
    question: "Which word is a noun?",
    options: ["Run", "Happiness", "Quickly"],
    answer: 1,
  },
  {
    question: "Fill in the blank: I ____ a book right now.",
    options: ["reads", "reading", "am reading"],
    answer: 2,
  },
  {
    question: "Choose the correct past tense form of 'go':",
    options: ["goed", "went", "gone"],
    answer: 1,
  },
  {
    question: "Which sentence is correct?",
    options: ["He don't like pizza.", "He doesn't like pizza.", "He not like pizza."],
    answer: 1,
  },
];

export default function CheckLevelPage() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleOptionClick = (index: number) => {
    if (index === questions[current].answer) setScore(score + 1);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const getLevel = () => {
    if (score <= 1) return "Beginner";
    if (score <= 3) return "Intermediate";
    return "Advanced";
  };

  return (
    <>
      <Header />

      <main className="pt-24 bg-green-50 min-h-screen">
        <section className="bg-green-100 py-16 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 drop-shadow-md">
            Check Your English Level
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-green-800">
            Answer a few simple questions to see your English level.
          </p>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
            {!finished ? (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-green-700">
                  Question {current + 1} of {questions.length}
                </h2>
                <p className="mb-6 text-gray-700">{questions[current].question}</p>
                <div className="grid gap-4">
                  {questions[current].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      className="border rounded-xl px-4 py-3 w-full hover:bg-green-100 transition text-gray-800 font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-green-700">Your Level</h2>
                <p className="text-xl text-gray-800 mb-6">You scored {score} out of {questions.length}</p>
                <p className="text-2xl font-semibold text-green-800">{getLevel()}</p>
                <button
                  onClick={() => { setCurrent(0); setScore(0); setFinished(false); }}
                  className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
