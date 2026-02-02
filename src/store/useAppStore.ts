import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Location, AgeLevel } from '@/types';

/**
 * Badge definitions
 */
export const BADGES = {
  'first-steps': {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Visit your first location',
    emoji: '👣',
    requirement: { type: 'visits', count: 1 },
  },
  'tide-pool-explorer': {
    id: 'tide-pool-explorer',
    name: 'Tide Pool Explorer',
    description: 'Visit all tide pool locations',
    emoji: '🦀',
    requirement: { type: 'category', category: 'Tide Pool' },
  },
  'wetland-wanderer': {
    id: 'wetland-wanderer',
    name: 'Wetland Wanderer',
    description: 'Visit all wetland locations',
    emoji: '🦆',
    requirement: { type: 'category', category: 'Wetland' },
  },
  'forest-friend': {
    id: 'forest-friend',
    name: 'Forest Friend',
    description: 'Visit all forest locations',
    emoji: '🌲',
    requirement: { type: 'category', category: 'Forest' },
  },
  'beach-buddy': {
    id: 'beach-buddy',
    name: 'Beach Buddy',
    description: 'Visit all beach locations',
    emoji: '🏖️',
    requirement: { type: 'category', category: 'Beach' },
  },
  'nature-detective': {
    id: 'nature-detective',
    name: 'Nature Detective',
    description: 'Collect 20 creatures',
    emoji: '🔍',
    requirement: { type: 'creatures', count: 20 },
  },
  'quiz-whiz': {
    id: 'quiz-whiz',
    name: 'Quiz Whiz',
    description: 'Get 100% on 5 quizzes',
    emoji: '🧠',
    requirement: { type: 'perfect_quizzes', count: 5 },
  },
  'sorting-star': {
    id: 'sorting-star',
    name: 'Sorting Star',
    description: 'Complete all sorting activities',
    emoji: '⭐',
    requirement: { type: 'activity_type', activityType: 'sorting' },
  },
  'bay-area-expert': {
    id: 'bay-area-expert',
    name: 'Bay Area Expert',
    description: 'Visit all 20 locations',
    emoji: '🏆',
    requirement: { type: 'visits', count: 20 },
  },
  'creature-collector': {
    id: 'creature-collector',
    name: 'Creature Collector',
    description: 'Collect all creatures',
    emoji: '🎯',
    requirement: { type: 'all_creatures' },
  },
} as const;

export type BadgeId = keyof typeof BADGES;

/**
 * Points values for different actions
 */
export const POINTS = {
  VISIT_LOCATION: 10,
  COLLECT_CREATURE: 5,
  COMPLETE_ACTIVITY: 20,
  PERFECT_ACTIVITY_BONUS: 10,
  DAILY_STREAK: 5,
} as const;

interface AppState {
  // Age level
  ageLevel: AgeLevel | null;
  setAgeLevel: (level: AgeLevel) => void;
  hasSeenAgeSelector: boolean;
  setHasSeenAgeSelector: (seen: boolean) => void;

  // Location selection (not persisted)
  selectedLocation: Location | null;
  selectLocation: (location: Location | null) => void;

  // Collections
  collectedCreatures: string[];
  collectCreature: (creatureId: string) => void;

  visitedLocations: string[];
  markVisited: (locationId: string) => void;

  // Activities
  completedActivities: string[];
  completeActivity: (activityId: string) => void;

  // Track perfect scores separately for badge calculation
  perfectActivities: string[];
  markPerfect: (activityId: string) => void;

  // Gamification
  totalPoints: number;
  addPoints: (points: number) => void;

  badges: BadgeId[];
  earnBadge: (badge: BadgeId) => void;

  // Streak tracking
  lastVisitDate: string | null;
  currentStreak: number;
  recordVisit: () => void;

  // Sound settings
  soundEnabled: boolean;
  toggleSound: () => void;

  // Reset for testing
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Age level
      ageLevel: null,
      setAgeLevel: (level) => set({ ageLevel: level }),
      hasSeenAgeSelector: false,
      setHasSeenAgeSelector: (seen) => set({ hasSeenAgeSelector: seen }),

