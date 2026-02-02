'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const COLORS = ['#ff6b6b', '#ffd93d', '#4ade80', '#26c6da', '#9b59b6', '#ff9f43', '#e91e8c'];
const EMOJIS = ['⭐', '🌟', '✨', '💫', '🎉', '🎊', '🦀', '🐠', '🌊'];

export function Confetti({
  active,
  duration = 3000,
  pieceCount = 50,
  useEmojis = false
}: {
  active: boolean;
  duration?: number;
  pieceCount?: number;
  useEmojis?: boolean;
}) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      const newPieces: ConfettiPiece[] = Array.from({ length: pieceCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 8 + Math.random() * 16,
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration, pieceCount]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              y: -50,
              x: `${piece.x}vw`,
              rotate: 0,
              scale: 0
            }}
            animate={{
              y: '110vh',
              rotate: piece.rotation + 720,
              scale: [0, 1, 1, 0.5]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              fontSize: useEmojis ? `${piece.size * 1.5}px` : `${piece.size}px`,
            }}
          >
            {useEmojis ? (
              EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
            ) : (
              <div
                style={{
                  width: piece.size,
                  height: piece.size * 0.6,
                  backgroundColor: piece.color,
                  borderRadius: '2px',
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Sparkle effect for smaller celebrations
export function Sparkles({ active, x, y }: { active: boolean; x?: number; y?: number }) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; angle: number; distance: number }>>([]);

  useEffect(() => {
    if (active) {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (i * 45) + Math.random() * 20 - 10,
        distance: 30 + Math.random() * 20,
      }));
      setSparkles(newSparkles);

      const timer = setTimeout(() => setSparkles([]), 600);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (sparkles.length === 0) return null;

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: x ?? '50%', top: y ?? '50%', transform: 'translate(-50%, -50%)' }}
    >
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 0],
            x: Math.cos(sparkle.angle * Math.PI / 180) * sparkle.distance,
            y: Math.sin(sparkle.angle * Math.PI / 180) * sparkle.distance,
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute text-2xl"
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
}

// Floating bubbles for ocean theme
export function FloatingBubbles({ count = 10 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  const [bubbles] = useState(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 10 + Math.random() * 30,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
  })));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.left}%`,
            bottom: -50,
            width: bubble.size,
            height: bubble.size,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(38, 198, 218, 0.3))',
            border: '1px solid rgba(255,255,255,0.5)',
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.sin(bubble.id) * 30, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// Swimming fish decoration
export function SwimmingFish() {
  const fish = ['🐠', '🐟', '🐡', '🦈', '🐙', '🦑', '🦐', '🦞'];
  const [fishList] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      emoji: fish[Math.floor(Math.random() * fish.length)],
      y: 20 + Math.random() * 60,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 10,
      size: 1.5 + Math.random() * 1,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {fishList.map((f) => (
        <motion.span
          key={f.id}
          className="absolute"
          style={{
            top: `${f.y}%`,
            fontSize: `${f.size}rem`,
          }}
          animate={{
            x: ['-10%', '110%'],
            scaleX: [1, 1, -1, -1, 1],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {f.emoji}
        </motion.span>
      ))}
    </div>
  );
}
