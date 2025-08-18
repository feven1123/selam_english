'use client';

import React, { useState } from 'react';

const questions = [
  { question: "Choose the correct sentence:", options: ["She go to school every day.", "She goes to school every day.", "She going to school every day."], answer: 1 },
  { question: "Which word is a noun?", options: ["Run", "Happiness", "Quickly"], answer: 1 },
  { question: "Fill in the blank: I ____ a book right now.", options: ["reads", "reading", "am reading"], answer: 2 },
  { question: "Choose the correct past tense form of 'go':", options: ["goed", "went", "gone"], answer: 1 },
  { question: "Which sentence is correct?", options: ["He don't like pizza.", "He doesn't like pizza.", "He not like pizza."], answer: 1 },
  { question: "Choose the correct plural form:", options: ["Childs", "Children", "Childes"], answer: 1 },
  { question: "Which is an adjective?", options: ["Quickly", "Beautiful", "Run"], answer: 1 },
  { question: "Complete the sentence: She ____ to the market yesterday.", options: ["goes", "went", "going"], answer: 1 },
  { question: "Choose the correct preposition: He is interested ____ music.", options: ["in", "on", "at"], answer: 0 },
  { question: "Which sentence is in passive voice?", options: ["The cat chased the mouse.", "The mouse was chased by the cat.", "The cat is chasing the mouse."], answer: 1 },
  { question: "Choose the correct article: I saw ____ elephant.", options: ["a", "an", "the"], answer: 1 },
  { question: "Which is a synonym of 'happy'?", options: ["Sad", "Joyful", "Angry"], answer: 1 },
  { question: "Choose the correct sentence:", options: ["I have visited London last year.", "I visited London last year.", "I visiting London last year."], answer: 1 },
  { question: "Fill in the blank: They ____ playing football now.", options: ["is", "are", "am"], answer: 1 },
  { question: "Choose the correct form of 'to be': He ____ a teacher.", options: ["am", "is", "are"], answer: 1 },
  { question: "Which sentence uses future tense?", options: ["I eat breakfast now.", "I will eat breakfast tomorrow.", "I ate breakfast yesterday."], answer: 1 },
  { question: "Choose the correct conjunction: I like tea ____ I don’t like coffee.", options: ["and", "but", "or"], answer: 1 },
  { question: "Fill in the blank with the correct verb: She ____ English very well.", options: ["speak", "speaks", "speaking"], answer: 1 },
  { question: "Which sentence is a question?", options: ["I like pizza.", "Do you like pizza?", "I liking pizza."], answer: 1 },
  { question: "Choose the correct sentence:", options: ["They is going to school.", "They are going to school.", "They going to school."], answer: 1 },
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
    if (score <= 5) return "Beginner";
    if (score <= 15) return "Intermediate";
    return "Advanced";
  };

  return (
    <main className="pt-24 bg-green-50 min-h-screen">
      <section className="bg-green-100 py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 drop-shadow-md">
          Check Your English Level
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-green-800">
          Answer a few questions to see your English level.
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
  );
}
