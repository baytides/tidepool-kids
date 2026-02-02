'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BADGES, BadgeId, useAppStore } from '@/store/useAppStore';
import { Confetti } from './Confetti';

// Milestone definitions
const MILESTONES = {
  locations: [
    { count: 3, emoji: '🗺️', title: 'Explorer!', message: '3 locations visited!' },
    { count: 5, emoji: '🧭', title: 'Adventurer!', message: '5 locations explored!' },
    { count: 10, emoji: '🌟', title: 'Trailblazer!', message: '10 places discovered!' },
    { count: 15, emoji: '🎖️', title: 'Pathfinder!', message: '15 spots found!' },
  ],
  creatures: [
    { count: 5, emoji: '🦀', title: 'Creature Spotter!', message: '5 creatures collected!' },
    { count: 10, emoji: '🐙', title: 'Wildlife Watcher!', message: '10 creatures found!' },
    { count: 25, emoji: '🔬', title: 'Field Scientist!', message: '25 species documented!' },
    { count: 50, emoji: '🏅', title: 'Master Naturalist!', message: '50 creatures collected!' },
  ],
  points: [
    { count: 50, emoji: '⭐', title: 'Rising Star!', message: '50 points earned!' },
    { count: 100, emoji: '💫', title: 'Shining Bright!', message: '100 points!' },
    { count: 250, emoji: '🌠', title: 'Superstar!', message: '250 points reached!' },
    { count: 500, emoji: '🏆', title: 'Champion!', message: '500 points!' },
    { count: 1000, emoji: '👑', title: 'Legendary!', message: '1000 points!' },
  ],
};

interface ToastNotification {
  id: string;
  type: 'badge' | 'points' | 'streak' | 'milestone';
  badgeId?: BadgeId;
  points?: number;
  streak?: number;
  milestone?: {
    emoji: string;
    title: string;
    message: string;
    category: 'locations' | 'creatures' | 'points';
  };
}

