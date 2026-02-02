'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

// XP thresholds for each level
const LEVEL_THRESHOLDS = [
  0,     // Level 1: 0-49
  50,    // Level 2: 50-149
  150,   // Level 3: 150-299
  300,   // Level 4: 300-499
  500,   // Level 5: 500-749
  750,   // Level 6: 750-1049
  1050,  // Level 7: 1050-1399
  1400,  // Level 8: 1400-1799
  1800,  // Level 9: 1800-2249
  2250,  // Level 10: 2250+
];

const LEVEL_TITLES = [
  'Curious Tadpole',
  'Beach Explorer',
  'Tide Pool Scout',
  'Wave Rider',
  'Ocean Friend',
  'Marine Helper',
  'Bay Guardian',
  'Sea Scientist',
  'Ocean Champion',
  'Bay Area Master',
];

const LEVEL_EMOJIS = ['🐣', '🐚', '🦀', '🏄', '🐬', '🦭', '🦈', '🔬', '🏆', '👑'];

export function getLevel(points: number): { level: number; title: string; emoji: string; xpInLevel: number; xpForNextLevel: number; progress: number } {
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (points >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }

  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 500;
  const xpInLevel = points - currentThreshold;
  const xpForNextLevel = nextThreshold - currentThreshold;
  const progress = Math.min((xpInLevel / xpForNextLevel) * 100, 100);

  return {
    level,
    title: LEVEL_TITLES[level - 1] || LEVEL_TITLES[LEVEL_TITLES.length - 1],
    emoji: LEVEL_EMOJIS[level - 1] || LEVEL_EMOJIS[LEVEL_EMOJIS.length - 1],
    xpInLevel,
    xpForNextLevel,
    progress,
  };
}

export function XPBar({ compact = false }: { compact?: boolean }) {
  const { totalPoints } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  const levelInfo = getLevel(mounted ? totalPoints : 0);

  // Check for level up
  useEffect(() => {
    if (mounted && levelInfo.level > prevLevel && prevLevel > 0) {
      setShowLevelUp(true);
      const timer = setTimeout(() => setShowLevelUp(false), 3000);
      return () => clearTimeout(timer);
    }
    setPrevLevel(levelInfo.level);
  }, [levelInfo.level, prevLevel, mounted]);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <motion.div
          className="level-badge w-8 h-8 rounded-full flex items-center justify-center text-sm text-white"
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          {levelInfo.level}
        </motion.div>
        <div className="hidden sm:block">
          <div className="text-xs text-gray-500">Level {levelInfo.level}</div>
          <div className="xp-bar-container w-20 h-2">
            <motion.div
              className="xp-bar-fill h-full"
              initial={{ width: 0 }}
              animate={{ width: `${levelInfo.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gray-100">
        <div className="flex items-center gap-4 mb-3">
          <motion.div
            className="text-4xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {levelInfo.emoji}
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="level-badge px-3 py-1 rounded-full text-white text-sm">
                Level {levelInfo.level}
              </span>
              <span className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)]">
                {levelInfo.title}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {mounted ? totalPoints : 0} XP total
            </div>
          </div>
        </div>

        <div className="xp-bar-container">
          <motion.div
            className="xp-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${levelInfo.progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{levelInfo.xpInLevel} XP</span>
          <span>{levelInfo.xpForNextLevel} XP to next level</span>
        </div>
      </div>

      {/* Level Up Celebration */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-center shadow-2xl"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -2, 2, 0],
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {levelInfo.emoji}
              </motion.div>
              <h2 className="font-[family-name:var(--font-fredoka)] text-3xl text-white mb-2">
                Level Up!
              </h2>
              <p className="text-white/90 text-xl">
                You are now a <span className="font-bold">{levelInfo.title}</span>!
              </p>
              <div className="mt-4 text-6xl">🎉</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Points popup that shows when earning points
export function PointsPopup({
  points,
  x,
  y,
  onComplete
}: {
  points: number;
  x: number;
  y: number;
  onComplete: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 font-bold text-2xl"
      style={{ left: x, top: y }}
      initial={{ opacity: 1, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, y: -50, scale: 1.5 }}
      transition={{ duration: 1 }}
    >
      <span className="text-yellow-500 drop-shadow-lg">+{points} ⭐</span>
    </motion.div>
  );
}
