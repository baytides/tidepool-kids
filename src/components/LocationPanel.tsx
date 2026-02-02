'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

type Tab = 'discover' | 'explore' | 'play';

export function LocationPanel() {
  const { selectedLocation, selectLocation, collectCreature, collectedCreatures } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('discover');

  // Reset tab state when location changes
  useEffect(() => {
    setActiveTab('discover');
  }, [selectedLocation?.id]);

  if (!selectedLocation) return null;

  const { content } = selectedLocation;
  const hasCreatures = content.creatures && content.creatures.length > 0;
  const hasSteps = content.howItWorks && content.howItWorks.length > 0;
  const hasActivity = !!content.activity;

  return (
    <AnimatePresence>
      <motion.div
        key={selectedLocation.id}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-80 bg-white rounded-t-3xl shadow-2xl max-h-[60vh] flex flex-col z-40"
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b border-gray-100">
          <button
            onClick={() => selectLocation(null)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close location details"
          >
            ✕
          </button>
          <div className="flex items-center gap-4 flex-1">
            <span className="text-4xl">{selectedLocation.icon}</span>
            <div>
              <span
                className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white mb-1"
                style={{ background: selectedLocation.color }}
              >
                {selectedLocation.category}
              </span>
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[--color-navy]">
                {content.title}
              </h2>
              <p className="text-gray-500 italic">{content.tagline}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 py-3 border-b border-gray-100">
          <TabButton tab="discover" active={activeTab} onClick={setActiveTab}>
            Discover
          </TabButton>
          {(hasCreatures || hasSteps) && (
            <TabButton tab="explore" active={activeTab} onClick={setActiveTab}>
              Explore
            </TabButton>
          )}
          {hasActivity && (
            <TabButton tab="play" active={activeTab} onClick={setActiveTab}>
              Play
            </TabButton>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'discover' && (
            <div className="space-y-6">
              <section>
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy] mb-2">
                  What is this place?
                </h3>
                <p className="text-gray-700 leading-relaxed">{content.description}</p>
              </section>

              <section>
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy] mb-2">
                  Why does it matter?
                </h3>
                <p className="text-gray-700 leading-relaxed">{content.whyItMatters}</p>
              </section>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl"
              >
                <span className="text-2xl">💡</span>
                <div>
                  <strong className="text-amber-800">Did you know?</strong>
                  <p className="text-amber-700 text-sm">{content.didYouKnow}</p>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'explore' && hasCreatures && (
            <div>
              <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy] mb-4">
                Meet the Creatures
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {content.creatures!.map((creature) => {
                  const isCollected = collectedCreatures.includes(creature.id);
                  return (
                    <motion.button
                      key={creature.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => collectCreature(creature.id)}
                      aria-label={isCollected ? `${creature.name} - collected` : `Collect ${creature.name}`}
                      className={`p-4 rounded-xl text-left transition-colors ${
                        isCollected
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{creature.emoji}</span>
                        <span className="font-semibold">{creature.name}</span>
                        {isCollected && <span className="text-green-500">✓</span>}
                      </div>
                      <p className="text-sm text-gray-600">{creature.fact}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'explore' && hasSteps && (
            <div>
              <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[--color-navy] mb-4">
                How It Works
              </h3>
              <div className="space-y-4">
                {content.howItWorks!.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-blue-50 rounded-xl"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-[--color-aqua] text-white font-bold rounded-full flex-shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[--color-navy]">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'play' && hasActivity && (
            <div className="text-center py-8">
              <span className="text-6xl mb-4 block">🎮</span>
              <h3 className="font-[family-name:var(--font-fredoka)] text-xl text-[--color-navy] mb-2">
                {content.activity!.title}
              </h3>
              <p className="text-gray-600 mb-6">{content.activity!.instructions}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[--color-pink] text-white font-semibold rounded-full"
              >
                Coming Soon!
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TabButton({
  tab,
  active,
  onClick,
  children,
}: {
  tab: Tab;
  active: Tab;
  onClick: (tab: Tab) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => onClick(tab)}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
        active === tab
          ? 'bg-[--color-navy] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