      // Location selection (not persisted - resets on refresh)
      selectedLocation: null,
      selectLocation: (location) => set({ selectedLocation: location }),

      // Collections
      collectedCreatures: [],
      collectCreature: (creatureId) =>
        set((state) => {
          if (state.collectedCreatures.includes(creatureId)) {
            return state;
          }
          return {
            collectedCreatures: [...state.collectedCreatures, creatureId],
            totalPoints: state.totalPoints + POINTS.COLLECT_CREATURE,
          };
        }),

      visitedLocations: [],
      markVisited: (locationId) =>
        set((state) => {
          if (state.visitedLocations.includes(locationId)) {
            return state;
          }
          const newVisited = [...state.visitedLocations, locationId];
          let newBadges = [...state.badges];

          // Check for first-steps badge
          if (newVisited.length === 1 && !state.badges.includes('first-steps')) {
            newBadges.push('first-steps');
          }

          return {
            visitedLocations: newVisited,
            totalPoints: state.totalPoints + POINTS.VISIT_LOCATION,
            badges: newBadges,
          };
        }),

      // Activities
      completedActivities: [],
      completeActivity: (activityId) =>
        set((state) => {
          if (state.completedActivities.includes(activityId)) {
            return state;
          }
          return {
            completedActivities: [...state.completedActivities, activityId],
          };
        }),

      perfectActivities: [],
      markPerfect: (activityId) =>
        set((state) => {
          if (state.perfectActivities.includes(activityId)) {
            return state;
          }
          const newPerfect = [...state.perfectActivities, activityId];
          let newBadges = [...state.badges];

          // Check for quiz-whiz badge (5 perfect quizzes)
          const perfectQuizzes = newPerfect.filter(id => id.includes('-quiz')).length;
          if (perfectQuizzes >= 5 && !state.badges.includes('quiz-whiz')) {
            newBadges.push('quiz-whiz');
          }

          return {
            perfectActivities: newPerfect,
            badges: newBadges,
          };
        }),

      // Gamification
      totalPoints: 0,
      addPoints: (points) =>
        set((state) => ({
          totalPoints: state.totalPoints + points,
        })),

      badges: [],
      earnBadge: (badge) =>
        set((state) => {
          if (state.badges.includes(badge)) {
            return state;
          }
          return {
            badges: [...state.badges, badge],
          };
        }),

      // Streak tracking
      lastVisitDate: null,
      currentStreak: 0,
      recordVisit: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          if (state.lastVisitDate === today) {
            return state; // Already recorded today
          }

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          let newStreak = 1;
          let bonusPoints = 0;

          if (state.lastVisitDate === yesterdayStr) {
            // Continuing streak
            newStreak = state.currentStreak + 1;
            bonusPoints = POINTS.DAILY_STREAK * newStreak;
          }

          return {
            lastVisitDate: today,
            currentStreak: newStreak,
            totalPoints: state.totalPoints + bonusPoints,
          };
        }),

      // Sound settings
      soundEnabled: true,
      toggleSound: () =>
        set((state) => ({
          soundEnabled: !state.soundEnabled,
        })),

      // Reset for testing
      resetProgress: () =>
        set({
          ageLevel: null,
          hasSeenAgeSelector: false,
          selectedLocation: null,
          collectedCreatures: [],
          visitedLocations: [],
          completedActivities: [],
          perfectActivities: [],
          totalPoints: 0,
          badges: [],
          lastVisitDate: null,
          currentStreak: 0,
          soundEnabled: true,
        }),
    }),
    {
      name: 'tidepool-kids-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields (selectedLocation is intentionally excluded)
        ageLevel: state.ageLevel,
        hasSeenAgeSelector: state.hasSeenAgeSelector,
        collectedCreatures: state.collectedCreatures,
        visitedLocations: state.visitedLocations,
        completedActivities: state.completedActivities,
        perfectActivities: state.perfectActivities,
        totalPoints: state.totalPoints,
        badges: state.badges,
        lastVisitDate: state.lastVisitDate,
        currentStreak: state.currentStreak,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
