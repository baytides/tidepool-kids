'use client';

import { motion } from 'framer-motion';
import { getContent } from '@/utils/ageContent';
import { useAppStore } from '@/store/useAppStore';

interface CoralDialogueProps {
  message: {
    k2: string;
    grades35: string;
    grades68: string;
  };
  variant?: 'speech' | 'thought' | 'excited' | 'encouraging' | 'celebrating';
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

  // Personality emojis by variant
  const getEmoji = () => {
    switch (variant) {
      case 'excited': return '🎉';
      case 'encouraging': return '💪';
      case 'celebrating': return '🏆';
      case 'thought': return '💭';
      default: return '';
    }
  };

  // Animation styles by variant
  const getCoralAnimation = () => {
    switch (variant) {
      case 'excited':
      case 'celebrating':
        return {
          y: [0, -8, 0],
          rotate: [0, -10, 10, 0],
          scale: [1, 1.1, 1]
        };
      case 'encouraging':
        return {
          y: [0, -5, 0],
          rotate: [0, 5, -5, 0]
        };
      case 'thought':
        return {
          y: [0, -3, 0]
        };
      default:
        return {
          rotate: [0, -3, 3, 0]
        };
    }
  };

  const variantStyles = {
    speech: {
      bg: 'bg-gradient-to-r from-[var(--color-sand)] to-amber-50',
      border: 'border-l-4 border-[var(--color-coral)]',
      text: 'text-gray-700'
    },
    thought: {
      bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
      border: 'border-l-4 border-[var(--color-aqua)]',
      text: 'text-[var(--color-navy)]'
    },
    excited: {
      bg: 'bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100',
      border: 'border-2 border-[var(--color-sunny)]',
      text: 'text-amber-900 font-medium'
    },
    encouraging: {
      bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
      border: 'border-l-4 border-green-400',
      text: 'text-green-800'
    },
    celebrating: {
      bg: 'bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100',
      border: 'border-2 border-purple-300',
      text: 'text-purple-900 font-bold'
    }
  };

  const style = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`flex items-start gap-4 p-4 rounded-2xl ${style.bg} ${style.border} relative shadow-md overflow-hidden`}
    >
      {/* Decorative elements for exciting variants */}
      {(variant === 'excited' || variant === 'celebrating') && (
        <>
          <motion.span
            className="absolute top-2 right-8 text-lg opacity-40"
            animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute bottom-2 right-4 text-sm opacity-30"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            ⭐
          </motion.span>
        </>
      )}

      {/* Coral mascot with animation */}
      <motion.div
        className="relative flex-shrink-0"
        animate={getCoralAnimation()}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img
          src="/assets/images/crab-mascot.png"
          alt="Coral"
          className="w-14 h-14 drop-shadow-md"
        />
        {/* Speech indicator bubble */}
        {variant === 'speech' && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs shadow-sm border border-gray-200"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💬
          </motion.div>
        )}
        {variant === 'thought' && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs shadow-sm border border-gray-200"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💭
          </motion.div>
        )}
      </motion.div>

      {/* Message content */}
      <div className="flex-1 pt-1">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-sm leading-relaxed ${style.text}`}
        >
          {getEmoji() && (
            <motion.span
              className="inline-block mr-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              {getEmoji()}
            </motion.span>
          )}
          {text}
        </motion.p>
      </div>

      {/* Close button */}
      {showClose && onClose && (
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-500 text-xs shadow-sm"
        >
          ✕
        </motion.button>
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
