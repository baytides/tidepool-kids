# Tidepool Kids MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive, animated Bay Area nature map for kids (K-8) with smooth animations and light game-like interactivity.

**Architecture:** Next.js App Router with Mapbox for the map, Framer Motion for animations, Zustand for state (selected location, collected creatures). The app has a map view with clickable locations, a sidebar for navigation, and slide-up detail panels with tabbed content.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Mapbox GL JS, Zustand

---

## Task 1: Project Foundation - Layout and Fonts

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/app/fonts.ts`

**Step 1: Create fonts configuration**

Create `src/app/fonts.ts`:
```typescript
import { Nunito, Fredoka } from 'next/font/google';

export const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});
```

**Step 2: Update globals.css with design tokens**

Replace `src/app/globals.css`:
```css
@import "tailwindcss";

:root {
  --color-navy: #1a237e;
  --color-navy-light: #3949ab;
  --color-lime: #7cb342;
  --color-lime-dark: #558b2f;
  --color-pink: #e91e8c;
  --color-aqua: #26c6da;
  --color-aqua-dark: #00838f;
  --color-sand: #fff8e1;

  --font-body: var(--font-nunito), system-ui, sans-serif;
  --font-display: var(--font-fredoka), system-ui, sans-serif;
}

body {
  font-family: var(--font-body);
  background: #f8fafc;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
}
```

**Step 3: Update layout.tsx**

Replace `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next';
import { nunito, fredoka } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tidepool Kids - Explore the Bay Area',
  description: 'An interactive map for kids to explore San Francisco Bay Area nature and community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Step 4: Verify build**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: set up project foundation with fonts and design tokens"
```

---

## Task 2: Location Data and Types

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/locations.ts`

**Step 1: Create types**

Create `src/types/index.ts`:
```typescript
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
```

**Step 2: Create location data**

