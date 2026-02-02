'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizData, AgeLevel } from '@/types';
import { getContent } from '@/utils/ageContent';
import { Sparkles, Confetti } from './Confetti';

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
  const [showCorrectAnimation, setShowCorrectAnimation] = useState(false);

  const question = data.questions[currentQuestion];
  const totalQuestions = data.questions.length;

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question.correctIndex) {
      setScore(s => s + 1);
      setShowCorrectAnimation(true);
      setTimeout(() => setShowCorrectAnimation(false), 1500);
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
    const isGreat = finalScore >= totalQuestions * 0.7;

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
          {isPerfect ? 'Perfect Score! Amazing!' : isGreat ? 'Great Job!' : 'Quiz Complete!'}
        </motion.h3>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 mb-4"
        >
          You got <span className="font-bold text-[var(--color-teal)]">{finalScore}</span> out of <span className="font-bold">{totalQuestions}</span> correct!
        </motion.p>

        {/* Animated score indicators */}
        <div className="flex justify-center gap-2 mb-4">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                i < finalScore ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gray-300'
              }`}
            >
              {i < finalScore ? '✓' : ''}
            </motion.div>
          ))}
        </div>

        {/* Points earned */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-sunny)] to-amber-400 text-white px-5 py-2 rounded-full shadow-lg"
        >
          <span className="text-xl">⭐</span>
          <span className="font-bold text-lg">+{finalScore * 5 + (isPerfect ? 10 : 0)} points!</span>
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
      {/* Sparkle effect for correct answers */}
      {showCorrectAnimation && <Sparkles active={true} />}

      {/* Progress */}
      <div className="flex items-center justify-between mb-4 bg-white rounded-xl p-3 shadow-sm border-2 border-gray-100">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎯
          </motion.span>
          <span className="text-sm font-medium text-[var(--color-navy)]">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <motion.div
              key={i}
              initial={i === currentQuestion ? { scale: 0 } : {}}
              animate={i === currentQuestion ? { scale: 1 } : {}}
              className={`w-4 h-4 rounded-full transition-all shadow-sm ${
                i < currentQuestion
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                  : i === currentQuestion
                  ? 'bg-gradient-to-br from-[var(--color-coral)] to-[var(--color-sunny)] ring-2 ring-[var(--color-coral)]/30'
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
          {/* Question card */}
          <motion.div
            className="bg-gradient-to-br from-[var(--color-aqua)]/10 to-[var(--color-teal)]/10 rounded-2xl p-5 mb-5 border-2 border-[var(--color-aqua)]/30"
            initial={{ y: -10 }}
            animate={{ y: 0 }}
          >
            <div className="flex items-start gap-3">
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🤔
              </motion.span>
              <h4 className="font-[family-name:var(--font-fredoka)] text-lg text-[var(--color-navy)] leading-relaxed">
                {getContent(question.question, ageLevel)}
              </h4>
            </div>
          </motion.div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctIndex;
              const showResult = showExplanation;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!showResult ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-2xl text-left transition-all shadow-sm hover:shadow-md ${
                    showResult
                      ? isCorrect
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-3 border-green-400 shadow-green-100'
                        : isSelected
                        ? 'bg-gradient-to-r from-red-50 to-red-100 border-3 border-red-400 shake-animation'
                        : 'bg-gray-50 border-2 border-transparent opacity-60'
                      : isSelected
                      ? 'bg-gradient-to-r from-[var(--color-aqua)]/20 to-[var(--color-teal)]/20 border-3 border-[var(--color-teal)]'
                      : 'bg-white border-2 border-gray-200 hover:border-[var(--color-aqua)]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.span
                      animate={showResult && isCorrect ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shadow-sm ${
                        showResult && isCorrect
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                          : showResult && isSelected
                          ? 'bg-gradient-to-br from-red-400 to-red-500 text-white'
                          : isSelected
                          ? 'bg-gradient-to-br from-[var(--color-aqua)] to-[var(--color-teal)] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : optionLetters[index]}
                    </motion.span>
                    <span className={`flex-1 ${showResult && isCorrect ? 'font-bold text-green-800' : showResult && isSelected ? 'text-red-800' : 'text-gray-700'}`}>
                      {getContent(option, ageLevel)}
                    </span>
                    {showResult && isCorrect && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-2xl"
                      >
                        🎉
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`mt-5 p-5 rounded-2xl shadow-sm ${
                selectedAnswer === question.correctIndex
                  ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-300'
                  : 'bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <motion.span
                  className="text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  {selectedAnswer === question.correctIndex ? '🎉' : '💡'}
                </motion.span>
                <div>
                  <p className={`font-bold mb-1 ${selectedAnswer === question.correctIndex ? 'text-green-700' : 'text-amber-700'}`}>
                    {selectedAnswer === question.correctIndex ? 'Awesome! You got it!' : 'Good try! Here\'s the answer:'}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {getContent(question.explanation, ageLevel)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Next button */}
          {showExplanation && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="mt-5 w-full py-4 bg-gradient-to-r from-[var(--color-aqua)] to-[var(--color-teal)] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              {currentQuestion < totalQuestions - 1 ? (
                <>
                  Next Question
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </>
              ) : (
                <>
                  See Results
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    🏆
                  </motion.span>
                </>
              )}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
