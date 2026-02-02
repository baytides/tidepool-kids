'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '@/data/locations';
import { useAppStore } from '@/store/useAppStore';
import { FloatingBubbles, SwimmingFish } from './Confetti';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Check token validity synchronously to avoid flash of incorrect UI
const isTokenInvalid = !mapboxgl.accessToken || mapboxgl.accessToken === 'your_mapbox_token_here';

export function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const [mapError, setMapError] = useState(isTokenInvalid);

  const { selectedLocation, selectLocation, markVisited } = useAppStore();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Check if we have a valid token
    if (!mapboxgl.accessToken || mapboxgl.accessToken === 'your_mapbox_token_here') {
      setMapError(true);
      return;
    }

    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc) => bounds.extend(loc.coordinates));

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        bounds: bounds,
        fitBoundsOptions: { padding: 60 },
      });

      map.current.on('error', () => {
        setMapError(true);
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
        el.style.transformOrigin = 'center center';

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.15)';
          el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
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

    } catch (error) {
      setMapError(true);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [selectLocation, markVisited]);

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
    <div className="relative w-full h-full overflow-hidden">
      {mapError ? (
        // Fun animated fallback when map fails to load
        <div className="w-full h-full bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-100 flex items-center justify-center relative">
          {/* Animated background elements */}
          <FloatingBubbles count={15} />
          <SwimmingFish />

          {/* Waves at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(38, 198, 218, 0.3) 100%)',
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 relative z-10"
          >
            {/* Animated map icon */}
            <motion.div
              className="text-8xl mb-6"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🗺️
            </motion.div>

            <motion.h3
              className="font-[family-name:var(--font-fredoka)] text-3xl text-[var(--color-navy)] mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Explore the Bay Area!
            </motion.h3>

            <motion.p
              className="text-lg text-gray-600 max-w-xs mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Pick a spot from the Adventure Map to start your journey!
            </motion.p>

            {/* Animated creatures */}
            <div className="flex justify-center gap-4 mt-4">
              {['🦀', '🐠', '🐙', '🦈', '🐚'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-full" />
      )}

      <AnimatePresence>
        {!selectedLocation && !mapError && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-6 flex items-center gap-4 max-w-sm border-4 border-[var(--color-aqua)]"
          >
            {/* Animated mascot */}
            <motion.div className="relative">
              <motion.img
                src="/assets/images/crab-mascot.png"
                alt="Coral"
                width={80}
                height={80}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              {/* Speech bubble indicator */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-sunny)] rounded-full flex items-center justify-center text-sm"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                💬
              </motion.div>
            </motion.div>

            <div>
              <motion.h2
                className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hi, I&apos;m Coral!
              </motion.h2>
              <motion.p
                className="text-sm text-gray-600"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Tap a pin to explore the Bay with me! 🌊
              </motion.p>

              {/* Animated hint */}
              <motion.div
                className="flex items-center gap-1 mt-2 text-xs text-[var(--color-aqua)]"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <span>Click a location</span>
                <span>→</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
