export interface Creature {
  id: string;
  name: string;
  emoji: string;
  fact: string;
}

export interface Step {
  step: number;
  title: string;
  description: string;
}

export interface Activity {
  type: 'quiz' | 'matching' | 'sorting' | 'spotting';
  title: string;
  instructions: string;
  data: unknown;
}

export interface LocationContent {
  title: string;
  tagline: string;
  description: string;
  whyItMatters: string;
  didYouKnow: string;
  creatures?: Creature[];
  howItWorks?: Step[];
  activity?: Activity;
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
