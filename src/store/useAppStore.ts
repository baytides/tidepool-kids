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
