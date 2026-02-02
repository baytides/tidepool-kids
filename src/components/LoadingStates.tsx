'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ocean' | 'beach' | 'forest';
}

/**
 * Playful animated loading spinner with ocean creatures
 */
export function LoadingSpinner({ size = 'md', variant = 'ocean' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
  };

  const creatures = {
    ocean: ['🦀', '🐙', '🐠', '🦑', '🐚'],
    beach: ['🏖️', '⛱️', '🌊', '🐚', '🦀'],
    forest: ['🌲', '🦌', '🐿️', '🦉', '🍄'],
  };

  const emojis = creatures[variant];

  return (
    <div className={`relative ${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]}`}>
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className={`absolute inset-0 flex items-center justify-center ${sizeClasses[size].split(' ')[2]}`}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.6,
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            },
          }}
          style={{
            transformOrigin: 'center center',
          }}
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {emoji}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Bouncing dots loading indicator
 */
export function LoadingDots() {
  const dots = ['🔵', '🟢', '🟡'];

  return (
    <div className="flex items-center gap-2">
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className="text-lg"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        >
          {dot}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Swimming fish loading animation
 */
export function LoadingFish() {
  return (
    <div className="relative h-12 w-32 overflow-hidden">
      <motion.div
        className="absolute text-3xl"
        animate={{
          x: [-20, 140],
          y: [0, -5, 5, 0],
        }}
        transition={{
          x: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          },
          y: {
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        🐠
      </motion.div>
      <motion.div
        className="absolute text-2xl"
        animate={{
          x: [-30, 150],
          y: [5, 0, 10, 5],
        }}
        transition={{
          x: {
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.5,
          },
          y: {
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        🐟
      </motion.div>
    </div>
  );
}

interface LoadingCardProps {
  message?: string;
  variant?: 'ocean' | 'beach' | 'forest';
}

/**
 * Full loading card with message and animation
 */
export function LoadingCard({ message = 'Loading...', variant = 'ocean' }: LoadingCardProps) {
  const backgrounds = {
    ocean: 'from-blue-100 via-cyan-50 to-white',
    beach: 'from-amber-100 via-yellow-50 to-white',
    forest: 'from-green-100 via-emerald-50 to-white',
  };

  const mascot = {
    ocean: '🦀',
    beach: '🐚',
    forest: '🌲',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b ${backgrounds[variant]} border-2 border-white/50 shadow-lg`}
    >
      {/* Animated mascot */}
      <motion.div
        className="text-6xl mb-4"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {mascot[variant]}
      </motion.div>

      {/* Loading spinner */}
      <div className="mb-4">
        <LoadingDots />
      </div>

      {/* Message */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-gray-600 font-medium text-center"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}

/**
 * Skeleton loading placeholder for content
 */
export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3 w-full">
      {[...Array(lines)].map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"
          style={{ width: `${100 - i * 15}%` }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Exploring animation for when content is being discovered
 */
export function ExploringAnimation() {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Compass animation */}
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-5xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🧭
        </motion.span>
      </motion.div>

      {/* Exploration text with typing effect */}
      <div className="flex items-center gap-1">
        <span className="text-gray-600 font-medium">Exploring</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ...
        </motion.span>
      </div>

      {/* Little creatures exploring */}
      <div className="flex gap-4">
        {['🦀', '🐙', '🐠'].map((creature, i) => (
          <motion.span
            key={i}
            className="text-2xl"
            animate={{
              x: [0, 10, 0, -10, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {creature}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * Page-level loading screen
 */
export function PageLoader({ message = 'Getting ready...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-100 via-cyan-50 to-white">
      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-blue-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: -20,
            }}
            animate={{
              y: [-20, -800],
              x: [0, Math.random() * 100 - 50],
              scale: [1, 0.5],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo/Mascot */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src="/assets/images/crab-mascot.png"
            alt="Coral"
            className="w-32 h-32 drop-shadow-lg"
          />
        </motion.div>

        {/* Loading text */}
        <motion.h2
          className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mt-6 mb-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.h2>

        {/* Progress bar style */}
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)]"
            animate={{ x: ['-100%', '200%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Fun tip */}
        <motion.p
          className="mt-6 text-sm text-gray-500 text-center max-w-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Did you know? 🦀 Hermit crabs switch shells as they grow bigger!
        </motion.p>
      </div>
    </div>
  );
}
