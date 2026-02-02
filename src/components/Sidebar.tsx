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
    <aside aria-label="Location navigation" className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
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
        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors focus-visible:ring-2 focus-visible:ring-[--color-aqua] focus-visible:outline-none ${
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
              <span aria-label="Visited" className="text-xs text-green-500">✓</span>
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
