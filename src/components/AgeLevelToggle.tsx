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

  // Get color theme based on age level
  const getLevelColors = () => {
    switch (ageLevel) {
      case 'k2':
        return 'from-pink-100 to-rose-100 border-pink-300';
      case 'grades35':
        return 'from-blue-100 to-cyan-100 border-blue-300';
      case 'grades68':
        return 'from-purple-100 to-indigo-100 border-purple-300';
      default:
        return 'from-gray-100 to-gray-200 border-gray-300';
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${getLevelColors()} rounded-full text-sm font-bold transition-all border-2 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)] focus-visible:ring-offset-2`}
        aria-label={`Current level: ${currentConfig.label} ${currentConfig.title}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <motion.span
          aria-hidden="true"
          className="text-lg"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentConfig.icon}
        </motion.span>
        <span className="text-[var(--color-navy)]">{currentConfig.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
          className="text-gray-500"
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
            className="absolute right-0 top-full mt-2 bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-xl border-2 border-[var(--color-aqua)]/30 overflow-hidden z-50 min-w-[220px]"
            role="listbox"
            aria-label="Select age level"
          >
            {/* Header */}
            <div className="px-4 py-2 bg-gradient-to-r from-[var(--color-aqua)]/20 to-[var(--color-teal)]/20 border-b border-[var(--color-aqua)]/20">
              <p className="text-xs font-bold text-[var(--color-navy)] flex items-center gap-1">
                <span>🎓</span> Choose Your Level
              </p>
            </div>

            {ageLevels.map((level, index) => {
              const config = ageLevelConfig[level];
              const isActive = level === ageLevel;
              const levelColors = {
                k2: 'from-pink-50 to-rose-50 border-pink-200',
                grades35: 'from-blue-50 to-cyan-50 border-blue-200',
                grades68: 'from-purple-50 to-indigo-50 border-purple-200',
              };
              return (
                <motion.button
                  key={level}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setAgeLevel(level);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={isActive}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all focus:outline-none ${
                    isActive
                      ? 'bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)] text-white'
                      : `hover:bg-gradient-to-r hover:${levelColors[level]} border-l-4 border-transparent hover:border-l-4 hover:border-[var(--color-aqua)]`
                  }`}
                >
                  <motion.span
                    aria-hidden="true"
                    className="text-2xl"
                    animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                  >
                    {config.icon}
                  </motion.span>
                  <div className="flex-1">
                    <span className="font-bold block">{config.label}</span>
                    <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {config.title}
                    </span>
                  </div>
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-[var(--color-teal)] text-xs font-bold shadow"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
