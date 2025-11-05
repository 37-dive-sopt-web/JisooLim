import { useEffect, useRef } from 'react';

export const useGameCompletion = ({
  matchedPairs,
  totalPairs,
  selectedLevel,
  timeLeft,
  onComplete,
}) => {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (matchedPairs === totalPairs && totalPairs > 0) {
      const rawTimeTaken = selectedLevel.timeLimit - timeLeft;
      const timeTaken = Math.max(
        0,
        Number(Number(rawTimeTaken).toFixed(2)),
      );
      onCompleteRef.current?.(timeTaken);
    }
  }, [matchedPairs, totalPairs, selectedLevel, timeLeft]);
};
