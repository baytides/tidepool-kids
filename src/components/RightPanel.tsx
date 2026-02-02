'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { LocationPanel } from './LocationPanel';

export function RightPanel() {
  const { selectedLocation, visitedLocations, collectedCreatures, totalPoints } = useAppStore();

  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const motionProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <aside
      id="right-panel"
      className="flex-[3] bg-gradient-to-b from-white to-blue-50 border-l-4 border-[var(--color-aqua)] flex flex-col h-full overflow-hidden"
      role="complementary"
      aria-label="Location details and activities"
    >
      <AnimatePresence mode="wait">
        {selectedLocation ? (
          <motion.div
            key="location"
            {...motionProps}
            className="flex-1 overflow-hidden"
          >
            <LocationPanel />
          </motion.div>
        ) : (
          <motion.div
            key="overview"
            {...motionProps}
            className="flex-1 p-4 overflow-y-auto"
          >
            <OverviewPanel
              visitedCount={visitedLocations.length}
              creaturesCount={collectedCreatures.length}
              points={totalPoints}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

interface OverviewPanelProps {
  visitedCount: number;
  creaturesCount: number;
  points: number;
}

function OverviewPanel({ visitedCount, creaturesCount, points }: OverviewPanelProps) {
  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="text-center py-4">
        <h2 className="font-[family-name:var(--font-fredoka)] text-xl text-[var(--color-navy)] mb-2">
          Welcome, Explorer!
        </h2>
        <p className="text-gray-600 text-sm">
          Click a location on the map to start learning
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3" role="group" aria-label="Your progress">
        <StatCard icon="📍" value={visitedCount} label="Visited" />
        <StatCard icon="🦀" value={creaturesCount} label="Creatures" />
        <StatCard icon="⭐" value={points} label="Points" />
      </div>

      {/* Suggested next steps */}
      <div className="bg-[var(--color-sand)]/50 rounded-xl p-4">
        <h3 className="font-[family-name:var(--font-fredoka)] text-sm text-[var(--color-navy)] mb-3">
          🎯 Suggested Next Steps
        </h3>
        <ul className="space-y-2 text-sm text-gray-700" role="list">
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[var(--color-aqua)]/20 flex items-center justify-center text-xs" aria-hidden="true">1</span>
            <span>Visit Fitzgerald Marine Reserve</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[var(--color-aqua)]/20 flex items-center justify-center text-xs" aria-hidden="true">2</span>
            <span>Learn about tide pool creatures</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[var(--color-aqua)]/20 flex items-center justify-center text-xs" aria-hidden="true">3</span>
            <span>Complete your first activity</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: string;
  value: number;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
      <div className="text-2xl mb-1" aria-hidden="true">{icon}</div>
      <div className="font-bold text-lg text-[var(--color-navy)]">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
