'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AgeLevel } from '@/types';
import { ageLevelConfig } from '@/utils/ageContent';

const ageLevels: AgeLevel[] = ['k2', 'grades35', 'grades68'];

export function AgeSelectorModal() {
  const { ageLevel, setAgeLevel, hasSeenAgeSelector, setHasSeenAgeSelector, recordVisit } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR or before hydration
  if (!mounted) return null;

  const isOpen = !hasSeenAgeSelector && !ageLevel;

  const handleSelect = (level: AgeLevel) => {
    setAgeLevel(level);
    setHasSeenAgeSelector(true);
    recordVisit(); // Start tracking daily visits
  };

  // Get color theme for each level
  const getLevelColors = (level: AgeLevel) => {
    switch (level) {
      case 'k2':
        return {
          bg: 'from-pink-50 to-rose-100',
          border: 'border-pink-300',
          iconBg: 'bg-gradient-to-br from-pink-200 to-rose-200',
          hover: 'hover:border-pink-400 hover:from-pink-100 hover:to-rose-150'
        };
      case 'grades35':
        return {
          bg: 'from-blue-50 to-cyan-100',
          border: 'border-blue-300',
          iconBg: 'bg-gradient-to-br from-blue-200 to-cyan-200',
          hover: 'hover:border-blue-400 hover:from-blue-100 hover:to-cyan-150'
        };
      case 'grades68':
        return {
          bg: 'from-purple-50 to-indigo-100',
          border: 'border-purple-300',
          iconBg: 'bg-gradient-to-br from-purple-200 to-indigo-200',
          hover: 'hover:border-purple-400 hover:from-purple-100 hover:to-indigo-150'
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-blue-900/60 to-teal-900/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-selector-title"
        >
          {/* Floating decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {['🦀', '🐠', '🐙', '🌊', '⭐', '🐚'].map((emoji, i) => (
              <motion.span
                key={i}
                className="absolute text-4xl opacity-20"
                style={{
                  left: `${10 + (i * 15)}%`,
                  top: `${10 + (i * 10)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, y: 40, rotate: -2 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, y: 40, rotate: 2 }}
            className="bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-[var(--color-aqua)] relative overflow-hidden"
          >
            {/* Top decorative wave */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[var(--color-coral)] via-[var(--color-sunny)] to-[var(--color-aqua)]" />

            {/* Mascot and greeting */}
            <div className="text-center mb-6">
              <motion.div
                className="relative inline-block"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              >
                <img
                  src="/assets/images/crab-mascot.png"
                  alt="Coral the Crab"
                  width={100}
                  height={100}
                  className="mx-auto drop-shadow-lg"
                />
                {/* Speech bubble */}
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[var(--color-sunny)]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  👋
                </motion.div>
              </motion.div>

              <motion.h2
                id="age-selector-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-[family-name:var(--font-fredoka)] text-3xl text-[var(--color-navy)] mb-2"
              >
                Hi there, explorer!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600"
              >
                What grade are you in? I&apos;ll show you the best stuff for your level!
              </motion.p>

              {/* Animated emojis */}
              <motion.div
                className="flex justify-center gap-2 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {['🌟', '🦀', '🌊'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Age level buttons */}
            <div className="space-y-3">
              {ageLevels.map((level, index) => {
                const config = ageLevelConfig[level];
                const colors = getLevelColors(level);
                return (
                  <motion.button
                    key={level}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onClick={() => handleSelect(level)}
                    whileHover={{ scale: 1.03, x: 8 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full p-4 rounded-2xl border-3 ${colors.border} bg-gradient-to-r ${colors.bg} ${colors.hover} transition-all flex items-center gap-4 text-left shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)] focus-visible:ring-offset-2`}
                  >
                    <motion.span
                      className={`text-4xl w-14 h-14 flex items-center justify-center ${colors.iconBg} rounded-2xl shadow-sm`}
                      aria-hidden="true"
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {config.icon}
                    </motion.span>
                    <div className="flex-1">
                      <div className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)]">
                        {config.label}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {config.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {config.description}
                      </div>
                    </div>
                    <motion.span
                      className="text-2xl text-[var(--color-aqua)]"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>

            {/* Parent note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-xs text-center text-gray-400 flex items-center justify-center gap-1"
            >
              <span>👨‍👩‍👧</span>
              Parents: You can change this anytime using the level selector in the header.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
