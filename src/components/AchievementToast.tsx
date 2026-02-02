'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BADGES, BadgeId, useAppStore } from '@/store/useAppStore';

interface ToastNotification {
  id: string;
  type: 'badge' | 'points' | 'streak';
  badgeId?: BadgeId;
  points?: number;
  streak?: number;
}

export function AchievementToast() {
  const { badges, currentStreak } = useAppStore();
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const lastBadgeCountRef = useRef<number | null>(null);
  const lastStreakRef = useRef<number | null>(null);

  // Wait for hydration before starting to track
  // Use a longer delay to ensure zustand has fully hydrated from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      lastBadgeCountRef.current = badges.length;
      lastStreakRef.current = currentStreak;
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

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="relative"
          >
            {notification.type === 'badge' && notification.badgeId && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl shadow-lg min-w-[280px]">
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="text-4xl"
                >
                  {BADGES[notification.badgeId].emoji}
                </motion.div>
                <div className="flex-1">
                  <p className="text-xs opacity-90">Badge Earned!</p>
                  <p className="font-bold">{BADGES[notification.badgeId].name}</p>
                  <p className="text-xs opacity-90">{BADGES[notification.badgeId].description}</p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-sm"
                >
                  ✕
                </button>
              </div>
            )}

            {notification.type === 'streak' && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg min-w-[280px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl"
                >
                  🔥
                </motion.div>
                <div className="flex-1">
                  <p className="text-xs opacity-90">Streak Bonus!</p>
                  <p className="font-bold">{notification.streak} Day Streak!</p>
                  <p className="text-xs opacity-90">+{(notification.streak || 0) * 5} bonus points</p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-sm"
                >
                  ✕
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
