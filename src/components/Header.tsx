'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AgeLevelToggle } from './AgeLevelToggle';
import { BadgeDisplay } from './BadgeDisplay';
import { SoundToggle } from './SoundToggle';

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
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-white via-blue-50 to-white border-b-2 border-[var(--color-aqua)]/30">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
        {/* Logo and title */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <Image
              src="/assets/images/crab-mascot.png"
              alt="Coral the Crab"
              width={40}
              height={40}
              priority
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[var(--color-navy)] group-hover:text-[var(--color-teal)] transition-colors">
              Tide Pool Kids
            </span>
            <motion.span
              className="text-[10px] text-[var(--color-coral)] font-medium -mt-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Explore • Learn • Play
            </motion.span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold text-[var(--color-navy)] hover:text-white hover:bg-[var(--color-aqua)] rounded-full transition-all"
          >
            <span>🗺️</span>
            Explore
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold text-[var(--color-navy)] hover:text-white hover:bg-[var(--color-teal)] rounded-full transition-all"
          >
            <span>🦀</span>
            About
          </Link>
        </nav>

        {/* Stats and controls */}
        <div className="flex items-center gap-3">
          {/* Sound toggle */}
          <SoundToggle />

          {/* Age level toggle */}
          <AgeLevelToggle />

          {/* Badge display */}
          <BadgeDisplay />

          {/* Points with animation */}
          <div className="relative">
            <motion.div
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full border-2 border-[var(--color-sunny)]/50 shadow-sm"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${mounted ? totalPoints : 0} points`}
            >
              <motion.span
                aria-hidden="true"
                className="text-lg"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.span>
              <span className="text-sm font-bold text-amber-700 tabular-nums">
                {mounted ? totalPoints : 0}
              </span>
            </motion.div>

            {/* Points added animation */}
            <AnimatePresence>
              {showPointsAnimation && (
                <motion.span
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, y: -25, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 text-sm font-bold text-green-500 whitespace-nowrap"
                >
                  +{totalPoints - prevPoints} ✨
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Streak indicator (only show if streak > 1) */}
          {mounted && currentStreak > 1 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 rounded-full border-2 border-orange-300/50 shadow-sm"
              whileHover={{ scale: 1.08, y: -2 }}
              aria-label={`${currentStreak} day streak`}
            >
              <motion.span
                aria-hidden="true"
                className="text-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🔥
              </motion.span>
              <span className="text-sm font-bold text-orange-700">{currentStreak}</span>
            </motion.div>
          )}

          {/* Places visited */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border-2 border-[var(--color-aqua)]/30 shadow-sm"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${mounted ? visitedLocations.length : 0} places visited`}
          >
            <motion.span
              aria-hidden="true"
              className="text-lg"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              📍
            </motion.span>
            <span className="text-sm font-bold text-[var(--color-teal)] tabular-nums">
              {mounted ? visitedLocations.length : 0}
            </span>
          </motion.div>

          {/* Creatures collected */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border-2 border-green-300/50 shadow-sm"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${mounted ? collectedCreatures.length : 0} creatures collected`}
          >
            <motion.span
              aria-hidden="true"
              className="text-lg"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🦀
            </motion.span>
            <span className="text-sm font-bold text-green-700 tabular-nums">
              {mounted ? collectedCreatures.length : 0}
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
