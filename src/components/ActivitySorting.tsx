'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SortingData, AgeLevel } from '@/types';

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

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6"
      >
        <div className="text-6xl mb-4">{isPerfect ? '🎉' : '⭐'}</div>
        <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
          {isPerfect ? 'Perfect Sorting!' : 'Sorting Complete!'}
        </h3>
        <p className="text-lg text-gray-600 mb-4">
          You sorted {correctCount} out of {data.items.length} correctly!
        </p>
        <p className="text-sm text-[var(--color-teal)]">
          +{correctCount * 5 + (isPerfect ? 10 : 0)} points earned!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="p-4">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          {remainingItems.length} items left to sort
        </span>
        <div className="flex gap-1">
          {data.items.map((item, i) => (
            <div
              key={item.id}
              className={`w-2 h-2 rounded-full ${
                placedItems.find(p => p.itemId === item.id)
                  ? 'bg-[var(--color-teal)]'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bins */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {data.bins.map(bin => (
          <div
            key={bin.id}
            onClick={() => handleBinTap(bin.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(bin.id)}
            className={`min-h-[120px] p-3 rounded-xl border-2 border-dashed transition-all ${
              selectedItem || draggedItem
                ? 'border-[var(--color-teal)] bg-[var(--color-sand)]/50 cursor-pointer'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="text-center mb-2">
              <span className="text-2xl">{bin.icon}</span>
              <p className="text-sm font-medium text-[var(--color-navy)]">{bin.label}</p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              {getItemsInBin(bin.id).map(item => {
                const isCorrect = item.correctBin === bin.id;
                return (
                  <motion.span
                    key={item.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`text-xl ${!isCorrect && showResults ? 'opacity-50' : ''}`}
                    title={item.label}
                  >
                    {item.emoji}
                  </motion.span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center p-2 rounded-lg mb-3 ${
              feedback.correct
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {feedback.correct ? '✅ Correct!' : '🤔 Try a different bin!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items to sort */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xs text-gray-500 mb-2 text-center">
          {selectedItem ? 'Now tap a bin to place it' : 'Tap an item to select it'}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {remainingItems.map(item => (
            <motion.button
              key={item.id}
              layout
              onClick={() => handleItemTap(item.id)}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragEnd={handleDragEnd}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${
                selectedItem === item.id
                  ? 'bg-[var(--color-teal)] text-white shadow-lg scale-105'
                  : 'bg-white border border-gray-200 hover:border-[var(--color-teal)]'
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