Create `src/data/locations.ts`:
```typescript
import { Location } from '@/types';

export const locations: Location[] = [
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
      tagline: 'Where the ocean meets the rocks!',
      description: 'Tide pools are like natural aquariums along the rocky shore. When the tide goes out, sea creatures get trapped in pools of water between the rocks.',
      whyItMatters: 'Tide pools are home to hundreds of species. They help scientists learn about ocean health and teach us to protect coastal habitats.',
      didYouKnow: 'Sea stars can regrow their arms if they lose one!',
      creatures: [
        { id: 'hermit-crab', name: 'Hermit Crab', emoji: '🦀', fact: 'They borrow shells from other animals and switch to bigger ones as they grow!' },
        { id: 'sea-star', name: 'Sea Star', emoji: '⭐', fact: 'Sea stars have eyes at the tip of each arm!' },
        { id: 'sea-anemone', name: 'Sea Anemone', emoji: '🌸', fact: 'They look like flowers but are actually animals that eat fish!' },
      ],
      activity: {
        type: 'spotting',
        title: 'Creature Spotter',
        instructions: 'Can you find all 5 creatures hiding in the tide pool?',
        data: { target: 5 },
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
      tagline: 'A rest stop for traveling birds!',
      description: 'Wetlands are areas where water covers the soil. They are like giant sponges that clean water and provide homes for birds and fish.',
      whyItMatters: 'Wetlands filter pollution, prevent floods, and give millions of migrating birds a place to rest and eat.',
      didYouKnow: 'Some birds fly over 10,000 miles to visit Bay Area wetlands every year!',
      creatures: [
        { id: 'great-egret', name: 'Great Egret', emoji: '🦢', fact: 'They stand perfectly still to catch fish, then strike like lightning!' },
        { id: 'harbor-seal', name: 'Harbor Seal', emoji: '🦭', fact: 'They can hold their breath for up to 30 minutes!' },
      ],
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
      tagline: 'Where sand meets the Pacific!',
      description: 'Ocean Beach is a 3.5-mile stretch of sand on the western edge of San Francisco, facing the mighty Pacific Ocean.',
      whyItMatters: 'Beaches protect our coastline from storms and provide habitat for shorebirds and marine mammals.',
      didYouKnow: 'The sand at Ocean Beach comes from rocks that were worn down over millions of years!',
      creatures: [
        { id: 'sand-crab', name: 'Sand Crab', emoji: '🦀', fact: 'They can bury themselves in the sand in less than 2 seconds!' },
        { id: 'pelican', name: 'Brown Pelican', emoji: '🐦', fact: 'They dive from 60 feet in the air to catch fish!' },
      ],
    },
  },
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
      tagline: 'Making dirty water clean again!',
      description: 'Water treatment plants clean the water we use in our homes before returning it to the Bay. They remove harmful stuff to keep the water and wildlife safe.',
      whyItMatters: 'Without treatment plants, dirty water would flow into the Bay and harm fish, birds, and other animals.',
      didYouKnow: 'One treatment plant can clean enough water for a million people every day!',
      howItWorks: [
        { step: 1, title: 'Collection', description: 'Water from sinks, toilets, and drains flows through pipes to the plant.' },
        { step: 2, title: 'Screening', description: 'Big filters catch trash, sticks, and other large items.' },
        { step: 3, title: 'Settling', description: 'Heavy particles sink to the bottom of big tanks.' },
        { step: 4, title: 'Cleaning', description: 'Tiny helpful bacteria eat the bad stuff in the water.' },
        { step: 5, title: 'Release', description: 'Clean water flows safely back into the Bay!' },
      ],
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
      tagline: 'Turning old stuff into new stuff!',
      description: 'Recycling centers sort and process materials like paper, plastic, and metal so they can be made into new products instead of going to landfills.',
      whyItMatters: 'Recycling reduces trash, saves energy, and protects wildlife from pollution.',
      didYouKnow: 'Recycling one aluminum can saves enough energy to run a TV for 3 hours!',
      howItWorks: [
        { step: 1, title: 'Drop Off', description: 'People bring recyclables in trucks and cars.' },
        { step: 2, title: 'Sorting', description: 'Machines and workers separate paper, plastic, glass, and metal.' },
        { step: 3, title: 'Baling', description: 'Each material gets squished into big cubes called bales.' },
        { step: 4, title: 'Shipping', description: 'Bales go to factories to become new products!' },
      ],
      activity: {
        type: 'sorting',
        title: 'Sort the Recyclables',
        instructions: 'Drag each item to the correct bin!',
        data: { bins: ['paper', 'plastic', 'glass', 'metal'] },
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
      tagline: 'Walls that hold back the water!',
      description: 'Levees are like big walls made of dirt and rock that keep water from flooding neighborhoods. You can walk on top of them and see the Bay!',
      whyItMatters: 'As sea levels rise, levees protect homes, schools, and businesses from flooding.',
      didYouKnow: 'The Bay Area has over 100 miles of levees!',
      howItWorks: [
        { step: 1, title: 'Building', description: 'Workers pile up dirt and rocks in a long wall.' },
        { step: 2, title: 'Strengthening', description: 'Plants are grown on the sides to hold the dirt in place.' },
        { step: 3, title: 'Monitoring', description: 'Engineers check for cracks and weak spots regularly.' },
        { step: 4, title: 'Protecting', description: 'During storms and high tides, the levee keeps water out!' },
      ],
    },
  },
];
```

**Step 3: Verify types compile**

Run: `cd /Users/steven/Github/tidepool-kids && npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add location data and TypeScript types"
```

---

## Task 3: Zustand Store for App State

**Files:**
- Create: `src/store/useAppStore.ts`

**Step 1: Create the store**

