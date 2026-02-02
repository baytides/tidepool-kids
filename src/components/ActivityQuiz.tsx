'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizData, AgeLevel } from '@/types';
import { getContent } from '@/utils/ageContent';

interface ActivityQuizProps {
  data: QuizData;
  ageLevel: AgeLevel | null;
  onComplete: (score: number, total: number) => void;
}

export function ActivityQuiz({ data, ageLevel, onComplete }: ActivityQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = data.questions[currentQuestion];
  const totalQuestions = data.questions.length;

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
      onComplete(score + (selectedAnswer === question.correctIndex ? 1 : 0), totalQuestions);
    }
  };

  if (completed) {
    const finalScore = score;
    const isPerfect = finalScore === totalQuestions;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6"
      >
        <div className="text-6xl mb-4">{isPerfect ? '🎉' : '⭐'}</div>
        <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
          {isPerfect ? 'Perfect Score!' : 'Quiz Complete!'}
        </h3>
        <p className="text-lg text-gray-600 mb-4">
          You got {finalScore} out of {totalQuestions} correct!
        </p>
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i < finalScore ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-[var(--color-teal)]">
          +{finalScore * 5 + (isPerfect ? 10 : 0)} points earned!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="p-4">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentQuestion
                  ? 'bg-[var(--color-teal)]'
                  : i === currentQuestion
                  ? 'bg-[var(--color-coral)]'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h4 className="text-lg font-semibold text-[var(--color-navy)] mb-4">
            {getContent(question.question, ageLevel)}
          </h4>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctIndex;
              const showResult = showExplanation;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-500'
                        : isSelected
                        ? 'bg-red-100 border-2 border-red-500'
                        : 'bg-gray-50 border-2 border-transparent'
                      : isSelected
                      ? 'bg-[var(--color-sand)] border-2 border-[var(--color-teal)]'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      showResult && isCorrect
                        ? 'bg-green-500 text-white'
                        : showResult && isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : String.fromCharCode(65 + index)}
                    </span>
                    <span className={showResult && isCorrect ? 'font-medium' : ''}>
                      {getContent(option, ageLevel)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-4 rounded-lg ${
                selectedAnswer === question.correctIndex
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-amber-50 border border-amber-200'
              }`}
            >
              <p className="text-sm">
                <span className="font-medium">
                  {selectedAnswer === question.correctIndex ? '✅ Correct! ' : '💡 '}
                </span>
                {getContent(question.explanation, ageLevel)}
              </p>
            </motion.div>
          )}

          {/* Next button */}
          {showExplanation && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="mt-4 w-full py-3 bg-[var(--color-teal)] text-white rounded-lg font-medium hover:bg-[var(--color-teal)]/90 transition-colors"
            >
              {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
