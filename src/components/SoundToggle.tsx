'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    toggleSound();
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 1000);
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
          soundEnabled
            ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
            : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-500'
        }`}
        aria-label={soundEnabled ? 'Sound on, click to mute' : 'Sound off, click to unmute'}
        aria-pressed={soundEnabled}
      >
        {/* Sound waves animation when enabled */}
        <AnimatePresence mode="wait">
          {soundEnabled ? (
            <motion.div
              key="sound-on"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <span className="text-xl">🔊</span>
              {/* Animated sound waves */}
              <motion.div
                className="absolute -right-1 top-1/2 -translate-y-1/2"
                animate={{ opacity: [0, 1, 0], x: [0, 4, 8] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-1 h-1 bg-white rounded-full" />
              </motion.div>
              <motion.div
                className="absolute -right-1 top-1/2 -translate-y-1/2"
                animate={{ opacity: [0, 1, 0], x: [0, 6, 12] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              >
                <div className="w-1 h-1 bg-white rounded-full" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="sound-off"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              <span className="text-xl">🔇</span>
              {/* X mark animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ rotate: -45 }}
                animate={{ rotate: [-45, -50, -45] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-6 h-0.5 bg-red-400 rounded-full opacity-0" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect when enabled */}
        {soundEnabled && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Feedback tooltip */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.9 }}
            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg ${
              soundEnabled
                ? 'bg-green-500 text-white'
                : 'bg-gray-400 text-white'
            }`}
          >
            {soundEnabled ? (
              <span className="flex items-center gap-1">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  🎵
                </motion.span>
                Sound On!
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span>🔕</span>
                Sound Off
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Musical notes floating when enabled */}
      {soundEnabled && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {['🎵', '🎶', '🎵'].map((note, i) => (
            <motion.span
              key={i}
              className="absolute text-xs"
              initial={{ opacity: 0, x: 20, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [20, 30 + i * 5, 40],
                y: [0, -15 - i * 5, -30],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            >
              {note}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
