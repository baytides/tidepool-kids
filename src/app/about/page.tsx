import { Header } from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Image
                src="/assets/images/crab-mascot.png"
                alt="Coral the Crab"
                width={120}
                height={120}
                priority
              />
            </div>
            <h1 className="font-[family-name:var(--font-fredoka)] text-4xl text-[var(--color-navy)] mb-4">
              About Tide Pool Kids
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              An interactive educational experience for young explorers to discover the San Francisco Bay Area&apos;s natural wonders and community systems.
            </p>
          </div>

          {/* Mission section */}
          <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tide Pool Kids connects children ages 5-14 with the incredible ecosystems and infrastructure of the San Francisco Bay Area. Through interactive exploration, games, and age-appropriate content, we help young learners understand:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-xl">🦀</span>
                <span>The diverse wildlife in tide pools, wetlands, forests, and beaches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">💧</span>
                <span>How our community systems work - from water treatment to recycling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">🌍</span>
                <span>The importance of environmental stewardship and conservation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">🔬</span>
                <span>Scientific concepts through hands-on learning and discovery</span>
              </li>
            </ul>
          </section>

          {/* Features section */}
          <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-4">
              Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">Age-Adaptive Content</h3>
                <p className="text-sm text-gray-600">
                  Content automatically adjusts for K-2, grades 3-5, and grades 6-8, ensuring appropriate complexity and vocabulary.
                </p>
              </div>
              <div className="p-4 bg-teal-50 rounded-xl">
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">Interactive Activities</h3>
                <p className="text-sm text-gray-600">
                  Quizzes, sorting games, and creature collection keep learning fun and engaging.
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl">
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">Progress Tracking</h3>
                <p className="text-sm text-gray-600">
                  Earn points, collect badges, and track visited locations to encourage continued exploration.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-[var(--color-navy)] mb-2">Real Bay Area Locations</h3>
                <p className="text-sm text-gray-600">
                  Explore 19 real locations including Fitzgerald Marine Reserve, Muir Woods, and more.
                </p>
              </div>
            </div>
          </section>

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
          <section className="bg-gradient-to-r from-[var(--color-coral)]/10 to-[var(--color-sand)] rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6">
              <Image
                src="/assets/images/crab-mascot.png"
                alt="Coral the Crab"
                width={80}
                height={80}
              />
              <div>
                <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-2">
                  Meet Coral!
                </h2>
                <p className="text-gray-700">
                  Coral is your friendly guide through the Bay Area! This curious hermit crab loves exploring tide pools and sharing fascinating facts about local wildlife. Coral adapts their teaching style based on your age level - from playful and simple for younger explorers to more detailed for older students.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-teal)] text-white rounded-full font-medium hover:bg-[var(--color-teal)]/90 transition-colors"
            >
              Start Exploring
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center text-sm text-gray-500">
          <p>Tide Pool Kids - Made with care for young Bay Area explorers</p>
        </div>
      </footer>
    </div>
  );
}
