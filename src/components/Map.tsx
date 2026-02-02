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
