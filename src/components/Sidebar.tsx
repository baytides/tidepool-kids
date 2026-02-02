'use client';

import { motion } from 'framer-motion';
import { locations } from '@/data/locations';
import { useAppStore } from '@/store/useAppStore';
import { Location } from '@/types';
import { XPBar } from './XPBar';

export function Sidebar() {
  const { selectedLocation, selectLocation, markVisited, visitedLocations } = useAppStore();

  const habitats = locations.filter((l) => l.type === 'habitat');
  const infrastructure = locations.filter((l) => l.type === 'infrastructure');

  const handleSelect = (location: Location) => {
    selectLocation(location);
    markVisited(location.id);
  };

  const totalLocations = locations.length;
  const visitedCount = visitedLocations.length;
  const progressPercent = Math.round((visitedCount / totalLocations) * 100);

  return (
    <aside aria-label="Location navigation" className="w-80 bg-gradient-to-b from-white to-blue-50 border-l-4 border-[var(--color-aqua)] flex flex-col h-full overflow-hidden">
      {/* Header with fun styling */}
      <div className="p-4 bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)] text-white">
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🗺️
          </motion.span>
          <h2 className="font-[family-name:var(--font-fredoka)] text-xl">
            Adventure Map
          </h2>
        </div>

        {/* Progress indicator */}
        <div className="bg-white/20 rounded-full p-1">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex-1 bg-white/30 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-[var(--color-sunny)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="font-bold text-xs whitespace-nowrap">
              {visitedCount}/{totalLocations} 🏆
            </span>
          </div>
        </div>
      </div>

      {/* XP Bar */}
      <div className="p-3 border-b-2 border-dashed border-[var(--color-aqua)]/30">
        <XPBar compact />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Nature Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <motion.span
              className="text-xl"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🌿
            </motion.span>
            <h3 className="font-[family-name:var(--font-fredoka)] text-sm text-[var(--color-navy)] uppercase tracking-wide">
              Nature Spots
            </h3>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              {habitats.filter(h => visitedLocations.includes(h.id)).length}/{habitats.length}
            </span>
          </div>
          <ul className="space-y-2">
            {habitats.map((location, index) => (
              <LocationButton
                key={location.id}
                location={location}
                isSelected={selectedLocation?.id === location.id}
                isVisited={visitedLocations.includes(location.id)}
                onSelect={handleSelect}
                index={index}
              />
            ))}
          </ul>
        </section>

        {/* Community Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <motion.span
              className="text-xl"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏙️
            </motion.span>
            <h3 className="font-[family-name:var(--font-fredoka)] text-sm text-[var(--color-navy)] uppercase tracking-wide">
              Community Places
            </h3>
            <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              {infrastructure.filter(i => visitedLocations.includes(i.id)).length}/{infrastructure.length}
            </span>
          </div>
          <ul className="space-y-2">
            {infrastructure.map((location, index) => (
              <LocationButton
                key={location.id}
                location={location}
                isSelected={selectedLocation?.id === location.id}
                isVisited={visitedLocations.includes(location.id)}
                onSelect={handleSelect}
                index={index}
              />
            ))}
          </ul>
        </section>
      </div>

      {/* Fun footer */}
      <div className="p-3 bg-[var(--color-sand)] border-t-2 border-dashed border-[var(--color-sunny)]">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐠
          </motion.span>
          <span className="font-medium">Keep exploring!</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            🌊
          </motion.span>
        </div>
      </div>
    </aside>
  );
}

function LocationButton({
  location,
  isSelected,
  isVisited,
  onSelect,
  index,
}: {
  location: Location;
  isSelected: boolean;
  isVisited: boolean;
  onSelect: (location: Location) => void;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        onClick={() => onSelect(location)}
        className={`location-card w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all focus-visible:ring-2 focus-visible:ring-[--color-aqua] focus-visible:outline-none ${
          isSelected
            ? 'bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)] text-white shadow-lg border-2 border-white'
            : isVisited
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300'
              : 'bg-white border-2 border-gray-100 hover:border-[var(--color-aqua)] hover:shadow-md'
        }`}
      >
        {/* Icon with fun background */}
        <motion.span
          className={`relative w-12 h-12 flex items-center justify-center rounded-xl text-2xl ${
            isSelected
              ? 'bg-white/20'
              : isVisited
                ? 'bg-green-100'
                : 'bg-gray-100'
          }`}
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {location.icon}
          {isVisited && !isSelected && (
            <motion.span
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              ✓
            </motion.span>
          )}
        </motion.span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-[var(--color-navy)]'}`}>
              {location.name}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
              style={!isSelected ? { backgroundColor: `${location.color}20`, color: location.color } : {}}
            >
              {location.category}
            </span>
          </div>
        </div>

        {/* Arrow indicator */}
        <motion.span
          className={`text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}
          animate={isSelected ? { x: [0, 5, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.span>
      </button>
    </motion.li>
  );
}
