'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SortingData, AgeLevel } from '@/types';
import { Sparkles, Confetti } from './Confetti';

interface ActivitySortingProps {
  data: SortingData;
  ageLevel: AgeLevel | null;
  onComplete: (correct: number, total: number) => void;
}

interface PlacedItem {
  itemId: string;
  binId: string;
}

export function ActivitySorting({ data, ageLevel, onComplete }: ActivitySortingProps) {
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState<{ itemId: string; correct: boolean } | null>(null);

  const remainingItems = data.items.filter(
    item => !placedItems.find(p => p.itemId === item.id)
  );

  const getItemsInBin = (binId: string) => {
    return placedItems
      .filter(p => p.binId === binId)
      .map(p => data.items.find(i => i.id === p.itemId)!)
      .filter(Boolean);
  };

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
    setFeedback(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = useCallback((binId: string) => {
    if (!draggedItem) return;

    const item = data.items.find(i => i.id === draggedItem);
    if (!item) return;

    const isCorrect = item.correctBin === binId;

    setPlacedItems(prev => [...prev, { itemId: draggedItem, binId }]);
    setFeedback({ itemId: draggedItem, correct: isCorrect });
    setDraggedItem(null);

    // Check if all items placed
    if (placedItems.length + 1 === data.items.length) {
      setTimeout(() => {
        setShowResults(true);
        const correctCount = [...placedItems, { itemId: draggedItem, binId }]
          .filter(p => {
            const i = data.items.find(item => item.id === p.itemId);
            return i && i.correctBin === p.binId;
          }).length;
        onComplete(correctCount, data.items.length);
      }, 1000);
    }
  }, [draggedItem, data.items, placedItems, onComplete]);

  // Touch-friendly tap to select, then tap bin to place
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemTap = (itemId: string) => {
    setSelectedItem(itemId === selectedItem ? null : itemId);
    setFeedback(null);
  };

  const handleBinTap = (binId: string) => {
    const itemId = selectedItem || draggedItem;
    if (!itemId) return;

    const item = data.items.find(i => i.id === itemId);
    if (!item) return;

    const isCorrect = item.correctBin === binId;

    setPlacedItems(prev => [...prev, { itemId, binId }]);
    setFeedback({ itemId, correct: isCorrect });
    setSelectedItem(null);
    setDraggedItem(null);

    // Check completion
    if (placedItems.length + 1 === data.items.length) {
      setTimeout(() => {
        setShowResults(true);
        const correctCount = [...placedItems, { itemId, binId }]
          .filter(p => {
            const i = data.items.find(item => item.id === p.itemId);
            return i && i.correctBin === p.binId;
          }).length;
        onComplete(correctCount, data.items.length);
      }, 1000);
    }
  };

  if (showResults) {
    const correctCount = placedItems.filter(p => {
      const item = data.items.find(i => i.id === p.itemId);
      return item && item.correctBin === p.binId;
    }).length;
    const isPerfect = correctCount === data.items.length;
    const isGreat = correctCount >= data.items.length * 0.7;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 relative"
      >
        {/* Celebration effects */}
        {isPerfect && <Confetti active={true} pieceCount={40} useEmojis={true} />}
        {isGreat && !isPerfect && <Sparkles active={true} />}

        {/* Animated trophy/star */}
        <motion.div
          className="text-7xl mb-4"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -10, 10, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isPerfect ? '🏆' : isGreat ? '🌟' : '⭐'}
        </motion.div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-[family-name:var(--font-fredoka)] text-2xl text-[var(--color-navy)] mb-3"
        >
          {isPerfect ? 'Perfect Sorting! Amazing!' : isGreat ? 'Great Job!' : 'Sorting Complete!'}
        </motion.h3>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 mb-4"
        >
          You sorted <span className="font-bold text-[var(--color-teal)]">{correctCount}</span> out of <span className="font-bold">{data.items.length}</span> correctly!
        </motion.p>

        {/* Animated score indicators */}
        <div className="flex justify-center gap-2 mb-4">
          {data.items.map((item, i) => {
            const placed = placedItems.find(p => p.itemId === item.id);
            const isCorrect = placed && item.correctBin === placed.binId;
            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                  isCorrect ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gray-300'
                }`}
              >
                {isCorrect ? '✓' : ''}
              </motion.div>
            );
          })}
        </div>

        {/* Points earned */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-sunny)] to-amber-400 text-white px-5 py-2 rounded-full shadow-lg"
        >
          <span className="text-xl">⭐</span>
          <span className="font-bold text-lg">+{correctCount * 5 + (isPerfect ? 10 : 0)} points!</span>
        </motion.div>

        {/* Cheering creatures */}
        <div className="flex justify-center gap-3 mt-4">
          {['🐙', '🦀', '🐠', '🐚'].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-4 relative">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4 bg-white rounded-xl p-3 shadow-sm border-2 border-gray-100">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📦
          </motion.span>
          <span className="text-sm font-medium text-[var(--color-navy)]">
            {remainingItems.length} items left
          </span>
        </div>
        <div className="flex gap-2">
          {data.items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-4 h-4 rounded-full transition-all shadow-sm ${
                placedItems.find(p => p.itemId === item.id)
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bins */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        {data.bins.map((bin, index) => (
          <motion.div
            key={bin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -3 }}
            onClick={() => handleBinTap(bin.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(bin.id)}
            className={`min-h-[140px] p-4 rounded-2xl border-3 border-dashed transition-all shadow-md cursor-pointer ${
              selectedItem || draggedItem
                ? 'border-[var(--color-teal)] bg-gradient-to-br from-[var(--color-aqua)]/20 to-[var(--color-teal)]/20 shadow-lg'
                : 'border-gray-300 bg-gradient-to-br from-gray-50 to-white hover:border-[var(--color-aqua)]'
            }`}
          >
            <div className="text-center mb-3">
              <motion.span
                className="text-3xl block mb-1"
                animate={(selectedItem || draggedItem) ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {bin.icon}
              </motion.span>
              <p className="text-sm font-bold text-[var(--color-navy)]">{bin.label}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {getItemsInBin(bin.id).map(item => {
                const isCorrect = item.correctBin === bin.id;
                return (
                  <motion.span
                    key={item.id}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className={`text-2xl drop-shadow-sm ${!isCorrect && showResults ? 'opacity-50' : ''}`}
                    title={item.label}
                  >
                    {item.emoji}
                  </motion.span>
                );
              })}
            </div>
            {(selectedItem || draggedItem) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[var(--color-teal)] text-center mt-2 font-medium"
              >
                Drop here!
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className={`text-center p-4 rounded-2xl mb-4 shadow-md ${
              feedback.correct
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300'
                : 'bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300'
            }`}
          >
            <motion.span
              className="text-2xl inline-block mr-2"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3 }}
            >
              {feedback.correct ? '🎉' : '💭'}
            </motion.span>
            <span className={`font-bold ${feedback.correct ? 'text-green-700' : 'text-amber-700'}`}>
              {feedback.correct ? 'Awesome! That\'s correct!' : 'Hmm, try a different bin!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items to sort */}
      <motion.div
        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-5 border-2 border-[var(--color-aqua)]/30 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <motion.span
            className="text-xl"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            👆
          </motion.span>
          <p className="text-sm font-medium text-[var(--color-navy)]">
            {selectedItem ? 'Now tap a bin above!' : 'Tap an item to select it'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {remainingItems.map((item, index) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemTap(item.id)}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragEnd={handleDragEnd}
              className={`px-4 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-md ${
                selectedItem === item.id
                  ? 'bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)] text-white shadow-lg ring-4 ring-[var(--color-teal)]/30'
                  : 'bg-white border-2 border-gray-200 hover:border-[var(--color-aqua)] hover:shadow-lg'
              }`}
            >
              <motion.span
                className="text-2xl"
                animate={selectedItem === item.id ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {item.emoji}
              </motion.span>
              <span className="text-sm font-bold">{item.label}</span>
            </motion.button>
          ))}
        </div>
        {remainingItems.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-4"
          >
            All items sorted! Great job! 🎉
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