export function AchievementToast() {
  const { badges, currentStreak, visitedLocations, collectedCreatures, totalPoints } = useAppStore();
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const lastBadgeCountRef = useRef<number | null>(null);
  const lastStreakRef = useRef<number | null>(null);
  const lastLocationsRef = useRef<number | null>(null);
  const lastCreaturesRef = useRef<number | null>(null);
  const lastPointsRef = useRef<number | null>(null);
  const achievedMilestonesRef = useRef<Set<string>>(new Set());

  // Wait for hydration before starting to track
  // Use a longer delay to ensure zustand has fully hydrated from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      lastBadgeCountRef.current = badges.length;
      lastStreakRef.current = currentStreak;
      lastLocationsRef.current = visitedLocations.length;
      lastCreaturesRef.current = collectedCreatures.length;
      lastPointsRef.current = totalPoints;

      // Mark already achieved milestones
      MILESTONES.locations.forEach(m => {
        if (visitedLocations.length >= m.count) achievedMilestonesRef.current.add(`locations-${m.count}`);
      });
      MILESTONES.creatures.forEach(m => {
        if (collectedCreatures.length >= m.count) achievedMilestonesRef.current.add(`creatures-${m.count}`);
      });
      MILESTONES.points.forEach(m => {
        if (totalPoints >= m.count) achievedMilestonesRef.current.add(`points-${m.count}`);
      });

      setIsHydrated(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Watch for new badges (only after hydration)
  useEffect(() => {
    if (!isHydrated || lastBadgeCountRef.current === null) return;

    if (badges.length > lastBadgeCountRef.current) {
      const newBadges = badges.slice(lastBadgeCountRef.current);
      newBadges.forEach(badgeId => {
        const notification: ToastNotification = {
          id: `badge-${badgeId}-${Date.now()}`,
          type: 'badge',
          badgeId: badgeId as BadgeId,
        };
        setNotifications(prev => [...prev, notification]);
      });
    }
    lastBadgeCountRef.current = badges.length;
  }, [badges, isHydrated]);

  // Watch for streak changes (only after hydration)
  useEffect(() => {
    if (!isHydrated || lastStreakRef.current === null) return;

    if (currentStreak > lastStreakRef.current && currentStreak > 1) {
      const notification: ToastNotification = {
        id: `streak-${Date.now()}`,
        type: 'streak',
        streak: currentStreak,
      };
      setNotifications(prev => [...prev, notification]);
    }
    lastStreakRef.current = currentStreak;
  }, [currentStreak, isHydrated]);

  // Watch for location milestones
  useEffect(() => {
    if (!isHydrated || lastLocationsRef.current === null) return;

    const currentCount = visitedLocations.length;
    if (currentCount > lastLocationsRef.current) {
      // Check if we've reached any new milestones
      MILESTONES.locations.forEach(milestone => {
        const key = `locations-${milestone.count}`;
        if (currentCount >= milestone.count && !achievedMilestonesRef.current.has(key)) {
          achievedMilestonesRef.current.add(key);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          setNotifications(prev => [...prev, {
            id: `milestone-locations-${milestone.count}-${Date.now()}`,
            type: 'milestone',
            milestone: { ...milestone, category: 'locations' },
          }]);
        }
      });
    }
    lastLocationsRef.current = currentCount;
  }, [visitedLocations.length, isHydrated]);

  // Watch for creature milestones
  useEffect(() => {
    if (!isHydrated || lastCreaturesRef.current === null) return;

    const currentCount = collectedCreatures.length;
    if (currentCount > lastCreaturesRef.current) {
      MILESTONES.creatures.forEach(milestone => {
        const key = `creatures-${milestone.count}`;
        if (currentCount >= milestone.count && !achievedMilestonesRef.current.has(key)) {
          achievedMilestonesRef.current.add(key);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          setNotifications(prev => [...prev, {
            id: `milestone-creatures-${milestone.count}-${Date.now()}`,
            type: 'milestone',
            milestone: { ...milestone, category: 'creatures' },
          }]);
        }
      });
    }
    lastCreaturesRef.current = currentCount;
  }, [collectedCreatures.length, isHydrated]);

  // Watch for points milestones
  useEffect(() => {
    if (!isHydrated || lastPointsRef.current === null) return;

    if (totalPoints > lastPointsRef.current) {
      MILESTONES.points.forEach(milestone => {
        const key = `points-${milestone.count}`;
        if (totalPoints >= milestone.count && !achievedMilestonesRef.current.has(key)) {
          achievedMilestonesRef.current.add(key);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          setNotifications(prev => [...prev, {
            id: `milestone-points-${milestone.count}-${Date.now()}`,
            type: 'milestone',
            milestone: { ...milestone, category: 'points' },
          }]);
        }
      });
    }
    lastPointsRef.current = totalPoints;
  }, [totalPoints, isHydrated]);

  // Auto-remove notifications after 4 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Get gradient colors based on milestone category
  const getMilestoneGradient = (category: 'locations' | 'creatures' | 'points') => {
    switch (category) {
      case 'locations':
        return 'from-teal-400 via-cyan-400 to-blue-500';
      case 'creatures':
        return 'from-green-400 via-emerald-400 to-teal-500';
      case 'points':
        return 'from-amber-400 via-yellow-400 to-orange-500';
    }
  };

  return (
    <>
      {/* Confetti celebration */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[60]">
          <Confetti active={true} pieceCount={60} useEmojis={true} />
        </div>
      )}

      <div className="fixed top-20 right-4 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative"
            >
              {notification.type === 'badge' && notification.badgeId && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white rounded-2xl shadow-xl min-w-[300px] border-2 border-white/30">
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: 2 }}
                  />
                  <motion.div
                    initial={{ rotate: -30, scale: 0 }}
                    animate={{ rotate: [0, -10, 10, 0], scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2, duration: 0.6, repeat: 2 }}
                    className="text-5xl relative z-10 drop-shadow-lg"
                  >
                    {BADGES[notification.badgeId].emoji}
                  </motion.div>
                  <div className="flex-1 relative z-10">
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-bold opacity-90 uppercase tracking-wide"
                    >
                      🎉 Badge Earned!
                    </motion.p>
                    <p className="font-bold text-lg">{BADGES[notification.badgeId].name}</p>
                    <p className="text-xs opacity-90">{BADGES[notification.badgeId].description}</p>
                  </div>
                  <motion.button
                    onClick={() => removeNotification(notification.id)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-sm shadow-md z-10"
                  >
                    ✕
                  </motion.button>
                </div>
              )}

              {notification.type === 'streak' && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl shadow-xl min-w-[300px] border-2 border-white/30">
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: 2 }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1], rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl relative z-10 drop-shadow-lg"
                  >
                    🔥
                  </motion.div>
                  <div className="flex-1 relative z-10">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs font-bold opacity-90 uppercase tracking-wide"
                    >
                      ⚡ Streak Bonus!
                    </motion.p>
                    <p className="font-bold text-lg">{notification.streak} Day Streak!</p>
                    <p className="text-xs opacity-90">+{(notification.streak || 0) * 5} bonus points</p>
                  </div>
                  <motion.button
                    onClick={() => removeNotification(notification.id)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-sm shadow-md z-10"
                  >
                    ✕
                  </motion.button>
                </div>
              )}

              {notification.type === 'milestone' && notification.milestone && (
                <div className={`flex items-center gap-3 p-4 bg-gradient-to-r ${getMilestoneGradient(notification.milestone.category)} text-white rounded-2xl shadow-xl min-w-[300px] border-2 border-white/30 overflow-hidden`}>
                  {/* Animated background particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        initial={{ x: -10, y: Math.random() * 100 }}
                        animate={{
                          x: [0, 300],
                          y: [Math.random() * 100, Math.random() * 100],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: 2 }}
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: [0, 1.4, 1], rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-5xl relative z-10 drop-shadow-lg"
                  >
                    {notification.milestone.emoji}
                  </motion.div>
                  <div className="flex-1 relative z-10">
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs font-bold opacity-90 uppercase tracking-wide"
                    >
                      🎯 Milestone Reached!
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="font-bold text-lg"
                    >
                      {notification.milestone.title}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs opacity-90"
                    >
                      {notification.milestone.message}
                    </motion.p>
                  </div>
                  <motion.button
                    onClick={() => removeNotification(notification.id)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white text-sm shadow-md z-10"
                  >
                    ✕
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
