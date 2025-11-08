import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  CONFETTI_BASE_OPTIONS,
  CONFETTI_BURSTS,
  CONFETTI_INTERVAL_MS,
} from '../constants/effects.js';

export const useResultModalEffects = ({
  resultModal,
  setModalCountdown,
  onAutoReset,
  autoResetDelay = 3000,
}) => {
  const autoResetRef = useRef(onAutoReset);

  useEffect(() => {
    autoResetRef.current = onAutoReset;
  }, [onAutoReset]);

  useEffect(() => {
    if (!resultModal) {
      setModalCountdown?.(3);
      return undefined;
    }

    setModalCountdown?.(3);

    const countdownInterval = setInterval(() => {
      setModalCountdown?.((prev) => (prev > 1 ? prev - 1 : prev));
    }, 1000);

    const autoResetTimeout = setTimeout(() => {
      autoResetRef.current?.();
    }, autoResetDelay);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(autoResetTimeout);
    };
  }, [autoResetDelay, resultModal, setModalCountdown]);

  useEffect(() => {
    if (!resultModal || resultModal.type !== 'success') {
      return undefined;
    }

    const fireConfetti = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      CONFETTI_BURSTS.forEach(({ angle, colorVars }) => {
        const colors = colorVars.map((variableName) =>
          rootStyles.getPropertyValue(variableName).trim(),
        );
        confetti({
          ...CONFETTI_BASE_OPTIONS,
          angle,
          colors,
        });
      });
    };

    fireConfetti();
    const followUpTimeout = setTimeout(fireConfetti, CONFETTI_INTERVAL_MS);

    return () => {
      clearTimeout(followUpTimeout);
    };
  }, [resultModal]);
};
