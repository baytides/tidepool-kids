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

export interface Creature {
  id: string;
  name: string;
  emoji: string;
  fact: AgeContent;
  habitat?: string;
  diet?: AgeContent;
  coolFeature?: AgeContent;
}

export interface Step {
  step: number;
  title: string;
  description: AgeContent;
  icon?: string;
}

/**
 * Quiz activity data structure
 */
export interface QuizQuestion {
  question: AgeContent;
  options: AgeContent[];
  correctIndex: number;
  explanation: AgeContent;
}

export interface QuizData {
  questions: QuizQuestion[];
}

/**
 * Sorting activity data structure
 */
export interface SortingBin {
  id: string;
  label: string;
  icon: string;
}

export interface SortingItem {
  id: string;
  label: string;
  emoji: string;
  correctBin: string;
}

export interface SortingData {
  bins: SortingBin[];
  items: SortingItem[];
}

/**
 * Matching activity data structure
 */
export interface MatchingPair {
  id: string;
  left: string;
  right: string;
  emoji?: string;
}

export interface MatchingData {
  pairs: MatchingPair[];
}

export interface Activity {
  type: 'spotter' | 'matching' | 'sorting' | 'quiz' | 'sequencer' | 'data';
  title: string;
  instructions: AgeContent;
  data: QuizData | SortingData | MatchingData | unknown;
  points: number;
  badge?: string;
}

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
    concepts: string[];
  };
  standards: {
    k2?: string;
    grades35?: string;
    grades68?: string;
  };
}

export interface Location {
  id: string;
  name: string;
  type: 'habitat' | 'infrastructure';
  category: string;
  icon: string;
  color: string;
  coordinates: [number, number];
  content: LocationContent;
}
