'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AgeLevel } from '@/types';
import { ageLevelConfig } from '@/utils/ageContent';

const ageLevels: AgeLevel[] = ['k2', 'grades35', 'grades68'];

export function AgeLevelToggle() {
  const { ageLevel, setAgeLevel } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Don't render during SSR or before hydration
  if (!mounted) return null;

  // Don't render if no age level set (modal should be showing)
  if (!ageLevel) return null;

  const currentConfig = ageLevelConfig[ageLevel];

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-sand)] rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-sand)]/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)] focus-visible:ring-offset-2"
        aria-label={`Current level: ${currentConfig.label} ${currentConfig.title}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span aria-hidden="true">{currentConfig.icon}</span>
        <span>{currentConfig.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          ▾
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 min-w-[180px]"
            role="listbox"
            aria-label="Select age level"
          >
            {ageLevels.map((level) => {
              const config = ageLevelConfig[level];
              const isActive = level === ageLevel;
              return (
                <button
                  key={level}
                  onClick={() => {
                    setAgeLevel(level);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={isActive}
                  className={`w-full flex items-center gap-2 px-4 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:bg-gray-100 ${
                    isActive
                      ? 'bg-[var(--color-aqua)] text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span aria-hidden="true">{config.icon}</span>
                  <span className="font-medium">{config.label}</span>
                  <span className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-400'}`}>
                    ({config.title})
                  </span>
                  {isActive && (
                    <span className="ml-auto" aria-hidden="true">✓</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
