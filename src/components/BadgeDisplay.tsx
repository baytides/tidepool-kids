'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BADGES, BadgeId, useAppStore } from '@/store/useAppStore';

export function BadgeDisplay() {
  const { badges } = useAppStore();
  const [selectedBadge, setSelectedBadge] = useState<BadgeId | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const allBadges = Object.values(BADGES);
  const earnedCount = badges.length;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-sand)] rounded-full hover:bg-[var(--color-sand)]/80 transition-colors"
        title={`${earnedCount} badges earned`}
      >
        <span className="text-lg">🏅</span>
        <span className="text-sm font-medium text-[var(--color-navy)]">
          {earnedCount}/{allBadges.length}
        </span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                setSelectedBadge(null);
              }}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)]">
                      Your Badges
                    </h2>
                    <p className="text-sm text-gray-500">
                      {earnedCount} of {allBadges.length} earned
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedBadge(null);
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Badge grid */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-3 gap-4">
                  {allBadges.map((badge) => {
                    const isEarned = badges.includes(badge.id as BadgeId);
                    const isSelected = selectedBadge === badge.id;

                    return (
                      <motion.button
                        key={badge.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedBadge(isSelected ? null : badge.id as BadgeId)}
                        className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[var(--color-teal)]/20 ring-2 ring-[var(--color-teal)]'
                            : isEarned
                            ? 'bg-amber-50 hover:bg-amber-100'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <span className={`text-4xl mb-2 ${!isEarned && 'grayscale opacity-40'}`}>
                          {badge.emoji}
                        </span>
                        <span className={`text-xs font-medium text-center ${
                          isEarned ? 'text-[var(--color-navy)]' : 'text-gray-400'
                        }`}>
                          {badge.name}
                        </span>
                        {isEarned && (
                          <span className="text-green-500 text-xs mt-1">✓ Earned</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Selected badge detail */}
                <AnimatePresence>
                  {selectedBadge && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 bg-[var(--color-sand)]/50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">
                          {BADGES[selectedBadge].emoji}
                        </span>
                        <div>
                          <h3 className="font-semibold text-[var(--color-navy)]">
                            {BADGES[selectedBadge].name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {BADGES[selectedBadge].description}
                          </p>
                          {badges.includes(selectedBadge) ? (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              ✓ Earned!
                            </span>
                          ) : (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                              Keep exploring to earn this!
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
