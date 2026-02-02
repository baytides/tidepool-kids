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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-selector-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
          >
            {/* Mascot and greeting */}
            <div className="text-center mb-6">
              <motion.img
                src="/assets/images/crab-mascot.png"
                alt="Coral the Crab"
                width={80}
                height={80}
                className="mx-auto mb-4"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <h2
                id="age-selector-title"
                className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-2"
              >
                Hi there, explorer!
              </h2>
              <p className="text-gray-600">
                What grade are you in? I&apos;ll show you the best stuff for your level!
              </p>
            </div>

            {/* Age level buttons */}
            <div className="space-y-3">
              {ageLevels.map((level) => {
                const config = ageLevelConfig[level];
                return (
                  <motion.button
                    key={level}
                    onClick={() => handleSelect(level)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 hover:border-[var(--color-aqua)] hover:bg-[var(--color-aqua)]/5 transition-colors flex items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)] focus-visible:ring-offset-2"
                  >
                    <span
                      className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl"
                      aria-hidden="true"
                    >
                      {config.icon}
                    </span>
                    <div className="flex-1">
                      <div className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)]">
                        {config.label} <span className="font-normal text-gray-500">({config.title})</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {config.description}
                      </div>
                    </div>
                    <motion.span
                      className="text-gray-300"
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>

            {/* Parent note */}
            <p className="mt-6 text-xs text-center text-gray-400">
              Parents: You can change this anytime using the level selector in the header.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
