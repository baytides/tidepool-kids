'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AgeLevel } from '@/types';
import { getContent } from '@/utils/ageContent';
import { useAppStore } from '@/store/useAppStore';

interface CoralDialogueProps {
  message: {
    k2: string;
    grades35: string;
    grades68: string;
  };
  variant?: 'speech' | 'thought' | 'excited';
  onClose?: () => void;
  showClose?: boolean;
}

export function CoralDialogue({
  message,
  variant = 'speech',
  onClose,
  showClose = false,
}: CoralDialogueProps) {
  const { ageLevel } = useAppStore();
  const text = getContent(message, ageLevel);

  // Personality emojis by age level
  const getEmoji = () => {
    if (variant === 'excited') {
      switch (ageLevel) {
        case 'k2': return '🎉';
        case 'grades35': return '⭐';
        case 'grades68': return '✨';
        default: return '⭐';
      }
    }
    return '';
  };

  const bgColor = {
    speech: 'bg-[var(--color-sand)]',
    thought: 'bg-blue-50',
    excited: 'bg-gradient-to-r from-amber-100 to-orange-100',
  }[variant];

  const borderStyle = {
    speech: 'border-l-4 border-[var(--color-coral)]',
    thought: 'border-l-4 border-[var(--color-aqua)]',
    excited: 'border-2 border-amber-300',
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className={`flex items-start gap-3 p-4 rounded-xl ${bgColor} ${borderStyle} relative`}
    >
      <img
        src="/assets/images/crab-mascot.png"
        alt="Coral"
        className="w-12 h-12 flex-shrink-0"
      />
      <div className="flex-1">
        <p className={`text-sm ${variant === 'excited' ? 'font-medium text-amber-900' : 'text-gray-700'}`}>
          {getEmoji()} {text}
        </p>
      </div>
      {showClose && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200/50 hover:bg-gray-200 text-gray-500 text-xs"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
}

/**
 * Pre-defined Coral dialogues for common scenarios
 */
export const CORAL_DIALOGUES = {
  welcome: {
    k2: "Hi friend! I'm Coral! Let's explore together!",
    grades35: "Welcome back, explorer! Ready to discover something cool?",
    grades68: "Good to see you! Let's continue our exploration of Bay Area ecosystems.",
  },
  firstVisit: {
    k2: "Wow! This is your first place! Tap around to see what's here!",
    grades35: "Your first location! Explore the tabs to learn about this place.",
    grades68: "Great start! Each location has multiple tabs with detailed information.",
  },
  activityIntro: {
    k2: "Yay! Game time! Let's play and learn!",
    grades35: "Ready for a challenge? This activity will test what you've learned!",
    grades68: "Apply your knowledge with this interactive activity.",
  },
  activityComplete: {
    k2: "You did it! Amazing job! 🎉",
    grades35: "Great work! You've earned some points!",
    grades68: "Well done! Your understanding is growing.",
  },
  perfectScore: {
    k2: "WOW! Perfect! You're a superstar! ⭐",
    grades35: "Perfect score! You really know your stuff!",
    grades68: "Excellent! A perfect score demonstrates mastery.",
  },
  creatureCollected: {
    k2: "You found a new friend! Keep looking!",
    grades35: "New creature collected! Each one has a unique story.",
    grades68: "Species documented. Understanding biodiversity requires observation.",
  },
  badgeEarned: {
    k2: "YAY! You got a shiny badge! So cool!",
    grades35: "Badge earned! Keep exploring to earn more!",
    grades68: "Achievement unlocked. Your expertise is growing.",
  },
  encouragement: {
    k2: "You're doing great! Keep going!",
    grades35: "Nice progress! There's so much more to discover.",
    grades68: "Solid work. Continue exploring to deepen your understanding.",
  },
} as const;
