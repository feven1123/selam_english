'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const faqs = [
  {
    question: "How do I book a course?",
    answer: "You can register for a course directly on the course page. After login, you can access all free courses immediately.",
  },
  {
    question: "Are live classes recorded?",
    answer: "Yes! All live sessions are recorded and can be watched later in your dashboard.",
  },
  {
    question: "Can I contact instructors directly?",
    answer: "All questions should be sent through the contact form. Admin will forward to the appropriate instructor.",
  },
  {
    question: "Are all courses free?",
    answer: "Most courses are free. Paid courses will require contacting the admin for access.",
  },
];

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />

      <main className="pt-24 bg-white/80 backdrop-blur-md">
        {/* Hero Section */}
        <section className="bg-green-100 py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700 drop-shadow-md">
            Contact Selam English
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-green-800">
            Have questions about courses, live sessions, or resources? Reach out to us!
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">Send a Message</h2>
            <form
              action="https://formsubmit.co/favumail20@gmail.com"
              method="POST"
              className="space-y-6"
            >
              <input type="hidden" name="_subject" value="New Contact Form Submission - Selam English" />
              <input type="hidden" name="_next" value="https://selam-english.vercel.app/" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-green-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-green-800 mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-green-200 rounded-xl overflow-hidden bg-white shadow-sm"
                >
                  <button
                    className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-green-700">{faq.question}</span>
                    <span className="text-xl text-green-500">{openIndex === index ? '−' : '+'}</span>
                  </button>
                  {openIndex === index && (
                    <div className="px-4 pb-4 text-green-800">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
