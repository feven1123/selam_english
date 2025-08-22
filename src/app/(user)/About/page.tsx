'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-gradient-to-b from-white/80 via-white/90 to-green-50 text-gray-900 pt-24">
        {/* Banner / Hero Section */}
        <section className="bg-green-100 py-28 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-4 text-green-700 drop-shadow-xl select-none"
          >
            About Selam English
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-green-900 leading-relaxed"
          >
            Helping students master English with confidence through interactive lessons, live classes, 
            and practical exercises tailored to every level.
          </motion.p>
        </section>

        {/* Mission Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-700 drop-shadow-md">
              Our Mission
            </h2>
            <p className="mb-4 text-gray-700 text-lg">
              We are dedicated to providing top-quality English education for learners worldwide.
              Flexible schedules, interactive lessons, and practical exercises ensure learning is enjoyable and effective.
            </p>
            <p className="text-gray-700 text-lg">
              Whether improving speaking, writing, or grammar, Selam English guides you every step of the way.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/about-illustration.svg"
              alt="About us"
              width={500}
              height={350}
              className="rounded-3xl shadow-2xl border-4 border-green-100 hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </section>

        {/* Core Values / Fancy Cards */}
        <section className="py-20 bg-gradient-to-b from-green-50 via-white/80 to-green-100">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
            {[
              { title: 'Quality Content', desc: 'Lessons designed by experts to maximize learning impact.', icon: '📚' },
              { title: 'Interactive Learning', desc: 'Live sessions and activities that make learning fun.', icon: '🎓' },
              { title: 'Accessible for All', desc: 'Learn anytime, anywhere, at your own pace.', icon: '🌍' },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center cursor-default border-t-4 border-green-400"
              >
                <div className="text-6xl mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold text-green-700 mb-3">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold mb-16 text-green-700 drop-shadow-md select-none"
            >
              What Our Students Say
            </motion.h2>
            <div className="grid gap-12 md:grid-cols-3">
              {[
                { name: 'Liya Abera', role: 'Student', photo: '/images/testimonial1.jpg', review: 'Selam English helped me gain confidence in speaking. Interactive classes and amazing instructors!' },
                { name: 'Kebede Alem', role: 'Student', photo: '/images/testimonial2.jpg', review: 'The live sessions are really engaging. Improved my grammar and pronunciation faster than expected.' },
                { name: 'Saba Tadesse', role: 'Student', photo: '/images/testimonial3.jpg', review: 'Flexible schedule and personalized lessons. Best English learning platform I’ve tried.' },
              ].map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  className="bg-green-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-500 flex flex-col items-center"
                >
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={96}
                    height={96}
                    className="rounded-full mb-6 shadow-lg object-cover"
                  />
                  <p className="text-green-900 italic mb-6 text-lg leading-relaxed">&quot;{t.review}&quot;</p>
                  <h3 className="text-xl font-semibold text-green-800">{t.name}</h3>
                  <p className="text-green-700 text-sm">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
