import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_INTERVAL_MS = 100;
const DEFAULT_STEP = 0.1;

export const useCountdownTimer = ({
  initialTime = 0,
  intervalMs = DEFAULT_INTERVAL_MS,
  step = DEFAULT_STEP,
  onTick,
  onTimeout,
} = {}) => {
  const [timeLeft, setTimeLeft] = useState(() => Number(initialTime));
  const [isActive, setIsActive] = useState(false);
  const savedStep = useRef(step);

  const reset = useCallback(
    (nextTime = initialTime) => {
      setTimeLeft(Number(nextTime));
      setIsActive(false);
    },
    [initialTime],
  );

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    savedStep.current = step;
  }, [step]);

  useEffect(() => {
    setTimeLeft(Number(initialTime));
    setIsActive(false);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        const nextValue = Math.max(
          0,
          Number((prev - savedStep.current).toFixed(2)),
        );

        onTick?.(nextValue);

        if (nextValue === 0) {
          setIsActive(false);
          onTimeout?.();
        }

        return nextValue;
      });
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [isActive, intervalMs, onTick, onTimeout]);

  return {
    timeLeft,
    isActive,
    start,
    stop,
    reset,
  };
};
