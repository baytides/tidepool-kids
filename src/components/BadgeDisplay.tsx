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
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-300/50 shadow-sm hover:shadow-md transition-shadow"
        title={`${earnedCount} badges earned`}
      >
        <motion.span
          className="text-lg"
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🏅
        </motion.span>
        <span className="text-sm font-bold text-purple-700">
          {earnedCount}/{allBadges.length}
        </span>
      </motion.button>

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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gradient-to-b from-white to-purple-50 rounded-3xl shadow-2xl z-50 max-h-[80vh] overflow-hidden border-4 border-purple-200"
            >
              {/* Header */}
              <div className="p-6 border-b-2 border-dashed border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="text-4xl"
                      animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🏆
                    </motion.span>
                    <div>
                      <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)]">
                        Your Badges
                      </h2>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/50 rounded-full h-2 w-24 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${(earnedCount / allBadges.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <p className="text-sm font-bold text-purple-700">
                          {earnedCount}/{allBadges.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedBadge(null);
                    }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg text-gray-500"
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              {/* Badge grid */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-3 gap-4">
                  {allBadges.map((badge, index) => {
                    const isEarned = badges.includes(badge.id as BadgeId);
                    const isSelected = selectedBadge === badge.id;

                    return (
                      <motion.button
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.05, type: 'spring' }}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedBadge(isSelected ? null : badge.id as BadgeId)}
                        className={`relative flex flex-col items-center p-4 rounded-2xl transition-all shadow-sm hover:shadow-lg ${
                          isSelected
                            ? 'bg-gradient-to-br from-[var(--color-aqua)]/30 to-[var(--color-teal)]/30 ring-3 ring-[var(--color-teal)]'
                            : isEarned
                            ? 'bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200'
                            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200'
                        }`}
                      >
                        {/* Shine effect for earned badges */}
                        {isEarned && (
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          />
                        )}

                        <motion.span
                          className={`text-4xl mb-2 relative ${!isEarned && 'grayscale opacity-40'}`}
                          animate={isEarned ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {badge.emoji}
                        </motion.span>
                        <span className={`text-xs font-bold text-center ${
                          isEarned ? 'text-[var(--color-navy)]' : 'text-gray-400'
                        }`}>
                          {badge.name}
                        </span>
                        {isEarned && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-md"
                          >
                            ✓
                          </motion.span>
                        )}
                        {!isEarned && (
                          <motion.span
                            className="absolute -top-1 -right-1 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs"
                          >
                            🔒
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Selected badge detail */}
                <AnimatePresence>
                  {selectedBadge && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: 20 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 20 }}
                      className="mt-6 p-5 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg border-2 border-purple-200"
                    >
                      <div className="flex items-start gap-4">
                        <motion.span
                          className="text-5xl"
                          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {BADGES[selectedBadge].emoji}
                        </motion.span>
                        <div className="flex-1">
                          <h3 className="font-[family-name:var(--font-fredoka)] text-xl text-[var(--color-navy)] mb-1">
                            {BADGES[selectedBadge].name}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed mb-2">
                            {BADGES[selectedBadge].description}
                          </p>
                          {badges.includes(selectedBadge) ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-sm font-bold rounded-full shadow-md"
                            >
                              <span>✓</span>
                              <span>Earned!</span>
                              <motion.span
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              >
                                ⭐
                              </motion.span>
                            </motion.div>
                          ) : (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                              <span>🔒</span>
                              <span>Keep exploring to unlock!</span>
                            </div>
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
