'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AgeLevelToggle } from './AgeLevelToggle';
import { BadgeDisplay } from './BadgeDisplay';

export function Header() {
  const { visitedLocations, collectedCreatures, totalPoints, currentStreak, recordVisit } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [prevPoints, setPrevPoints] = useState(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    recordVisit(); // Record daily visit for streak
  }, [recordVisit]);

  // Animate points when they change
  useEffect(() => {
    if (mounted && totalPoints > prevPoints && prevPoints > 0) {
      setShowPointsAnimation(true);
      const timer = setTimeout(() => setShowPointsAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevPoints(totalPoints);
  }, [totalPoints, prevPoints, mounted]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
        {/* Logo and title */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/assets/images/crab-mascot.png"
            alt="Coral the Crab"
            width={40}
            height={40}
            priority
          />
          <span className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[var(--color-navy)]">
            Tide Pool Kids
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Stats and controls */}
        <div className="flex items-center gap-3">
          {/* Age level toggle */}
          <AgeLevelToggle />

          {/* Badge display */}
          <BadgeDisplay />

          {/* Points with animation */}
          <div className="relative">
            <motion.div
              className="flex items-center gap-1 px-3 py-1 bg-[var(--color-sand)] rounded-full"
              whileHover={{ scale: 1.05 }}
              aria-label={`${mounted ? totalPoints : 0} points`}
            >
              <span aria-hidden="true">⭐</span>
              <span className="text-sm font-medium tabular-nums">
                {mounted ? totalPoints : 0}
              </span>
            </motion.div>

            {/* Points added animation */}
            <AnimatePresence>
              {showPointsAnimation && (
                <motion.span
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -20 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-green-500"
                >
                  +{totalPoints - prevPoints}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Streak indicator (only show if streak > 1) */}
          {mounted && currentStreak > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full"
              whileHover={{ scale: 1.05 }}
              aria-label={`${currentStreak} day streak`}
            >
              <span aria-hidden="true">🔥</span>
              <span className="text-sm font-medium">{currentStreak}</span>
            </motion.div>
          )}

          {/* Places visited */}
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-[var(--color-sand)] rounded-full"
            whileHover={{ scale: 1.05 }}
            aria-label={`${mounted ? visitedLocations.length : 0} places visited`}
          >
            <span aria-hidden="true">📍</span>
            <span className="text-sm font-medium tabular-nums">
              {mounted ? visitedLocations.length : 0}
            </span>
          </motion.div>

          {/* Creatures collected */}
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-[var(--color-sand)] rounded-full"
            whileHover={{ scale: 1.05 }}
            aria-label={`${mounted ? collectedCreatures.length : 0} creatures collected`}
          >
            <span aria-hidden="true">🦀</span>
            <span className="text-sm font-medium tabular-nums">
              {mounted ? collectedCreatures.length : 0}
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
