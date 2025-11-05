import { useEffect } from 'react';

export const useGameCompletion = ({
  matchedPairs,
  totalPairs,
  selectedLevel,
  timeLeft,
  onComplete,
}) => {
  useEffect(() => {
    if (matchedPairs === totalPairs && totalPairs > 0) {
      const rawTimeTaken = selectedLevel.timeLimit - timeLeft;
      const timeTaken = Math.max(
        0,
        Number(Number(rawTimeTaken).toFixed(2)),
      );
      onComplete?.(timeTaken);
    }
  }, [matchedPairs, totalPairs, selectedLevel, timeLeft, onComplete]);
};
