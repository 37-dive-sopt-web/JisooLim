import { useCallback, useRef, useState } from 'react';
import { createShuffledPairs, areCardsMatching } from '../utils/cards.js';

const RESET_TIMEOUT_MS = 600;

export const useCardMatching = ({
  rows = 4,
  columns = 4,
  onMatchChange,
  onStatusChange,
  onPairResolved,
}) => {
  const totalCards = rows * columns;
  const [cardValues, setCardValues] = useState(() => createShuffledPairs(totalCards));
  const [flipped, setFlipped] = useState(() => Array(totalCards).fill(false));
  const [matched, setMatched] = useState(() => Array(totalCards).fill(false));
  const [activeIndices, setActiveIndices] = useState([]);
  const [isResolving, setIsResolving] = useState(false);
  const hideTimeoutRef = useRef(null);

  const resetDeck = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setCardValues(createShuffledPairs(totalCards));
    setFlipped(Array(totalCards).fill(false));
    setMatched(Array(totalCards).fill(false));
    setActiveIndices([]);
    setIsResolving(false);
    onMatchChange?.(0);
    onStatusChange?.('idle');
  }, [onMatchChange, onStatusChange, totalCards]);

  const handleCardClick = useCallback(
    (index) => {
      if (matched[index] || isResolving || activeIndices.includes(index)) {
        if (matched[index] || activeIndices.includes(index)) {
          onStatusChange?.('duplicate');
        }
        return false;
      }

      if (activeIndices.length === 0) {
        onStatusChange?.('idle');
      }

      setFlipped((prev) =>
        prev.map((isFlipped, cardIndex) => (cardIndex === index ? true : isFlipped)),
      );

      const nextActive = [...activeIndices, index];
      setActiveIndices(nextActive);

      if (nextActive.length !== 2) {
        return true;
      }

      const [firstIndex, secondIndex] = nextActive;
      const isMatch = areCardsMatching(cardValues, firstIndex, secondIndex);
      const pairValues = [cardValues[firstIndex], cardValues[secondIndex]];

      if (isMatch) {
        setMatched((prev) => {
          const next = prev.map((isMatched, cardIndex) =>
            cardIndex === firstIndex || cardIndex === secondIndex ? true : isMatched,
          );
          const matchedPairsCount = next.filter(Boolean).length / 2;
          onMatchChange?.(matchedPairsCount);
          onStatusChange?.('success');
          return next;
        });
        setActiveIndices([]);
        onPairResolved?.(pairValues, 'success');
        return true;
      }

      onStatusChange?.('resolving');
      setIsResolving(true);
      hideTimeoutRef.current = setTimeout(() => {
        setFlipped((prev) =>
          prev.map((isFlipped, cardIndex) =>
            cardIndex === firstIndex || cardIndex === secondIndex ? false : isFlipped,
          ),
        );
        setActiveIndices([]);
        setIsResolving(false);
        hideTimeoutRef.current = null;
        onStatusChange?.('failure');
        onPairResolved?.(pairValues, 'failure');
      }, RESET_TIMEOUT_MS);

      return true;
    },
    [activeIndices, cardValues, isResolving, matched, onMatchChange, onPairResolved, onStatusChange],
  );

  const cleanup = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  return {
    cardValues,
    flipped,
    matched,
    isResolving,
    handleCardClick,
    resetDeck,
    cleanup,
  };
};
