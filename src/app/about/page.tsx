'use client';

import { Header } from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FloatingBubbles, SwimmingFish } from '@/components/Confetti';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 via-cyan-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <FloatingBubbles count={8} />
      <SwimmingFish />

      <Header />

      <main className="flex-1 pt-24 pb-12 px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              className="flex justify-center mb-4"
              animate={{
                y: [0, -10, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Image
                src="/assets/images/crab-mascot.png"
                alt="Coral the Crab"
                width={140}
                height={140}
                priority
                className="drop-shadow-lg"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="font-[family-name:var(--font-fredoka)] text-4xl text-[var(--color-navy)] mb-4"
            >
              About Tide Pool Kids
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 max-w-xl mx-auto"
            >
              An interactive educational experience for young explorers to discover the San Francisco Bay Area&apos;s natural wonders and community systems.
            </motion.p>

            {/* Decorative creatures */}
            <motion.div
              className="flex justify-center gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {['🦀', '🐠', '🦈', '🐙', '🐚'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Mission section */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-lg p-8 mb-8 border-2 border-[var(--color-aqua)]/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎯
              </motion.span>
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)]">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tide Pool Kids connects children ages 5-14 with the incredible ecosystems and infrastructure of the San Francisco Bay Area. Through interactive exploration, games, and age-appropriate content, we help young learners understand:
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                { emoji: '🦀', text: 'The diverse wildlife in tide pools, wetlands, forests, and beaches' },
                { emoji: '💧', text: 'How our community systems work - from water treatment to recycling' },
                { emoji: '🌍', text: 'The importance of environmental stewardship and conservation' },
                { emoji: '🔬', text: 'Scientific concepts through hands-on learning and discovery' },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 bg-white/50 p-3 rounded-xl"
                >
                  <motion.span
                    className="text-2xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {item.emoji}
                  </motion.span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Features section */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-lg p-8 mb-8 border-2 border-purple-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.span
                className="text-3xl"
                animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)]">
                Features
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { emoji: '📚', title: 'Age-Adaptive Content', desc: 'Content automatically adjusts for K-2, grades 3-5, and grades 6-8, ensuring appropriate complexity and vocabulary.', color: 'from-blue-50 to-cyan-50 border-blue-200' },
                { emoji: '🎮', title: 'Interactive Activities', desc: 'Quizzes, sorting games, and creature collection keep learning fun and engaging.', color: 'from-teal-50 to-emerald-50 border-teal-200' },
                { emoji: '🏆', title: 'Progress Tracking', desc: 'Earn points, collect badges, and track visited locations to encourage continued exploration.', color: 'from-amber-50 to-yellow-50 border-amber-200' },
                { emoji: '🗺️', title: 'Real Bay Area Locations', desc: 'Explore 19 real locations including Fitzgerald Marine Reserve, Muir Woods, and more.', color: 'from-green-50 to-emerald-50 border-green-200' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className={`p-5 bg-gradient-to-br ${feature.color} rounded-2xl border-2 shadow-sm hover:shadow-md transition-all`}
                >
                  <motion.span
                    className="text-3xl block mb-2"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {feature.emoji}
                  </motion.span>
                  <h3 className="font-bold text-[var(--color-navy)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Educational Standards section */}
          <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-4">
              Educational Alignment
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tide Pool Kids content aligns with California&apos;s Environmental Principles and Concepts (EP&amp;C), supporting classroom learning with real-world connections to local ecosystems and community systems.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[var(--color-aqua)]/10 text-[var(--color-aqua)] rounded-full text-sm font-medium">
                NGSS Aligned
              </span>
              <span className="px-3 py-1 bg-[var(--color-teal)]/10 text-[var(--color-teal)] rounded-full text-sm font-medium">
                CA EP&amp;C Standards
              </span>
              <span className="px-3 py-1 bg-[var(--color-coral)]/10 text-[var(--color-coral)] rounded-full text-sm font-medium">
                K-8 Curriculum
              </span>
            </div>
          </section>

          {/* Meet Coral section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[var(--color-coral)]/20 via-[var(--color-sunny)]/20 to-[var(--color-sand)] rounded-3xl p-8 mb-8 border-3 border-[var(--color-coral)]/30 shadow-lg"
          >
            <div className="flex items-center gap-6">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Image
                  src="/assets/images/crab-mascot.png"
                  alt="Coral the Crab"
                  width={100}
                  height={100}
                  className="drop-shadow-lg"
                />
              </motion.div>
              <div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 mb-2"
                >
                  <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)]">
                    Meet Coral!
                  </h2>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    🦀
                  </motion.span>
                </motion.div>
                <p className="text-gray-700 leading-relaxed">
                  Coral is your friendly guide through the Bay Area! This curious hermit crab loves exploring tide pools and sharing fascinating facts about local wildlife. Coral adapts their teaching style based on your age level - from playful and simple for younger explorers to more detailed for older students.
                </p>
                <motion.div
                  className="flex gap-2 mt-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {['💬', '🌊', '✨', '❤️'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🗺️
                </motion.span>
                Start Exploring
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-2 border-dashed border-[var(--color-aqua)]/30 bg-gradient-to-r from-blue-50 to-white relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-3 mb-3">
            {['🌊', '🦀', '🐠', '🐙', '🌿'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-xl opacity-60"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Tide Pool Kids - Made with <span className="text-[var(--color-coral)]">❤️</span> for young Bay Area explorers
          </p>
        </div>
      </footer>
    </div>
  );
}
