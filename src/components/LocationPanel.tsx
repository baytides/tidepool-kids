'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Location, AgeLevel, QuizData, SortingData } from '@/types';
import { getContent } from '@/utils/ageContent';
import { ActivityQuiz } from './ActivityQuiz';
import { ActivitySorting } from './ActivitySorting';
import { CoralDialogue } from './CoralDialogue';
import { Confetti, Sparkles } from './Confetti';

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
  const [showCelebration, setShowCelebration] = useState(false);
  const [justCollected, setJustCollected] = useState<string | null>(null);

  const handleActivityComplete = (correct: number, total: number) => {
    setActivityCompleted(true);
    setActivityScore({ correct, total });
    // Award points: 5 per correct answer + 10 bonus for perfect
    const points = correct * 5 + (correct === total ? 10 : 0);
    addPoints(points);
    // Show celebration for good scores
    if (correct >= total / 2) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleCollectCreature = (creatureId: string) => {
    if (!collectedCreatures.includes(creatureId)) {
      collectCreature(creatureId);
      setJustCollected(creatureId);
      setTimeout(() => setJustCollected(null), 1500);
    }
  };

  const { content } = selectedLocation;
  const hasCreatures = content.creatures && content.creatures.length > 0;
  const hasSteps = content.howItWorks && content.howItWorks.length > 0;
  const hasActivity = !!content.activity;

  return (
    <AnimatePresence>
      <motion.div
        key={selectedLocation.id}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="h-full bg-gradient-to-b from-white to-blue-50 flex flex-col overflow-hidden"
      >
        {/* Celebration effects */}
        {showCelebration && <Confetti active={true} pieceCount={50} useEmojis={true} />}

        {/* Header */}
        <div className="flex items-start gap-4 p-6 border-b-2 border-dashed border-[var(--color-aqua)]/30 bg-gradient-to-r from-white to-blue-50">
          <motion.button
            onClick={() => selectLocation(null)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-coral)] text-white shadow-md hover:shadow-lg transition-shadow"
            aria-label="Close location details"
          >
            ✕
          </motion.button>
          <div className="flex items-center gap-4 flex-1">
            <motion.span
              className="text-5xl drop-shadow-md"
              animate={{
                y: [0, -5, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {selectedLocation.icon}
            </motion.span>
            <div>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-block px-3 py-1 text-xs font-bold rounded-full text-white mb-1 shadow-sm"
                style={{ background: selectedLocation.color }}
              >
                {selectedLocation.category}
              </motion.span>
              <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)]">
                {content.title}
              </h2>
              <p className="text-gray-500 italic text-sm">{getContent(content.tagline, ageLevel)}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 py-3 bg-[var(--color-sand)]/50">
          <TabButton tab="discover" active={activeTab} onClick={setActiveTab} emoji="🔍">
            Discover
          </TabButton>
          {(hasCreatures || hasSteps) && (
            <TabButton tab="explore" active={activeTab} onClick={setActiveTab} emoji="🌊">
              Explore
            </TabButton>
          )}
          {hasActivity && (
            <TabButton tab="play" active={activeTab} onClick={setActiveTab} emoji="🎮">
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
                  initial={{ opacity: 0, y: 10, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className="flex gap-4 p-5 bg-gradient-to-br from-amber-50 to-yellow-100 border-3 border-[var(--color-sunny)] rounded-2xl shadow-md relative overflow-hidden"
                >
                  {/* Decorative sparkles */}
                  <motion.span
                    className="absolute top-2 right-2 text-lg opacity-60"
                    animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>

                  <motion.span
                    className="text-3xl"
                    animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💡
                  </motion.span>
                  <div>
                    <strong className="text-amber-800 font-[family-name:var(--font-fredoka)] text-lg">Did you know?</strong>
                    <p className="text-amber-700 text-sm leading-relaxed mt-1">{getContent(content.funFacts[0], ageLevel)}</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'explore' && hasCreatures && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <motion.span
                  className="text-2xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🦀
                </motion.span>
                <h3 className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)]">
                  Meet the Creatures
                </h3>
                <span className="ml-auto text-sm bg-[var(--color-aqua)]/20 text-[var(--color-teal)] px-2 py-1 rounded-full font-medium">
                  {content.creatures!.filter(c => collectedCreatures.includes(c.id)).length}/{content.creatures!.length} collected
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {content.creatures!.map((creature) => {
                  const isCollected = collectedCreatures.includes(creature.id);
                  const isJustCollected = justCollected === creature.id;
                  return (
                    <motion.button
                      key={creature.id}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleCollectCreature(creature.id)}
                      aria-label={isCollected ? `${creature.name} - collected` : `Collect ${creature.name}`}
                      className={`relative p-4 rounded-2xl text-left transition-all shadow-md hover:shadow-lg ${
                        isCollected
                          ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-3 border-green-300'
                          : 'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-[var(--color-aqua)]'
                      }`}
                    >
                      {/* Sparkle effect on collection */}
                      {isJustCollected && <Sparkles active={true} />}

                      <div className="flex items-center gap-2 mb-2">
                        <motion.span
                          className="text-4xl drop-shadow-sm"
                          animate={isCollected ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {creature.emoji}
                        </motion.span>
                        <span className="font-bold text-[var(--color-navy)]">{creature.name}</span>
                        {isCollected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs shadow"
                          >
                            ✓
                          </motion.span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{getContent(creature.fact, ageLevel)}</p>

                      {/* Collect hint */}
                      {!isCollected && (
                        <motion.div
                          className="absolute bottom-2 right-2 text-xs text-[var(--color-coral)] font-medium"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Tap to collect!
                        </motion.div>
                      )}
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
                  className="text-center py-8 relative"
                >
                  {/* Trophy/star with animation */}
                  <motion.div
                    className="text-7xl mb-4"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {activityScore?.correct === activityScore?.total ? '🏆' : '⭐'}
                  </motion.div>

                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-2"
                  >
                    {activityScore?.correct === activityScore?.total ? 'Perfect Score!' : 'Activity Complete!'}
                  </motion.h3>

                  {/* Animated score display */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)] text-white px-4 py-2 rounded-full mb-3"
                  >
                    <span className="font-bold text-lg">{activityScore?.correct}</span>
                    <span className="text-white/80">/</span>
                    <span className="font-bold text-lg">{activityScore?.total}</span>
                    <span className="text-sm">correct!</span>
                  </motion.div>

                  {/* Points earned with animation */}
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg font-bold text-[var(--color-sunny)] mb-4"
                  >
                    +{(activityScore?.correct || 0) * 5 + (activityScore?.correct === activityScore?.total ? 10 : 0)} points earned! ⭐
                  </motion.p>

                  {/* Animated creatures cheering */}
                  <div className="flex justify-center gap-3 mb-4">
                    {['🦀', '🐠', '🐙'].map((emoji, i) => (
                      <motion.span
                        key={i}
                        className="text-3xl"
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 15, -15, 0]
                        }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>

                  <motion.button
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActivityCompleted(false);
                      setActivityScore(null);
                      setShowCelebration(false);
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-sunny)] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Play Again! 🎮
                  </motion.button>
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
  emoji,
  children,
}: {
  tab: Tab;
  active: Tab;
  onClick: (tab: Tab) => void;
  emoji: string;
  children: React.ReactNode;
}) {
  const isActive = active === tab;

  return (
    <motion.button
      onClick={() => onClick(tab)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
        isActive
          ? 'bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)] text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200 hover:border-[var(--color-aqua)]'
      }`}
    >
      <motion.span
        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {emoji}
      </motion.span>
      {children}
    </motion.button>
  );
}
