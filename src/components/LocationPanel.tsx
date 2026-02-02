'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Location, AgeLevel, QuizData, SortingData } from '@/types';
import { getContent } from '@/utils/ageContent';
import { ActivityQuiz } from './ActivityQuiz';
import { ActivitySorting } from './ActivitySorting';
import { CoralDialogue } from './CoralDialogue';

type Tab = 'discover' | 'explore' | 'play';

export function LocationPanel() {
  const { selectedLocation, selectLocation, collectCreature, collectedCreatures, ageLevel, addPoints } = useAppStore();

  if (!selectedLocation) return null;

  // Render LocationPanelContent with key to reset state when location changes
  return (
    <LocationPanelContent
      key={selectedLocation.id}
      selectedLocation={selectedLocation}
      selectLocation={selectLocation}
      collectCreature={collectCreature}
      collectedCreatures={collectedCreatures}
      ageLevel={ageLevel}
      addPoints={addPoints}
    />
  );
}

function LocationPanelContent({
  selectedLocation,
  selectLocation,
  collectCreature,
  collectedCreatures,
  ageLevel,
  addPoints,
}: {
  selectedLocation: Location;
  selectLocation: (location: Location | null) => void;
  collectCreature: (creatureId: string) => void;
  collectedCreatures: string[];
  ageLevel: AgeLevel | null;
  addPoints: (points: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<Tab>('discover');
  const [activityCompleted, setActivityCompleted] = useState(false);
  const [activityScore, setActivityScore] = useState<{ correct: number; total: number } | null>(null);

  const handleActivityComplete = (correct: number, total: number) => {
    setActivityCompleted(true);
    setActivityScore({ correct, total });
    // Award points: 5 per correct answer + 10 bonus for perfect
    const points = correct * 5 + (correct === total ? 10 : 0);
    addPoints(points);
  };

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
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)]">
                {content.title}
              </h2>
              <p className="text-gray-500 italic">{getContent(content.tagline, ageLevel)}</p>
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
              {/* Coral's intro */}
              <CoralDialogue message={content.coralIntro} variant="speech" />

              <section>
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)] mb-2">
                  What is this place?
                </h3>
                <p className="text-gray-700 leading-relaxed">{getContent(content.description, ageLevel)}</p>
              </section>

              <section>
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)] mb-2">
                  Why does it matter?
                </h3>
                <p className="text-gray-700 leading-relaxed">{getContent(content.whyItMatters, ageLevel)}</p>
              </section>

              {content.funFacts && content.funFacts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl"
                >
                  <span className="text-2xl">💡</span>
                  <div>
                    <strong className="text-amber-800">Did you know?</strong>
                    <p className="text-amber-700 text-sm">{getContent(content.funFacts[0], ageLevel)}</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'explore' && hasCreatures && (
            <div>
              <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)] mb-4">
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
                      <p className="text-sm text-gray-600">{getContent(creature.fact, ageLevel)}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'explore' && hasSteps && (
            <div>
              <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)] mb-4">
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
                    <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-aqua)] text-white font-bold rounded-full flex-shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="font-semibold text-[var(--color-navy)]">{step.title}</h4>
                      <p className="text-sm text-gray-600">{getContent(step.description, ageLevel)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'play' && hasActivity && (
            <div>
              {activityCompleted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">
                    {activityScore?.correct === activityScore?.total ? '🏆' : '⭐'}
                  </div>
                  <h3 className="font-[family-name:var(--font-fredoka)] text-xl text-[var(--color-navy)] mb-2">
                    Activity Complete!
                  </h3>
                  <p className="text-gray-600 mb-2">
                    You scored {activityScore?.correct} out of {activityScore?.total}
                  </p>
                  <p className="text-sm text-[var(--color-teal)] mb-4">
                    +{(activityScore?.correct || 0) * 5 + (activityScore?.correct === activityScore?.total ? 10 : 0)} points earned!
                  </p>
                  <button
                    onClick={() => {
                      setActivityCompleted(false);
                      setActivityScore(null);
                    }}
                    className="px-6 py-2 bg-[var(--color-teal)] text-white rounded-full font-medium hover:bg-[var(--color-teal)]/90"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Coral's activity intro */}
                  <div className="mb-4">
                    <CoralDialogue
                      message={{
                        k2: "Yay! Game time! Let's play and learn!",
                        grades35: "Ready for a challenge? This activity will test what you've learned!",
                        grades68: "Apply your knowledge with this interactive activity.",
                      }}
                      variant="excited"
                    />
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="font-[family-name:var(--font-fredoka)] text-xl text-[var(--color-navy)] mb-1">
                      {content.activity!.title}
                    </h3>
                    <p className="text-sm text-gray-600">{getContent(content.activity!.instructions, ageLevel)}</p>
                  </div>

                  {content.activity!.type === 'quiz' && (
                    <ActivityQuiz
                      data={content.activity!.data as QuizData}
                      ageLevel={ageLevel}
                      onComplete={handleActivityComplete}
                    />
                  )}

                  {content.activity!.type === 'sorting' && (
                    <ActivitySorting
                      data={content.activity!.data as SortingData}
                      ageLevel={ageLevel}
                      onComplete={handleActivityComplete}
                    />
                  )}

                  {content.activity!.type !== 'quiz' && content.activity!.type !== 'sorting' && (
                    <div className="text-center py-8">
                      <span className="text-4xl mb-4 block">🎮</span>
                      <p className="text-gray-500">This activity type is coming soon!</p>
                    </div>
                  )}
                </>
              )}
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
          ? 'bg-[var(--color-navy)] text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
