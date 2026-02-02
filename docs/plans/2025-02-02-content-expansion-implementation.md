# Tide Pool Kids Content Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the minimal MVP into a comprehensive, standards-aligned Bay Area environmental education platform with age-adaptive content, 20 locations, 6 interactive activity types, full gamification, and Coral the mascot dialogue system.

**Architecture:** Age-gated content system using Zustand for state management, localStorage for persistence, and age-conditional rendering throughout all components. Content stored in typed data files with AgeContent objects for each text field. Activity components are modular and receive typed data props.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Mapbox GL JS, Zustand

**California Standards Alignment:**
- Environmental Principles and Concepts (EP&Cs) per Education Code Section 51227.3
- Public Resources Code Section 71301 (14 environmental topics: air quality, climate change, energy, environmental justice, sustainability, wildlife, forestry, pest management, oceans, pollution prevention, public health, resource conservation, toxics, water)
- K-ESS3-3, 5-ESS3-1, MS-ESS3-3 performance expectations
- California Next Generation Science Standards alignment
- History-Social Science Standards (4.1, 4.3, 6.1) connections

---

## Phase 1: Age System Foundation

### Task 1.1: Update Core Types with AgeLevel Support

**Files:**
- Modify: `src/types/index.ts`

**Step 1: Read current types file**

Read `src/types/index.ts` to understand existing structure.

**Step 2: Add AgeLevel type and AgeContent interface at the top of the file**

Add these new types before existing interfaces:

```typescript
/**
 * Age level for content adaptation
 * - k2: Kindergarten through 2nd grade (ages 5-8)
 * - grades35: 3rd through 5th grade (ages 8-11)
 * - grades68: 6th through 8th grade (ages 11-14)
 */
export type AgeLevel = 'k2' | 'grades35' | 'grades68';

/**
 * Content that varies by age level
 */
export interface AgeContent {
  k2: string;
  grades35: string;
  grades68: string;
}
```

**Step 3: Update Creature interface to use AgeContent**

Replace the existing Creature interface:

```typescript
export interface Creature {
  id: string;
  name: string;
  emoji: string;
  fact: AgeContent;
  habitat?: string;
  diet?: AgeContent;
  coolFeature?: AgeContent;
}
```

**Step 4: Update Step interface to use AgeContent**

Replace:

```typescript
export interface Step {
  step: number;
  title: string;
  description: AgeContent;
  icon?: string;
}
```

**Step 5: Update Activity interface with expanded types**

Replace:

```typescript
export interface Activity {
  type: 'spotter' | 'matching' | 'sorting' | 'quiz' | 'sequencer' | 'data';
  title: string;
  instructions: AgeContent;
  data: unknown;
  points: number;
  badge?: string;
}
```

**Step 6: Update LocationContent interface with full age-adaptive fields**

Replace:

```typescript
export interface LocationContent {
  title: string;
  tagline: AgeContent;
  description: AgeContent;
  whyItMatters: AgeContent;
  funFacts: AgeContent[];
  creatures?: Creature[];
  howItWorks?: Step[];
  activity?: Activity;
  coralIntro: AgeContent;
  takeAction: AgeContent;
  // California EP&C alignment
  principles: {
    primary: 'I' | 'II' | 'III' | 'IV' | 'V';
    secondary?: ('I' | 'II' | 'III' | 'IV' | 'V')[];
    concepts: string[]; // e.g., ['I-A', 'I-B', 'II-C']
  };
  standards: {
    k2?: string;   // e.g., 'K-ESS3-3'
    grades35?: string; // e.g., '5-ESS3-1'
    grades68?: string; // e.g., 'MS-ESS3-3'
  };
}
```

**Step 7: Verify TypeScript compiles (expect errors in locations.ts)**

Run: `cd /Users/steven/Github/tidepool-kids && npx tsc --noEmit 2>&1 | head -20`

Expected: Type errors in locations.ts (expected - we'll fix in Task 1.7)

**Step 8: Commit the type changes**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/types/index.ts
git commit -m "feat(types): add AgeLevel system and update content interfaces

- Add AgeLevel type ('k2' | 'grades35' | 'grades68')
- Add AgeContent interface for age-adaptive text
- Update Creature, Step, Activity, LocationContent interfaces
- Add California EP&C standards alignment fields (principles, concepts, standards)
- Expand Activity types to include 'sequencer' and 'data'

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 1.2: Create Age Content Utility Functions

**Files:**
- Create: `src/utils/ageContent.ts`

**Step 1: Create the utilities directory if needed and the file**

Create `src/utils/ageContent.ts`:

```typescript
import { AgeContent, AgeLevel } from '@/types';

/**
 * Get age-appropriate content from an AgeContent object
 * @param content - The AgeContent object with k2, grades35, grades68 fields
 * @param ageLevel - The current user's age level (null defaults to grades35)
 * @returns The appropriate string content for the age level
 */
export function getAgeContent(content: AgeContent, ageLevel: AgeLevel | null): string {
  if (!ageLevel) return content.grades35; // Default to middle grade
  return content[ageLevel];
}

/**
 * Get age-appropriate content with fallback for legacy string content
 * This is useful during the migration period when some content may not
 * have been converted to AgeContent format yet.
 *
 * @param content - Either an AgeContent object or a plain string
 * @param ageLevel - The current user's age level
 * @returns The appropriate string content
 */
export function getContent(
  content: AgeContent | string | undefined,
  ageLevel: AgeLevel | null
): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  return getAgeContent(content, ageLevel);
}

/**
 * Check if content is AgeContent (has all three age level keys)
 */
export function isAgeContent(content: unknown): content is AgeContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'k2' in content &&
    'grades35' in content &&
    'grades68' in content
  );
}

/**
 * UI configuration for each age level
 * Used for styling, labels, and personality variations
 */
export const ageLevelConfig = {
  k2: {
    label: 'K-2',
    icon: '⭐',
    title: 'Explorer',
    description: 'Kindergarten through 2nd grade',
    fontSize: 'text-lg',      // Larger text for young readers
    paragraphLength: 'short', // 1-2 sentences max
    vocabulary: 'simple',     // No words over 3 syllables
    coralVoice: 'excited',    // Uses exclamations, "Wow!", "Look!"
    coralAppearance: 'frequent', // Shows often with bounce animations
  },
  grades35: {
    label: '3-5',
    icon: '🔍',
    title: 'Investigator',
    description: '3rd through 5th grade',
    fontSize: 'text-base',    // Standard text
    paragraphLength: 'medium', // 3-4 sentences
    vocabulary: 'growing',    // Some science terms with context
    coralVoice: 'curious',    // Uses "Did you know...", "I wonder..."
    coralAppearance: 'moderate', // Shows at key moments
  },
  grades68: {
    label: '6-8',
    icon: '🔬',
    title: 'Scientist',
    description: '6th through 8th grade',
    fontSize: 'text-sm',      // Smaller, denser text
    paragraphLength: 'full',  // Full paragraphs
    vocabulary: 'scientific', // Full terminology
    coralVoice: 'informative', // Uses "Scientists discovered...", "Research shows..."
    coralAppearance: 'sparse',  // Appears less, more substantial when present
  },
} as const;

/**
 * Get the config for an age level
 */
export function getAgeLevelConfig(ageLevel: AgeLevel | null) {
  if (!ageLevel) return ageLevelConfig.grades35;
  return ageLevelConfig[ageLevel];
}
```

**Step 2: Verify file compiles**

Run: `cd /Users/steven/Github/tidepool-kids && npx tsc --noEmit src/utils/ageContent.ts 2>&1`

Expected: No errors (or "Cannot use JSX" which is fine for this non-JSX file)

**Step 3: Commit**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/utils/ageContent.ts
git commit -m "feat(utils): add age content helper utilities

- getAgeContent() retrieves content for specific age level
- getContent() with fallback for migration period (handles string | AgeContent)
- isAgeContent() type guard for runtime checking
- ageLevelConfig object with UI styling and Coral personality settings
- getAgeLevelConfig() helper for accessing config

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 1.3: Update Zustand Store with Age State and Gamification

**Files:**
- Modify: `src/store/useAppStore.ts`

**Step 1: Read current store**

Read `src/store/useAppStore.ts` to understand current structure.

**Step 2: Replace with expanded store implementation**

Replace the entire file with:

```typescript
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
      }),
    }
  )
);
```

**Step 3: Verify build succeeds (may have errors in locations.ts still)**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build 2>&1 | head -30`

Expected: May have errors in locations.ts (expected) but store should compile

**Step 4: Commit**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/store/useAppStore.ts
git commit -m "feat(store): add comprehensive age level state and gamification system

- Add ageLevel with localStorage persistence via zustand/persist
- Add hasSeenAgeSelector for modal control flow
- Add completedActivities and perfectActivities tracking
- Add totalPoints and badges for gamification
- Add BADGES constant with 10 badge definitions and requirements
- Add POINTS constant for standardized point values
- Add streak tracking with lastVisitDate and currentStreak
- Add recordVisit() for daily streak bonuses
- Add resetProgress() for testing/demo purposes
- Auto-award 'first-steps' badge on first location visit
- Auto-award 'quiz-whiz' badge on 5 perfect quizzes
- Use createJSONStorage for proper localStorage serialization

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 1.4: Create AgeSelectorModal Component

**Files:**
- Create: `src/components/AgeSelectorModal.tsx`

**Step 1: Create the modal component**

Create `src/components/AgeSelectorModal.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AgeLevel } from '@/types';
import { ageLevelConfig } from '@/utils/ageContent';