Create `src/store/useAppStore.ts`:
```typescript
import { create } from 'zustand';
import { Location } from '@/types';

interface AppState {
  selectedLocation: Location | null;
  selectLocation: (location: Location | null) => void;

  collectedCreatures: string[];
  collectCreature: (creatureId: string) => void;

  visitedLocations: string[];
  markVisited: (locationId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedLocation: null,
  selectLocation: (location) => set({ selectedLocation: location }),

  collectedCreatures: [],
  collectCreature: (creatureId) =>
    set((state) => ({
      collectedCreatures: state.collectedCreatures.includes(creatureId)
        ? state.collectedCreatures
        : [...state.collectedCreatures, creatureId],
    })),

  visitedLocations: [],
  markVisited: (locationId) =>
    set((state) => ({
      visitedLocations: state.visitedLocations.includes(locationId)
        ? state.visitedLocations
        : [...state.visitedLocations, locationId],
    })),
}));
```

**Step 2: Verify build**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Zustand store for app state"
```

---

## Task 4: Header Component

**Files:**
- Create: `src/components/Header.tsx`

**Step 1: Create Header component**

Create `src/components/Header.tsx`:
```typescript
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export function Header() {
  const { visitedLocations, collectedCreatures } = useAppStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/crab-mascot.png"
            alt="Coral the Crab"
            width={40}
            height={40}
          />
          <span className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[--color-navy]">
            Tidepool Kids
          </span>
        </a>

        <nav className="flex items-center gap-6">
          <a href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Explore
          </a>
          <a href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-[--color-sand] rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span>📍</span>
            <span className="text-sm font-medium">{visitedLocations.length}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-[--color-sand] rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span>🦀</span>
            <span className="text-sm font-medium">{collectedCreatures.length}</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Verify build**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Header component with progress counters"
```

---

## Task 5: Map Component with Mapbox

**Files:**
- Create: `src/components/Map.tsx`

**Step 1: Create Map component**

Create `src/components/Map.tsx`:
```typescript
'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '@/data/locations';
import { useAppStore } from '@/store/useAppStore';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  const { selectedLocation, selectLocation, markVisited } = useAppStore();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc) => bounds.extend(loc.coordinates));

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      bounds: bounds,
      fitBoundsOptions: { padding: 60 },
    });

    map.current.on('load', () => {
      locations.forEach((location) => {
        const el = document.createElement('button');
        el.className = 'map-marker';
        el.textContent = location.icon;
        el.setAttribute('aria-label', location.name);
        el.style.width = '48px';
        el.style.height = '48px';
        el.style.fontSize = '24px';
        el.style.background = 'white';
        el.style.border = `3px solid ${location.color}`;
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.transition = 'transform 0.2s, box-shadow 0.2s';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.15)';
          el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
        });
        el.addEventListener('mouseleave', () => {
          if (selectedLocation?.id !== location.id) {
            el.style.transform = 'scale(1)';
            el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
          }
        });
        el.addEventListener('click', () => {
          selectLocation(location);
          markVisited(location.id);
          map.current?.flyTo({
            center: location.coordinates,
            zoom: 12,
          });
        });

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat(location.coordinates)
          .addTo(map.current!);

        markersRef.current[location.id] = marker;
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [selectLocation, markVisited, selectedLocation?.id]);

  // Update marker styles when selection changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const el = marker.getElement();
      if (id === selectedLocation?.id) {
        el.style.transform = 'scale(1.2)';
        el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
      } else {
        el.style.transform = 'scale(1)';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
      }
    });
  }, [selectedLocation?.id]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      <AnimatePresence>
        {!selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 max-w-sm"
          >
            <motion.img
              src="/assets/images/crab-mascot.png"
              alt="Coral"
              width={64}
              height={64}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <div>
              <h2 className="font-[family-name:var(--font-fredoka)] text-xl text-[--color-navy]">
                Hi, I&apos;m Coral!
              </h2>
              <p className="text-sm text-gray-600">
                Tap a pin to explore the Bay with me!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Step 2: Create .env.local.example for Mapbox token**

Create `.env.local.example`:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

**Step 3: Verify build**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`
Expected: Build succeeds (token warning is OK for now)

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add interactive Map component with Mapbox"
```

---

## Task 6: Sidebar Component

**Files:**
- Create: `src/components/Sidebar.tsx`

**Step 1: Create Sidebar component**

Create `src/components/Sidebar.tsx`:
```typescript
'use client';

import { motion } from 'framer-motion';
import { locations } from '@/data/locations';
import { useAppStore } from '@/store/useAppStore';
import { Location } from '@/types';

export function Sidebar() {
  const { selectedLocation, selectLocation, markVisited, visitedLocations } = useAppStore();

  const habitats = locations.filter((l) => l.type === 'habitat');
  const infrastructure = locations.filter((l) => l.type === 'infrastructure');

  const handleSelect = (location: Location) => {
    selectLocation(location);
    markVisited(location.id);
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy]">
          Places to Explore
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Nature
          </h3>
          <ul className="space-y-1">
            {habitats.map((location) => (
              <LocationButton
                key={location.id}
                location={location}
                isSelected={selectedLocation?.id === location.id}
                isVisited={visitedLocations.includes(location.id)}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Community
          </h3>
          <ul className="space-y-1">
            {infrastructure.map((location) => (
              <LocationButton
                key={location.id}
                location={location}
                isSelected={selectedLocation?.id === location.id}
                isVisited={visitedLocations.includes(location.id)}
                onSelect={handleSelect}
              />
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}

function LocationButton({
  location,
  isSelected,
  isVisited,
  onSelect,
}: {
  location: Location;
  isSelected: boolean;
  isVisited: boolean;
  onSelect: (location: Location) => void;
}) {
  return (
    <motion.li whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
      <button
        onClick={() => onSelect(location)}
        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
          isSelected
            ? 'bg-[--color-aqua] text-white'
            : 'hover:bg-gray-50'
        }`}
      >
        <span
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl ${
            isSelected ? 'bg-white/20' : 'bg-gray-100'
          }`}
        >
          {location.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{location.name}</span>
            {isVisited && !isSelected && (
              <span className="text-xs text-green-500">✓</span>
            )}
          </div>
          <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
            {location.category}
          </span>
        </div>
      </button>
    </motion.li>
  );
}
```

