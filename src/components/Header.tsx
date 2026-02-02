'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export function Header() {
  const { visitedLocations, collectedCreatures } = useAppStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/crab-mascot.png"
            alt="Coral the Crab"
            width={40}
            height={40}
          />
          <span className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[--color-navy]">
            Tidepool Kids
          </span>
        </a>

        <nav className="flex items-center gap-6">
          <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Explore
          </a>
          <a href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-[--color-sand] rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span>📍</span>
            <span className="text-sm font-medium">{visitedLocations.length}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-[--color-sand] rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span>🦀</span>
            <span className="text-sm font-medium">{collectedCreatures.length}</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