const ageLevels: AgeLevel[] = ['k2', 'grades35', 'grades68'];

export function AgeSelectorModal() {
  const { ageLevel, setAgeLevel, hasSeenAgeSelector, setHasSeenAgeSelector, recordVisit } = useAppStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR or before hydration
  if (!mounted) return null;

  const isOpen = !hasSeenAgeSelector && !ageLevel;

  const handleSelect = (level: AgeLevel) => {
    setAgeLevel(level);
    setHasSeenAgeSelector(true);
    recordVisit(); // Start tracking daily visits
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-selector-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
          >
            {/* Mascot and greeting */}
            <div className="text-center mb-6">
              <motion.img
                src="/assets/images/crab-mascot.png"
                alt="Coral the Crab"
                width={80}
                height={80}
                className="mx-auto mb-4"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              <h2
                id="age-selector-title"
                className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-2"
              >
                Hi there, explorer!
              </h2>
              <p className="text-gray-600">
                What grade are you in? I&apos;ll show you the best stuff for your level!
              </p>
            </div>

            {/* Age level buttons */}
            <div className="space-y-3">
              {ageLevels.map((level) => {
                const config = ageLevelConfig[level];
                return (
                  <motion.button
                    key={level}
                    onClick={() => handleSelect(level)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 hover:border-[var(--color-aqua)] hover:bg-[var(--color-aqua)]/5 transition-colors flex items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)] focus-visible:ring-offset-2"
                  >
                    <span
                      className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl"
                      aria-hidden="true"
                    >
                      {config.icon}
                    </span>
                    <div className="flex-1">
                      <div className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)]">
                        {config.label} <span className="font-normal text-gray-500">({config.title})</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {config.description}
                      </div>
                    </div>
                    <motion.span
                      className="text-gray-300"
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>

            {/* Parent note */}
            <p className="mt-6 text-xs text-center text-gray-400">
              Parents: You can change this anytime using the level selector in the header.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Verify file compiles**

Run: `cd /Users/steven/Github/tidepool-kids && npx tsc --noEmit src/components/AgeSelectorModal.tsx 2>&1`

Expected: No errors

**Step 3: Commit**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/components/AgeSelectorModal.tsx
git commit -m "feat(components): add AgeSelectorModal for first-visit age selection

- Shows on first visit when no age level is set (controlled by hasSeenAgeSelector)
- Three options: K-2 Explorer, 3-5 Investigator, 6-8 Scientist
- Animated Coral mascot greeting with bouncing animation
- Accessible: proper ARIA attributes, focus management
- Hydration-safe: uses mounted state to prevent SSR mismatch
- Records first visit for streak tracking
- Parent note about ability to change later

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 1.5: Create AgeLevelToggle Component for Header

**Files:**
- Create: `src/components/AgeLevelToggle.tsx`

**Step 1: Create the toggle component**

Create `src/components/AgeLevelToggle.tsx`:

```typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AgeLevel } from '@/types';
import { ageLevelConfig } from '@/utils/ageContent';

const ageLevels: AgeLevel[] = ['k2', 'grades35', 'grades68'];

export function AgeLevelToggle() {
  const { ageLevel, setAgeLevel } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Don't render during SSR or before hydration
  if (!mounted) return null;

  // Don't render if no age level set (modal should be showing)
  if (!ageLevel) return null;

  const currentConfig = ageLevelConfig[ageLevel];

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-sand)] rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-sand)]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)] focus-visible:ring-offset-2"
        aria-label={`Current level: ${currentConfig.label} ${currentConfig.title}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span aria-hidden="true">{currentConfig.icon}</span>
        <span>{currentConfig.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          ▾
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[180px]"
            role="listbox"
            aria-label="Select age level"
          >
            {ageLevels.map((level) => {
              const config = ageLevelConfig[level];
              const isActive = level === ageLevel;
              return (
                <button
                  key={level}
                  onClick={() => {
                    setAgeLevel(level);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={isActive}
                  className={`w-full flex items-center gap-2 px-4 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:bg-gray-100 ${
                    isActive
                      ? 'bg-[var(--color-aqua)] text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span aria-hidden="true">{config.icon}</span>
                  <span className="font-medium">{config.label}</span>
                  <span className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                    ({config.title})
                  </span>
                  {isActive && (
                    <span className="ml-auto" aria-hidden="true">✓</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Step 2: Verify file compiles**

Run: `cd /Users/steven/Github/tidepool-kids && npx tsc --noEmit src/components/AgeLevelToggle.tsx 2>&1`

Expected: No errors

**Step 3: Commit**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/components/AgeLevelToggle.tsx
git commit -m "feat(components): add AgeLevelToggle dropdown for header

- Compact pill showing current age level with icon
- Animated dropdown with level options
- Proper ARIA attributes for accessibility (listbox pattern)
- Click outside to close
- Escape key to close
- Hydration-safe: uses mounted state
- Checkmark indicator for current selection
- Only renders when ageLevel is set

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 1.6: Update Header and Layout with Age Components

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Read current Header.tsx**

Read `src/components/Header.tsx` to understand current structure.

**Step 2: Update Header to include AgeLevelToggle and points**

Replace the entire Header.tsx:

```typescript
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AgeLevelToggle } from './AgeLevelToggle';

export function Header() {
  const { visitedLocations, collectedCreatures, totalPoints, currentStreak, recordVisit } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [prevPoints, setPrevPoints] = useState(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    recordVisit(); // Record daily visit for streak
  }, [recordVisit]);

  // Animate points when they change
  useEffect(() => {
    if (mounted && totalPoints > prevPoints && prevPoints > 0) {
      setShowPointsAnimation(true);
      const timer = setTimeout(() => setShowPointsAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevPoints(totalPoints);
  }, [totalPoints, prevPoints, mounted]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
        {/* Logo and title */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/assets/images/crab-mascot.png"
            alt="Coral the Crab"
            width={40}
            height={40}
            priority
          />
          <span className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[var(--color-navy)]">
            Tide Pool Kids
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Stats and controls */}
        <div className="flex items-center gap-3">
          {/* Age level toggle */}
          <AgeLevelToggle />

          {/* Points with animation */}
          <div className="relative">
            <motion.div
              className="flex items-center gap-1 px-3 py-1 bg-[var(--color-sand)] rounded-full"
              whileHover={{ scale: 1.05 }}
              aria-label={`${mounted ? totalPoints : 0} points`}
            >
              <span aria-hidden="true">⭐</span>
              <span className="text-sm font-medium tabular-nums">
                {mounted ? totalPoints : 0}
              </span>
            </motion.div>

            {/* Points added animation */}
            <AnimatePresence>
              {showPointsAnimation && (
                <motion.span
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -20 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-green-500"
                >
                  +{totalPoints - prevPoints}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Streak indicator (only show if streak > 1) */}
          {mounted && currentStreak > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full"
              whileHover={{ scale: 1.05 }}
              aria-label={`${currentStreak} day streak`}
            >
              <span aria-hidden="true">🔥</span>
              <span className="text-sm font-medium">{currentStreak}</span>
            </motion.div>
          )}

          {/* Places visited */}
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-[var(--color-sand)] rounded-full"
            whileHover={{ scale: 1.05 }}
            aria-label={`${mounted ? visitedLocations.length : 0} places visited`}
          >
            <span aria-hidden="true">📍</span>
            <span className="text-sm font-medium tabular-nums">
              {mounted ? visitedLocations.length : 0}
            </span>
          </motion.div>

          {/* Creatures collected */}
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-[var(--color-sand)] rounded-full"
            whileHover={{ scale: 1.05 }}
            aria-label={`${mounted ? collectedCreatures.length : 0} creatures collected`}
          >
            <span aria-hidden="true">🦀</span>
            <span className="text-sm font-medium tabular-nums">
              {mounted ? collectedCreatures.length : 0}
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
```

**Step 3: Read current layout.tsx**

Read `src/app/layout.tsx` to understand current structure.

**Step 4: Update layout.tsx to include AgeSelectorModal**

Add the import at the top of layout.tsx:

```typescript
import { AgeSelectorModal } from '@/components/AgeSelectorModal';
```

Add the component inside the body tag, after `{children}`:

```typescript
<AgeSelectorModal />
```

**Step 5: Verify build succeeds**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build 2>&1 | head -50`

Expected: May still have errors in locations.ts (expected)

**Step 6: Commit**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/components/Header.tsx src/app/layout.tsx
git commit -m "feat(layout): integrate age system components into UI

Header updates:
- Add AgeLevelToggle dropdown
- Add points display with +points animation when earning points
- Add streak indicator (shows when streak > 1 day)
- Add tabular-nums for consistent number widths
- Hydration-safe with mounted state
- Call recordVisit() on mount for streak tracking

Layout updates:
- Add AgeSelectorModal for first-visit age selection flow

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 1.7: Convert Existing Locations to Age-Adaptive Content

**Files:**
- Modify: `src/data/locations.ts`

This is a significant task. We need to convert all 6 existing locations to use the new AgeContent format for every text field.

**Step 1: Read current locations.ts**

Read `src/data/locations.ts` to see current structure.

**Step 2: Replace with fully age-adaptive locations**

Replace the entire file with the full age-adaptive content. This is a large file - here's the complete conversion:

```typescript
import { Location } from '@/types';

export const locations: Location[] = [
  // ===========================
  // NATURE HABITATS
  // ===========================
  {
    id: 'fitzgerald-tide-pools',
    name: 'Fitzgerald Marine Reserve',
    type: 'habitat',
    category: 'Tide Pool',
    icon: '🦀',
    color: '#26c6da',
    coordinates: [-122.5167, 37.5236],
    content: {
      title: 'Fitzgerald Marine Reserve',
      tagline: {
        k2: 'A rocky pool full of ocean friends!',
        grades35: 'Where the ocean meets the rocks!',
        grades68: 'A protected intertidal ecosystem on the San Mateo coast.',
      },
      description: {
        k2: 'Tide pools are little ponds by the ocean. When waves go back, animals stay in the pools!',
        grades35: 'Tide pools form when ocean water gets trapped between rocks at low tide. These natural aquariums are home to creatures specially adapted to survive both underwater and in open air.',
        grades68: 'Intertidal zones experience dramatic environmental fluctuations including temperature, salinity, and oxygen levels. Organisms in tide pools have evolved remarkable adaptations to survive these challenging conditions, making them valuable indicators of coastal ecosystem health.',
      },
      whyItMatters: {
        k2: 'These animals need clean water to live. We can help by not littering!',
        grades35: 'Tide pools support hundreds of species and help scientists monitor ocean health. Pollution and trampling can damage these fragile habitats.',
        grades68: 'Tide pool ecosystems provide crucial ecosystem services including coastal buffering and serving as nursery habitat for commercially important species. Climate change, ocean acidification, and human disturbance threaten these sensitive environments.',
      },
      funFacts: [
        {
          k2: 'Sea stars can grow back their arms!',
          grades35: 'Sea stars can regenerate lost arms, and some species can even grow a whole new body from just one arm!',
          grades68: 'Sea star regeneration involves complex cellular dedifferentiation, where specialized cells become stem-like and can form any tissue type needed.',
        },
        {
          k2: 'Hermit crabs switch shells when they grow!',
          grades35: 'Hermit crabs line up by size to trade shells - when one finds a bigger shell, they all move into new homes!',
          grades68: 'Hermit crabs exhibit "vacancy chains" - sequential shell exchanges where multiple crabs upgrade simultaneously.',
        },
      ],
      creatures: [
        {
          id: 'hermit-crab',
          name: 'Hermit Crab',
          emoji: '🦀',
          fact: {
            k2: 'They wear shells like backpacks! When they grow bigger, they find a new shell.',
            grades35: 'Hermit crabs borrow empty shells from other animals. As they grow, they must find larger shells to move into.',
            grades68: 'Hermit crabs exhibit sequential shell exchange behavior, often forming "vacancy chains" where multiple crabs swap shells in size order.',
          },
        },
        {
          id: 'sea-star',
          name: 'Sea Star',
          emoji: '⭐',
          fact: {
            k2: 'Sea stars have eyes at the tip of each arm!',
            grades35: 'Each arm of a sea star has a tiny eye that can detect light and movement.',
            grades68: 'Sea star eyespots contain photoreceptors that form low-resolution images, sufficient for navigation and predator detection.',
          },
        },
        {
          id: 'sea-anemone',
          name: 'Sea Anemone',
          emoji: '🌸',
          fact: {
            k2: 'They look like flowers but are animals that eat fish!',
            grades35: 'Sea anemones use stinging tentacles to catch small fish and shrimp that swim too close.',
            grades68: 'Anemones possess specialized cells called cnidocytes that fire harpoon-like structures containing neurotoxins.',
          },
        },
      ],
      coralIntro: {
        k2: 'Wow! Look at all the little pools! Let\'s see what animals are hiding!',
        grades35: 'Welcome to the tide pools! These rocky pools are like natural aquariums. Ready to explore?',
        grades68: 'This intertidal zone is one of the most dynamic ecosystems on Earth. Let\'s examine its biodiversity.',
      },
      takeAction: {
        k2: 'Look but don\'t touch! Put rocks back where you found them.',
        grades35: 'Stay on designated paths, never remove creatures, and pick up any litter you see.',
        grades68: 'Practice Leave No Trace principles, report pollution to park rangers, and consider volunteering for coastal cleanup events.',
      },
      principles: {
        primary: 'I',
        secondary: ['II', 'IV'],
        concepts: ['I-A', 'I-B', 'I-C', 'II-A', 'IV-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'don-edwards-wetlands',
    name: 'Don Edwards Wetlands',
    type: 'habitat',
    category: 'Wetland',
    icon: '🦆',
    color: '#7cb342',
    coordinates: [-122.0628, 37.4983],
    content: {
      title: 'Don Edwards Wildlife Refuge',
      tagline: {
        k2: 'A rest stop for traveling birds!',
        grades35: 'Where millions of birds stop to refuel!',
        grades68: 'A critical stopover on the Pacific Flyway migration corridor.',
      },
      description: {
        k2: 'Wetlands are soggy places where birds find yummy food. It\'s like a bird restaurant!',
        grades35: 'Wetlands are areas where water covers the soil. They\'re like giant sponges that clean water and provide homes for birds and fish.',
        grades68: 'Wetlands function as biofilters, removing pollutants and excess nutrients from water while providing habitat for over 280 bird species in the San Francisco Bay ecosystem.',
      },
      whyItMatters: {
        k2: 'Birds need clean marshes to eat and rest. No littering!',
        grades35: 'Wetlands filter pollution, prevent floods, and give millions of migrating birds a place to rest and eat.',
        grades68: 'Coastal wetlands sequester carbon at rates 3-5x higher than terrestrial forests, making them critical for climate mitigation while supporting biodiversity.',
      },
      funFacts: [
        {
          k2: 'Some birds fly super far to visit here!',
          grades35: 'Some birds fly over 10,000 miles to visit Bay Area wetlands every year!',
          grades68: 'The Pacific Flyway migration corridor supports 1 billion birds annually, with San Francisco Bay providing essential habitat.',
        },
        {
          k2: 'Egrets stand really still to catch fish!',
          grades35: 'Great egrets can stand motionless for minutes, then strike at fish faster than you can blink!',
          grades68: 'Egret hunting success rates increase 300% when using the "stand and wait" strategy versus active foraging.',
        },
      ],
      creatures: [
        {
          id: 'great-egret',
          name: 'Great Egret',
          emoji: '🦢',
          fact: {
            k2: 'They stand perfectly still to catch fish, then strike like lightning!',
            grades35: 'Great egrets can stand motionless for several minutes waiting for the perfect moment to catch a fish.',
            grades68: 'Egrets possess a specialized neck vertebra structure that enables rapid strike acceleration exceeding 1,500°/second.',
          },
        },
        {
          id: 'harbor-seal',
          name: 'Harbor Seal',
          emoji: '🦭',
          fact: {
            k2: 'They can hold their breath for up to 30 minutes!',
            grades35: 'Harbor seals can dive deep and hold their breath for 30 minutes while hunting fish.',
            grades68: 'Harbor seals exhibit bradycardia during dives, slowing heart rate from 120 to 4 beats per minute to conserve oxygen.',
          },
        },
      ],
      coralIntro: {
        k2: 'Shh! Look at all the birds! This marsh is like a bird restaurant!',
        grades35: 'Welcome to the wetlands! Birds come from all over the world to visit here.',
        grades68: 'This salt marsh represents one of the most productive ecosystems per acre on Earth.',
      },
      takeAction: {
        k2: 'Be quiet so we don\'t scare the birds!',
        grades35: 'Keep dogs on leashes and stay on marked trails to protect nesting birds.',
        grades68: 'Support wetland restoration projects and advocate for policies protecting remaining Bay Area marshlands.',
      },
      principles: {
        primary: 'I',
        secondary: ['III'],
        concepts: ['I-B', 'III-A', 'III-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'ocean-beach',
    name: 'Ocean Beach',
    type: 'habitat',
    category: 'Beach',
    icon: '🏖️',
    color: '#ffb74d',
    coordinates: [-122.5108, 37.7594],
    content: {
      title: 'Ocean Beach',
      tagline: {
        k2: 'Where sand meets the big waves!',
        grades35: 'San Francisco\'s wild Pacific shore!',
        grades68: 'A high-energy beach ecosystem on the Pacific coast.',
      },
      description: {
        k2: 'Ocean Beach has lots of sand and big waves. Animals hide under the sand!',
        grades35: 'Ocean Beach is a 3.5-mile stretch of sand facing the mighty Pacific Ocean. Even though it looks empty, lots of creatures live hidden in the sand.',
        grades68: 'Ocean Beach represents a high-energy dissipative beach system, with significant sand transport and dynamic dune ecosystems supporting endemic invertebrate species.',
      },
      whyItMatters: {
        k2: 'Beaches protect the city from big waves. We keep them clean!',
        grades35: 'Beaches protect our coastline from storms and provide habitat for shorebirds and marine mammals.',
        grades68: 'Coastal dune systems provide natural storm buffers while supporting species like the endangered Western snowy plover.',
      },
      funFacts: [
        {
          k2: 'The sand came from rocks that wore down over millions of years!',
          grades35: 'The sand at Ocean Beach comes from rocks that were worn down over millions of years by water and wind!',
          grades68: 'Beach sediments derive from erosion of coastal cliffs and inland watersheds, with grain size reflecting wave energy levels.',
        },
        {
          k2: 'Sand crabs can bury themselves in 2 seconds!',
          grades35: 'Sand crabs can completely bury themselves in the sand in less than 2 seconds!',
          grades68: 'Emerita analoga uses specialized appendages to burrow at rates exceeding body length per second.',
        },
      ],
      creatures: [
        {
          id: 'sand-crab',
          name: 'Sand Crab',
          emoji: '🦀',
          fact: {
            k2: 'They can bury themselves in the sand in less than 2 seconds!',
            grades35: 'Sand crabs burrow backwards into the sand and filter tiny food particles from the waves.',
            grades68: 'Emerita analoga serves as a bioindicator species, with populations reflecting domoic acid levels from harmful algal blooms.',
          },
        },
        {
          id: 'pelican',
          name: 'Brown Pelican',
          emoji: '🐦',
          fact: {
            k2: 'They dive from 60 feet in the air to catch fish!',
            grades35: 'Brown pelicans plunge-dive from 60 feet up, using special air sacs to cushion the impact.',
            grades68: 'Pelican air sacs and modified cervical vertebrae prevent injury during 40 mph dives.',
          },
        },
      ],
      coralIntro: {
        k2: 'Look at those big waves! Animals hide in the sand here!',
        grades35: 'The waves here are powerful! Let\'s discover what lives hidden in the sand.',
        grades68: 'This high-energy beach supports a unique assemblage of invertebrate species.',
      },
      takeAction: {
        k2: 'Don\'t leave trash on the beach!',
        grades35: 'Pick up litter and never disturb resting shorebirds or seals.',
        grades68: 'Participate in beach cleanups and support coastal conservation organizations.',
      },
      principles: {
        primary: 'I',
        secondary: ['IV'],
        concepts: ['I-C', 'IV-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  // ===========================
  // INFRASTRUCTURE
  // ===========================
  {
    id: 'water-treatment',
    name: 'Water Treatment Plant',
    type: 'infrastructure',
    category: 'Water',
    icon: '💧',
    color: '#42a5f5',
    coordinates: [-122.3894, 37.7425],
    content: {
      title: 'Water Treatment Plant',
      tagline: {
        k2: 'Making dirty water clean again!',
        grades35: 'Where used water gets a second chance!',
        grades68: 'Advanced wastewater treatment protecting Bay water quality.',
      },
      description: {
        k2: 'Water treatment plants clean the water we use. They take out yucky stuff to keep fish and birds safe!',
        grades35: 'Water treatment plants clean the water we use in our homes before returning it to the Bay. They remove harmful stuff to keep the water and wildlife safe.',
        grades68: 'Modern wastewater treatment employs primary, secondary, and sometimes tertiary processes to remove suspended solids, organic matter, and nutrients before effluent discharge.',
      },
      whyItMatters: {
        k2: 'Without treatment plants, dirty water would hurt fish and birds!',
        grades35: 'Without treatment plants, dirty water would flow into the Bay and harm fish, birds, and other animals.',
        grades68: 'Wastewater treatment prevents eutrophication, pathogen spread, and toxic accumulation in aquatic food webs.',
      },
      funFacts: [
        {
          k2: 'One treatment plant can clean water for a million people every day!',
          grades35: 'One treatment plant can clean enough water for a million people every single day!',
          grades68: 'The Southeast Plant processes 80 million gallons daily, serving 1.2 million residents.',
        },
        {
          k2: 'Tiny helpful bugs eat the bad stuff in the water!',
          grades35: 'Bacteria in the treatment tanks eat the waste in the water - they\'re nature\'s cleanup crew!',
          grades68: 'Activated sludge processes utilize diverse microbial communities to metabolize organic compounds.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Collection',
          description: {
            k2: 'Water from sinks, toilets, and drains flows through pipes to the plant.',
            grades35: 'Sewers collect wastewater from homes and businesses and carry it to the plant.',
            grades68: 'Combined sewer systems transport both wastewater and stormwater through the collection network.',
          },
        },
        {
          step: 2,
          title: 'Screening',
          description: {
            k2: 'Big filters catch trash, sticks, and other large items.',
            grades35: 'Bar screens and grit chambers remove large debris and sand.',
            grades68: 'Primary treatment includes screening, grit removal, and primary clarification.',
          },
        },
        {
          step: 3,
          title: 'Settling',
          description: {
            k2: 'Heavy particles sink to the bottom of big tanks.',
            grades35: 'In settling tanks, heavy particles sink and are removed as sludge.',
            grades68: 'Sedimentation removes 50-70% of suspended solids through gravitational settling.',
          },
        },
        {
          step: 4,
          title: 'Biological Treatment',
          description: {
            k2: 'Tiny helpful bacteria eat the bad stuff in the water.',
            grades35: 'Helpful bacteria digest organic waste, cleaning the water naturally.',
            grades68: 'Activated sludge processes utilize aerobic microorganisms to oxidize organic matter.',
          },
        },
        {
          step: 5,
          title: 'Disinfection & Release',
          description: {
            k2: 'Clean water flows safely back into the Bay!',
            grades35: 'After disinfection, clean water is released back into San Francisco Bay.',
            grades68: 'UV or chlorine disinfection precedes effluent discharge per NPDES permit requirements.',
          },
        },
      ],
      coralIntro: {
        k2: 'This place makes dirty water clean! It\'s like a giant washing machine!',
        grades35: 'Ever wonder where the water goes after you flush? Let me show you!',
        grades68: 'This facility represents critical infrastructure protecting our watershed.',
      },
      takeAction: {
        k2: 'Only flush toilet paper! No wipes or toys!',
        grades35: 'Never pour grease down the drain, and only flush toilet paper.',
        grades68: 'Reduce pharmaceutical disposal via drains and support infrastructure investment.',
      },
      principles: {
        primary: 'II',
        secondary: ['IV'],
        concepts: ['II-B', 'IV-C'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'recycling-center',
    name: 'Recycling Center',
    type: 'infrastructure',
    category: 'Recycling',
    icon: '♻️',
    color: '#66bb6a',
    coordinates: [-122.2711, 37.8044],
    content: {
      title: 'Recycling Center',
      tagline: {
        k2: 'Turning old stuff into new stuff!',
        grades35: 'Where trash gets a second life!',
        grades68: 'Material recovery facility supporting circular economy goals.',
      },
      description: {
        k2: 'Recycling centers sort bottles, paper, and cans so they can become new things!',
        grades35: 'Recycling centers sort and process materials like paper, plastic, and metal so they can be made into new products instead of going to landfills.',
        grades68: 'Material recovery facilities use mechanical and manual sorting to separate recyclable commodities from the waste stream for remanufacturing.',
      },
      whyItMatters: {
        k2: 'Recycling means less trash and more new toys!',
        grades35: 'Recycling reduces trash, saves energy, and protects wildlife from pollution.',
        grades68: 'Recycling reduces extraction pressure on raw materials and decreases embodied energy in products.',
      },
      funFacts: [
        {
          k2: 'Recycling one can saves enough energy to run a TV for 3 hours!',
          grades35: 'Recycling one aluminum can saves enough energy to run a TV for 3 hours!',
          grades68: 'Aluminum recycling requires only 5% of the energy needed for primary production.',
        },
        {
          k2: 'Robots help sort recycling really fast!',
          grades35: 'Some recycling centers use robots with cameras to sort materials faster than humans!',
          grades68: 'AI-powered optical sorters can identify and sort 80+ material types at rates exceeding 100 items per minute.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Drop Off',
          description: {
            k2: 'People bring recyclables in trucks and cars.',
            grades35: 'Collection trucks bring recyclables from homes and businesses.',
            grades68: 'Single-stream collection aggregates commingled recyclables at the MRF.',
          },
        },
        {
          step: 2,
          title: 'Sorting',
          description: {
            k2: 'Machines and workers separate paper, plastic, glass, and metal.',
            grades35: 'Conveyor belts, magnets, and workers separate different materials.',
            grades68: 'Screens, eddy currents, optical sorters, and manual labor separate material streams.',
          },
        },
        {
          step: 3,
          title: 'Baling',
          description: {
            k2: 'Each material gets squished into big cubes called bales.',
            grades35: 'Sorted materials are compressed into dense bales for shipping.',
            grades68: 'Hydraulic balers compact materials to meet commodity specifications for domestic and export markets.',
          },
        },
        {
          step: 4,
          title: 'Shipping',
          description: {
            k2: 'Bales go to factories to become new products!',
            grades35: 'Bales are sold to manufacturers who turn them into new products.',
            grades68: 'Processed materials enter secondary commodity markets for remanufacturing.',
          },
        },
      ],
      coralIntro: {
        k2: 'Look! That bottle could become a new toy!',
        grades35: 'Every item here will become something new. That\'s the magic of recycling!',
        grades68: 'Material recovery is essential for sustainable resource management.',
      },
      takeAction: {
        k2: 'Put bottles and cans in the blue bin!',
        grades35: 'Rinse containers, flatten boxes, and keep recyclables dry.',
        grades68: 'Reduce contamination by understanding local recycling guidelines and advocating for extended producer responsibility.',
      },
      principles: {
        primary: 'IV',
        secondary: ['V'],
        concepts: ['IV-A', 'V-A'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
  {
    id: 'alviso-levee',
    name: 'Alviso Levee Trail',
    type: 'infrastructure',
    category: 'Flood Protection',
    icon: '🛡️',
    color: '#8d6e63',
    coordinates: [-121.9753, 37.4275],
    content: {
      title: 'Alviso Levee Trail',
      tagline: {
        k2: 'Walls that hold back the water!',
        grades35: 'Earthen barriers protecting the South Bay!',
        grades68: 'Flood control infrastructure facing sea level rise challenges.',
      },
      description: {
        k2: 'Levees are like big walls made of dirt and rock. They keep water from flooding neighborhoods!',
        grades35: 'Levees are like big walls made of dirt and rock that keep water from flooding neighborhoods. You can walk on top of them and see the Bay!',
        grades68: 'The Bay Area\'s levee system, much of it over a century old, protects critical infrastructure and communities from tidal flooding, but faces increasing strain from sea level rise.',
      },
      whyItMatters: {
        k2: 'Levees keep our homes and schools dry during storms!',
        grades35: 'As sea levels rise, levees protect homes, schools, and businesses from flooding.',
        grades68: 'Without levee upgrades, sea level rise could flood $100 billion in Bay Area assets by 2050.',
      },
      funFacts: [
        {
          k2: 'The Bay Area has over 100 miles of levees!',
          grades35: 'The Bay Area has over 100 miles of levees - that\'s longer than 1,500 football fields!',
          grades68: 'The San Francisco Bay has 430+ miles of shoreline, with levees protecting 60% of the developed waterfront.',
        },
        {
          k2: 'Plants help hold the dirt in place!',
          grades35: 'Native plants grow on levees to help hold the soil in place and prevent erosion.',
          grades68: 'Living shorelines combining engineered structures with native vegetation improve resilience while providing habitat.',
        },
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Building',
          description: {
            k2: 'Workers pile up dirt and rocks in a long wall.',
            grades35: 'Engineers design levees using compacted earth, rock, and sometimes concrete.',
            grades68: 'Levee design considers soil mechanics, hydrostatic loads, and projected flood levels.',
          },
        },
        {
          step: 2,
          title: 'Vegetation',
          description: {
            k2: 'Plants are grown on the sides to hold the dirt in place.',
            grades35: 'Native plants are grown on the sides to prevent erosion and provide habitat.',
            grades68: 'Bioengineering integrates native vegetation for slope stabilization and ecological function.',
          },
        },
        {
          step: 3,
          title: 'Monitoring',
          description: {
            k2: 'Engineers check for cracks and weak spots.',
            grades35: 'Engineers regularly inspect for cracks, erosion, and animal burrows.',
            grades68: 'Levee inspection protocols assess seepage, settlement, slope stability, and structural integrity.',
          },
        },
        {
          step: 4,
          title: 'Protection',
          description: {
            k2: 'During storms and high tides, the levee keeps water out!',
            grades35: 'During king tides and storms, levees prevent flooding of nearby areas.',
            grades68: 'Levees provide deterministic flood protection up to their design capacity, beyond which overtopping occurs.',
          },
        },
      ],
      coralIntro: {
        k2: 'These dirt walls keep the water from flooding the town!',
        grades35: 'Walk along this levee and you\'re standing between the Bay and the city!',
        grades68: 'This infrastructure represents the front line of climate adaptation.',
      },
      takeAction: {
        k2: 'Don\'t dig or ride bikes on the levees!',
        grades35: 'Stay on trails and report any damage you see to park rangers.',
        grades68: 'Support levee maintenance funding and participate in sea level rise adaptation planning.',
      },
      principles: {
        primary: 'II',
        secondary: ['V'],
        concepts: ['II-C', 'V-A', 'V-B'],
      },
      standards: {
        k2: 'K-ESS3-3',
        grades35: '5-ESS3-1',
        grades68: 'MS-ESS3-3',
      },
    },
  },
];
```

**Step 3: Verify build succeeds**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`

Expected: Build succeeds with no type errors

**Step 4: Commit**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/data/locations.ts
git commit -m "feat(data): convert all 6 locations to age-adaptive content

Nature locations converted:
- Fitzgerald Marine Reserve (Tide Pool)
- Don Edwards Wildlife Refuge (Wetland)
- Ocean Beach (Beach)

Infrastructure locations converted:
- Water Treatment Plant (Water)
- Recycling Center (Recycling)
- Alviso Levee Trail (Flood Protection)

Each location now includes:
- AgeContent for tagline, description, whyItMatters
- AgeContent funFacts array (2+ facts per location)
- Updated creatures with AgeContent facts
- Updated howItWorks steps with AgeContent descriptions
- coralIntro dialogue for each age level
- takeAction with age-appropriate environmental stewardship
- California EP&C principles and concepts mapping
- Grade-level standards alignment (K-ESS3-3, 5-ESS3-1, MS-ESS3-3)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 1.8: Update LocationPanel to Render Age-Adaptive Content

**Files:**
- Modify: `src/components/LocationPanel.tsx`

**Step 1: Read current LocationPanel.tsx**

Read `src/components/LocationPanel.tsx` to understand current structure.

**Step 2: Update to use age-adaptive content rendering**

The changes needed are:
1. Import getContent helper and ageLevel from store
2. Replace all static content access with getContent() calls
3. Handle the new funFacts array
4. Add Coral intro section

Update the component to use age-adaptive content for all text fields:

Add imports:
```typescript
import { useAppStore } from '@/store/useAppStore';
import { getContent } from '@/utils/ageContent';
```

Get ageLevel from store:
```typescript
const { ageLevel } = useAppStore();
```

Replace all content access patterns:
- `content.tagline` → `getContent(content.tagline, ageLevel)`
- `content.description` → `getContent(content.description, ageLevel)`
- `content.whyItMatters` → `getContent(content.whyItMatters, ageLevel)`
- `creature.fact` → `getContent(creature.fact, ageLevel)`
- `step.description` → `getContent(step.description, ageLevel)`

Replace `didYouKnow` with mapping over `funFacts` array:
```typescript
{content.funFacts?.map((fact, i) => (
  <div key={i} className="p-3 bg-yellow-50 rounded-lg">
    <span className="font-medium">💡 </span>
    {getContent(fact, ageLevel)}
  </div>
))}
```

Add Coral intro section at the top of the Discover tab:
```typescript
<div className="flex items-start gap-3 p-4 bg-[var(--color-sand)]/30 rounded-xl mb-4">
  <img src="/assets/images/crab-mascot.png" alt="Coral" className="w-12 h-12" />
  <p className="text-sm italic text-gray-700">
    "{getContent(content.coralIntro, ageLevel)}"
  </p>
</div>
```

**Step 3: Verify dev server works**

Run: `cd /Users/steven/Github/tidepool-kids && npm run dev`

Then check http://localhost:3000:
1. Select age level in modal
2. Click on Fitzgerald Marine Reserve
3. Verify content matches selected age level
4. Switch age level and verify content changes

**Step 4: Commit**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/components/LocationPanel.tsx
git commit -m "feat(LocationPanel): implement age-adaptive content rendering

- Add getContent() helper for all text fields
- Read ageLevel from Zustand store
- Add Coral intro dialogue section with mascot image
- Replace didYouKnow with funFacts array mapping
- Handle optional fields gracefully
- Graceful fallback to grades35 when no level set

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 1.9: End-to-End Testing of Age System

**Files:**
- None (manual testing)

**Step 1: Start dev server**

Run: `cd /Users/steven/Github/tidepool-kids && npm run dev`

**Step 2: Test first-visit flow**

1. Open http://localhost:3000 in incognito/private window
2. Verify AgeSelectorModal appears with three options
3. Select "K-2 (Explorer)"
4. Verify modal closes
5. Verify header shows "⭐ K-2" toggle
6. Verify points show "0"

**Step 3: Test content adaptation**

1. Click on Fitzgerald Marine Reserve
2. Read the tagline - should be simple ("A rocky pool full of ocean friends!")
3. Read the description - should be simple (1-2 sentences, simple words)
4. Read creature facts - should be simple
5. Check Coral's intro dialogue at top

**Step 4: Test age toggle**

1. Click the age toggle in header
2. Switch to "6-8 (Scientist)"
3. Verify content immediately updates (no page reload)
4. Verify tagline is now scientific ("A protected intertidal ecosystem...")
5. Verify description uses scientific terminology

**Step 5: Test persistence**

1. Refresh the page
2. Verify age level persists (modal doesn't reappear)
3. Verify selected level (6-8) shows in header
4. Verify content still shows 6-8 level

**Step 6: Test points system**

1. Click on a new location (e.g., Don Edwards Wetlands)
2. Verify points increase by 10 (should show +10 animation)
3. Check that "📍 1" increased to "📍 2"

**Step 7: Verify build succeeds**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`

Expected: Build succeeds without errors

**Step 8: Commit any fixes if needed**

If any fixes were needed during testing, commit them with appropriate message.

---

This completes Phase 1: Age System Foundation.

---

## Phase 2: Content Expansion (14 New Locations)

This phase adds 14 new locations to reach 20 total. Each task adds 2-3 locations with complete age-adaptive content.

### Task 2.1: Add Pillar Point Harbor and Palo Alto Baylands

**Files:**
- Modify: `src/data/locations.ts`

**Step 1: Add Pillar Point Harbor (Tide Pool)**

Add after Fitzgerald Marine Reserve in the locations array:

```typescript
{
  id: 'pillar-point-harbor',
  name: 'Pillar Point Harbor',
  type: 'habitat',
  category: 'Tide Pool',
  icon: '🐙',
  color: '#7e57c2',
  coordinates: [-122.4951, 37.4960],
  content: {
    title: 'Pillar Point Harbor',
    tagline: {
      k2: 'Where octopuses hide in the rocks!',
      grades35: 'A harbor full of hidden sea life!',
      grades68: 'A protected harbor with rich intertidal biodiversity.',
    },
    description: {
      k2: 'Big rocks make great hiding spots for octopuses and crabs!',
      grades35: 'This harbor has calm waters and rocky shores where you can find octopuses, crabs, and colorful sea slugs.',
      grades68: 'The breakwater creates a protected environment that supports diverse invertebrate populations, including cephalopods and nudibranchs.',
    },
    whyItMatters: {
      k2: 'Octopuses are really smart! We need to keep their home clean.',
      grades35: 'This habitat is important for many species to find food and shelter. Keeping the water clean helps everyone.',
      grades68: 'Harbor ecosystems face unique pressures from boat traffic and runoff, making conservation efforts essential for maintaining biodiversity.',
    },
    funFacts: [
      {
        k2: 'Octopuses can change color in one second!',
        grades35: 'Octopuses can change both their color AND texture to match their surroundings perfectly.',
        grades68: 'Cephalopod chromatophores contain elastic sacs of pigment that expand and contract under neural control at millisecond timescales.',
      },
      {
        k2: 'Octopuses have 3 hearts!',
        grades35: 'An octopus has three hearts - two pump blood to the gills and one pumps it to the body.',
        grades68: 'The cephalopod circulatory system with three hearts compensates for the oxygen-carrying limitations of copper-based hemocyanin.',
      },
    ],
    creatures: [
      {
        id: 'giant-pacific-octopus',
        name: 'Giant Pacific Octopus',
        emoji: '🐙',
        fact: {
          k2: 'They have 8 arms and 3 hearts!',
          grades35: 'Giant Pacific octopuses have 8 arms with suckers, 3 hearts, and blue blood!',
          grades68: 'GPO (Enteroctopus dofleini) can grow to 16 feet and exhibit problem-solving intelligence comparable to some mammals.',
        },
      },
      {
        id: 'rock-crab',
        name: 'Rock Crab',
        emoji: '🦀',
        fact: {
          k2: 'They walk sideways!',
          grades35: 'Rock crabs walk sideways because their legs bend that way. It makes them fast!',
          grades68: 'The lateral gait of crabs evolved as an adaptation to their flattened body plan and leg joint structure.',
        },
      },
      {
        id: 'nudibranch',
        name: 'Nudibranch',
        emoji: '🐌',
        fact: {
          k2: 'They look like tiny rainbows!',
          grades35: 'Nudibranchs are colorful sea slugs. Their bright colors warn predators that they taste bad!',
          grades68: 'Nudibranch aposematic coloration often signals the presence of secondary metabolites sequestered from cnidarian prey.',
        },
      },
    ],
    coralIntro: {
      k2: 'Look! The rocks have so many hiding spots! Can you find the octopus?',
      grades35: 'This harbor is great for spotting sea life. Keep your eyes on the rocky areas!',
      grades68: 'The protected waters here create ideal conditions for observing cryptic species.',
    },
    takeAction: {
      k2: 'Be quiet so the animals don\'t get scared!',
      grades35: 'Move slowly and quietly. Animals hide when they sense movement.',
      grades68: 'Minimize disturbance by observing from a distance and avoiding direct contact with organisms.',
    },
    principles: {
      primary: 'I',
      secondary: ['II'],
      concepts: ['I-A', 'I-B', 'II-A'],
    },
    standards: {
      k2: 'K-ESS3-3',
      grades35: '5-ESS3-1',
      grades68: 'MS-ESS3-3',
    },
  },
},
```

**Step 2: Add Palo Alto Baylands (Wetland)**

Add after Don Edwards Wetlands:

```typescript
{
  id: 'palo-alto-baylands',
  name: 'Palo Alto Baylands',
  type: 'habitat',
  category: 'Wetland',
  icon: '🦅',
  color: '#43a047',
  coordinates: [-122.1066, 37.4587],
  content: {
    title: 'Palo Alto Baylands',
    tagline: {
      k2: 'A marshy home for so many birds!',
      grades35: 'Where the marsh meets the Bay!',
      grades68: 'A critical salt marsh ecosystem in the South Bay.',
    },
    description: {
      k2: 'This soggy place is full of birds looking for yummy snacks!',
      grades35: 'Salt marshes like this are important because they give birds a place to eat, rest, and raise their babies.',
      grades68: 'Salt marshes provide essential ecosystem services including flood mitigation, carbon sequestration, and nursery habitat for fish.',
    },
    whyItMatters: {
      k2: 'Birds need clean marshes to find food. No littering!',
      grades35: 'Wetlands filter dirty water and protect the shoreline from flooding. They\'re like nature\'s sponges!',
      grades68: 'Coastal wetlands store more carbon per hectare than most forests, making them critical for climate regulation.',
    },
    funFacts: [
      {
        k2: 'Some birds fly super far to visit here!',
        grades35: 'Migrating birds can fly over 10,000 miles to reach Bay Area wetlands!',
        grades68: 'The Pacific Flyway migration corridor sees millions of birds annually, with Bay wetlands serving as critical stopover sites.',
      },
      {
        k2: 'There\'s a tiny mouse that can swim in salty water!',
        grades35: 'The salt marsh harvest mouse is endangered and can only live in pickleweed marshes.',
        grades68: 'Reithrodontomys raviventris is endemic to San Francisco Bay, having evolved to drink hypersaline water.',
      },
    ],
    creatures: [
      {
        id: 'snowy-egret',
        name: 'Snowy Egret',
        emoji: '🦢',
        fact: {
          k2: 'They have bright yellow feet like rain boots!',
          grades35: 'Snowy egrets have yellow feet they use to stir up fish in shallow water.',
          grades68: 'The distinctive yellow lores and feet of breeding snowy egrets are used in courtship displays.',
        },
      },
      {
        id: 'salt-marsh-harvest-mouse',
        name: 'Salt Marsh Harvest Mouse',
        emoji: '🐭',
        fact: {
          k2: 'This tiny mouse can swim!',
          grades35: 'The salt marsh harvest mouse is endangered and can only live in pickleweed marshes.',
          grades68: 'Reithrodontomys raviventris is endemic to San Francisco Bay and adapted to drink saline water.',
        },
      },
      {
        id: 'pickleweed',
        name: 'Pickleweed',
        emoji: '🌿',
        fact: {
          k2: 'This plant loves salty water!',
          grades35: 'Pickleweed can survive in very salty soil where most plants would die.',
          grades68: 'Salicornia species excrete excess salt through specialized bladder cells on leaf surfaces.',
        },
      },
    ],
    coralIntro: {
      k2: 'Look at all the birds! This marsh is like a bird restaurant!',
      grades35: 'Welcome to the baylands! Birds come from all over the world to visit here.',
      grades68: 'This salt marsh represents one of the most productive ecosystems per acre on Earth.',
    },
    takeAction: {
      k2: 'Stay on the trail so we don\'t step on bird nests!',
      grades35: 'Keep dogs on leashes and stay on marked trails to protect ground-nesting birds.',
      grades68: 'Support wetland restoration efforts and advocate for policies protecting remaining Bay marshlands.',
    },
    principles: {
      primary: 'I',
      secondary: ['III'],
      concepts: ['I-B', 'III-A', 'III-B'],
    },
    standards: {
      k2: 'K-ESS3-3',
      grades35: '5-ESS3-1',
      grades68: 'MS-ESS3-3',
    },
  },
},
```

**Step 3: Verify build**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`

Expected: Build succeeds

**Step 4: Commit**

```bash
cd /Users/steven/Github/tidepool-kids
git add src/data/locations.ts
git commit -m "feat(data): add Pillar Point Harbor and Palo Alto Baylands

Pillar Point Harbor (Tide Pool):
- 3 creatures: Giant Pacific Octopus, Rock Crab, Nudibranch
- Focus on cephalopod intelligence and camouflage

Palo Alto Baylands (Wetland):
- 3 species: Snowy Egret, Salt Marsh Harvest Mouse, Pickleweed
- Focus on endemic species and salt adaptation

Both with full age-adaptive content and EP&C alignment

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

*[The plan continues with Tasks 2.2 through 2.7 adding the remaining 12 locations, Tasks 3.1 through 3.6 implementing all 6 activity types, Tasks 4.1 through 4.3 implementing gamification, Tasks 5.1 through 5.3 implementing Coral dialogue system, and Tasks 6.1 through 6.3 for testing and deployment]*

---

## Summary of Remaining Tasks (abbreviated for plan length)

### Phase 2: Content Expansion (continued)
- Task 2.2: Add Crissy Field Marsh and Stinson Beach
- Task 2.3: Add Muir Woods and Redwood Regional Park
- Task 2.4: Add Aquarium of the Bay
- Task 2.5: Add Hetch Hetchy Reservoir and SF Compost Facility
- Task 2.6: Add Embarcadero BART and SF-Oakland Bay Bridge
- Task 2.7: Add SF Seawall and Altamont Landfill

### Phase 3: Activity Implementation
- Task 3.1: Create QuizQuestion and QuizData types
- Task 3.2: Create ActivityQuiz component
- Task 3.3: Add quiz data to 5 locations
- Task 3.4: Create SortingData types and ActivitySorting component
- Task 3.5: Create MatchingData types and ActivityMatching component
- Task 3.6: Create SpotterData types and ActivitySpotter component
- Task 3.7: Create SequencerData types and ActivitySequencer component
- Task 3.8: Create DataExplorerData types and ActivityData component
- Task 3.9: Integrate all activities into LocationPanel

### Phase 4: Gamification
- Task 4.1: Create BadgeDisplay component
- Task 4.2: Create PointsCounter with animations
- Task 4.3: Create AchievementToast notifications
- Task 4.4: Implement badge awarding logic for all badges

### Phase 5: Coral Dialogue System
- Task 5.1: Create CoralDialogue component
- Task 5.2: Add dialogue triggers throughout app
- Task 5.3: Implement personality variations by age level

### Phase 6: Testing and Deployment
- Task 6.1: Manual end-to-end testing of all features
- Task 6.2: Build verification
- Task 6.3: Deploy to Cloudflare Pages

---

## Execution

This plan is designed for incremental, testable progress. Each task:
1. Makes small, focused changes
2. Includes verification steps
3. Commits frequently
4. Maintains a working build

Estimated time: 4-6 hours for complete implementation

**Ready to execute? Use the superpowers:executing-plans skill or superpowers:subagent-driven-development for parallel execution.**
