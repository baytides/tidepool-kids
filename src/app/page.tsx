'use client';

import { Header } from '@/components/Header';
import dynamic from 'next/dynamic';

// Dynamically import PhaserGame to avoid SSR issues
const PhaserGame = dynamic(() => import('@/game/PhaserGame').then(mod => mod.PhaserGame), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-sky-200">
      <div className="text-center">
        <div className="text-4xl mb-2">🦀</div>
        <p className="text-navy-600 font-display">Loading map...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main
        id="main-content"
        className="flex-1 flex pt-16 overflow-hidden"
        role="main"
      >
        {/* Phaser Game Canvas - 70% width */}
        <div
          className="w-[70%] relative"
          role="application"
          aria-label="Interactive Bay Area exploration map"
        >
          <PhaserGame />
        </div>

        {/* Right Panel - 30% width */}
        <aside
          className="w-[30%] bg-white border-l-2 border-gray-200 overflow-y-auto"
          role="complementary"
          aria-label="Location details and activities"
        >
          {/* Placeholder - RightPanel component will be created in Task 1.8 */}
          <div className="p-6">
            <h2 className="text-xl font-display text-navy-800 mb-4">
              Welcome to Tide Pool Kids!
            </h2>
            <p className="text-gray-600 mb-4">
              Click on a location on the map to explore the Bay Area&apos;s amazing ecosystems.
            </p>
            <div className="bg-aqua-50 rounded-lg p-4 border-2 border-aqua-200">
              <p className="text-sm text-aqua-800">
                🦀 Coral says: &quot;Let&apos;s go exploring!&quot;
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
