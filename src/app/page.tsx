'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import { RightPanel } from '@/components/RightPanel';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store/useAppStore';
import { locations } from '@/data/locations';
import type { PhaserGameRef } from '@/game/PhaserGame';

// Dynamically import PhaserGame to avoid SSR issues with Phaser
const PhaserGame = dynamic(
  () => import('@/game/PhaserGame').then(mod => mod.PhaserGame),
  {
    ssr: false,
    loading: () => null, // We handle loading state ourselves for animation control
  }
);

export default function Home() {
  const phaserRef = useRef<PhaserGameRef>(null);
  const [gameReady, setGameReady] = useState(false);
  const { selectLocation } = useAppStore();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference on client
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleSceneReady = useCallback(() => {
    setGameReady(true);
  }, []);

  const handleLocationSelected = useCallback((locationId: string) => {
    const location = locations.find(l => l.id === locationId);
    if (location) {
      selectLocation(location);
    }
  }, [selectLocation]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Skip to main content link - WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      <Header />

      <main
        id="main-content"
        className="flex-1 flex pt-16 overflow-hidden"
        role="main"
      >
        {/* Phaser Game Canvas - 70% width */}
        <section
          className="flex-[7] relative bg-sky-100"
          aria-label="Interactive Bay Area map"
        >
          <PhaserGame
            ref={phaserRef}
            onSceneReady={handleSceneReady}
            onLocationSelected={handleLocationSelected}
          />
          {!gameReady && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-sky-200"
              role="status"
              aria-label="Loading map"
            >
              <div className="text-center">
                <div
                  className={`text-4xl mb-4 ${prefersReducedMotion ? '' : 'animate-bounce'}`}
                  aria-hidden="true"
                >
                  🦀
                </div>
                <p className="text-lg text-sky-700">Loading map...</p>
              </div>
            </div>
          )}
        </section>

        {/* Right Panel - 30% width */}
        <RightPanel />
      </main>
    </div>
  );
}
