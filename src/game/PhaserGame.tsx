'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Game } from 'phaser';
import { gameConfig } from './config';
import { EventBus } from './EventBus';

export interface PhaserGameRef {
  game: Game | null;
  scene: Phaser.Scene | null;
}

interface PhaserGameProps {
  onSceneReady?: () => void;
  onLocationSelected?: (locationId: string) => void;
}

export const PhaserGame = forwardRef<PhaserGameRef, PhaserGameProps>(
  function PhaserGame({ onSceneReady, onLocationSelected }, ref) {
    const gameRef = useRef<Game | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [announcement, setAnnouncement] = useState('');

    useImperativeHandle(ref, () => ({
      game: gameRef.current,
      scene: gameRef.current?.scene.getScene('MapScene') ?? null,
    }));

    useEffect(() => {
      // Only create game on client side
      if (typeof window === 'undefined') return;
      if (gameRef.current) return;

      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      EventBus.emit('set-reduced-motion', prefersReducedMotion);

      // Create game instance
      gameRef.current = new Game({
        ...gameConfig,
        parent: containerRef.current ?? 'phaser-game',
      });

      // Set up event listeners
      const handleSceneReady = () => {
        onSceneReady?.();
        setAnnouncement('Bay Area map loaded. Use arrow keys to navigate between locations, Enter to select.');
      };

      const handleLocationSelected = (locationId: string) => {
        setAnnouncement(`Selected location. Press Enter to explore.`);
        onLocationSelected?.(locationId);
      };

      const handleLocationFocused = (locationId: string, locationName: string) => {
        setAnnouncement(locationName);
      };

      EventBus.on('map-scene-ready', handleSceneReady);
      EventBus.on('location-selected', handleLocationSelected);
      EventBus.on('location-focused', handleLocationFocused);

      return () => {
        EventBus.off('map-scene-ready', handleSceneReady);
        EventBus.off('location-selected', handleLocationSelected);
        EventBus.off('location-focused', handleLocationFocused);

        if (gameRef.current) {
          gameRef.current.destroy(true);
          gameRef.current = null;
        }
      };
    }, [onSceneReady, onLocationSelected]);

    // Keyboard navigation handler for canvas
    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          EventBus.emit('navigate-next');
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          EventBus.emit('navigate-prev');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          EventBus.emit('select-focused-node');
          break;
      }
    };

    return (
      <div className="relative w-full h-full">
        {/* ARIA live region for announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {announcement}
        </div>

        {/* Accessible game container */}
        <div
          ref={containerRef}
          id="phaser-game"
          className="w-full h-full"
          role="application"
          aria-label="Interactive Bay Area map. Use arrow keys to navigate locations, Enter to select."
          tabIndex={0}
          onKeyDown={handleKeyDown}
        />

        {/* Skip link for keyboard users */}
        <a
          href="#right-panel"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-2 focus:rounded focus:shadow-lg"
        >
          Skip to location details
        </a>
      </div>
    );
  }
);