**Step 2: Verify build**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Sidebar component with location list"
```

---

## Task 7: Location Panel Component

**Files:**
- Create: `src/components/LocationPanel.tsx`

**Step 1: Create LocationPanel component**

Create `src/components/LocationPanel.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

type Tab = 'discover' | 'explore' | 'play';

export function LocationPanel() {
  const { selectedLocation, selectLocation, collectCreature, collectedCreatures } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('discover');

  if (!selectedLocation) return null;

  const { content } = selectedLocation;
  const hasCreatures = content.creatures && content.creatures.length > 0;
  const hasSteps = content.howItWorks && content.howItWorks.length > 0;
  const hasActivity = !!content.activity;

  return (
    <AnimatePresence>
      <motion.div
        key={selectedLocation.id}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-80 bg-white rounded-t-3xl shadow-2xl max-h-[60vh] flex flex-col z-40"
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-100">
          <button
            onClick={() => selectLocation(null)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close panel"
          >
            ✕
          </button>
          <div className="flex items-center gap-4 flex-1">
            <span className="text-4xl">{selectedLocation.icon}</span>
            <div>
              <span
                className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white mb-1"
                style={{ background: selectedLocation.color }}
              >
                {selectedLocation.category}
              </span>
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[--color-navy]">
                {content.title}
              </h2>
              <p className="text-gray-500 italic">{content.tagline}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 py-3 border-b border-gray-100">
          <TabButton tab="discover" active={activeTab} onClick={setActiveTab}>
            Discover
          </TabButton>
          {(hasCreatures || hasSteps) && (
            <TabButton tab="explore" active={activeTab} onClick={setActiveTab}>
              Explore
            </TabButton>
          )}
          {hasActivity && (
            <TabButton tab="play" active={activeTab} onClick={setActiveTab}>
              Play
            </TabButton>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'discover' && (
            <div className="space-y-6">
              <section>
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy] mb-2">
                  What is this place?
                </h3>
                <p className="text-gray-700 leading-relaxed">{content.description}</p>
              </section>

              <section>
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy] mb-2">
                  Why does it matter?
                </h3>
                <p className="text-gray-700 leading-relaxed">{content.whyItMatters}</p>
              </section>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <span className="text-2xl">💡</span>
                <div>
                  <strong className="text-amber-800">Did you know?</strong>
                  <p className="text-amber-700 text-sm">{content.didYouKnow}</p>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'explore' && hasCreatures && (
            <div>
              <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy] mb-4">
                Meet the Creatures
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {content.creatures!.map((creature) => {
                  const isCollected = collectedCreatures.includes(creature.id);
                  return (
                    <motion.button
                      key={creature.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => collectCreature(creature.id)}
                      className={`p-4 rounded-xl text-left transition-colors ${
                        isCollected
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{creature.emoji}</span>
                        <span className="font-semibold">{creature.name}</span>
                        {isCollected && <span className="text-green-500">✓</span>}
                      </div>
                      <p className="text-sm text-gray-600">{creature.fact}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'explore' && hasSteps && (
            <div>
              <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy] mb-4">
                How It Works
              </h3>
              <div className="space-y-4">
                {content.howItWorks!.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-blue-50 rounded-xl"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-[--color-aqua] text-white font-bold rounded-full flex-shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[--color-navy]">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'play' && hasActivity && (
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🎮</span>
              <h3 className="font-[family-name:var(--font-fredoka)] text-xl text-[--color-navy] mb-2">
                {content.activity!.title}
              </h3>
              <p className="text-gray-600 mb-6">{content.activity!.instructions}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[--color-pink] text-white font-semibold rounded-full"
              >
                Coming Soon!
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TabButton({
  tab,
  active,
  onClick,
  children,
}: {
  tab: Tab;
  active: Tab;
  onClick: (tab: Tab) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => onClick(tab)}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
        active === tab
          ? 'bg-[--color-navy] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
```

**Step 2: Verify build**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add LocationPanel with tabs and animations"
```

---

## Task 8: Main Page Assembly

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Update page.tsx**

Replace `src/app/page.tsx`:
```typescript
import { Header } from '@/components/Header';
import { Map } from '@/components/Map';
import { Sidebar } from '@/components/Sidebar';
import { LocationPanel } from '@/components/LocationPanel';

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex pt-16">
        <div className="flex-1 relative">
          <Map />
          <LocationPanel />
        </div>
        <Sidebar />
      </main>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: assemble main page with all components"
```

---

## Task 9: Environment Setup and Final Polish

**Files:**
- Create: `.env.local`

**Step 1: Create .env.local with Mapbox token**

The user has MAPBOX_TOKEN in GitHub secrets. Create `.env.local`:
```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoidGlkZXBvb2xraWRzIiwiYSI6ImNtNmZ6Ym5wdjBhbGQyanB1enF4OXNoMjQifQ.placeholder
```

Note: Replace with actual token from user or GitHub secrets.

**Step 2: Test dev server**

Run: `cd /Users/steven/Github/tidepool-kids && npm run dev`
Expected: Server starts, visit http://localhost:3000

**Step 3: Final build test**

Run: `cd /Users/steven/Github/tidepool-kids && npm run build`
Expected: Build succeeds with no errors

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: add environment configuration"
```

---

## Summary

After completing all tasks, you will have:
1. Clean Next.js project with proper fonts and design tokens
2. TypeScript types for all data structures
3. Zustand store for app state
4. Animated Header with progress counters
5. Interactive Mapbox map with custom markers
6. Sidebar with location list
7. Animated LocationPanel with tabs
8. Assembled main page
9. Environment configuration

The app will feature:
- Smooth Framer Motion animations throughout
- Interactive map with hover/select states
- Slide-up detail panel
- Creature collection mechanic
- Visit tracking
- Clean, kid-friendly design
