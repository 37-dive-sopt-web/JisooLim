import { useEffect, useRef, useState } from 'react';
import GameCard from './GameCard.jsx';

const createShuffledPairs = (totalCards) => {
  const pairCount = totalCards / 2;
  const baseValues = Array.from({ length: pairCount }, (_, index) => index + 1);
  const deck = [...baseValues, ...baseValues];

  for (let i = deck.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[swapIndex]] = [deck[swapIndex], deck[i]];
  }

  return deck;
};

const GameBoard = ({
  resetToken = 0,
  rows = 4,
  columns = 4,
  onMatchChange,
  onFirstFlip,
  isLocked = false,
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
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
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
    setHasStarted(false);
  }, [resetToken, totalCards, onMatchChange, onStatusChange]);

  const handleCardClick = (index) => {
    if (isLocked || matched[index] || isResolving || activeIndices.includes(index)) {
      if (matched[index] || activeIndices.includes(index)) {
        onStatusChange?.('duplicate');
      }
      return;
    }

    if (!hasStarted) {
      setHasStarted(true);
      onFirstFlip?.();
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
      return;
    }

    const [firstIndex, secondIndex] = nextActive;
    const isMatch = cardValues[firstIndex] === cardValues[secondIndex];
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
      return;
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
    }, 600);
  };

  useEffect(
    () => () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    },
    [],
  );

  return (
    <div
      className="grid w-full gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cardValues.map((value, index) => {
        const isFlipped = flipped[index];
        const isMatched = matched[index];

        return (
          <GameCard
            key={`${value}-${index}`}
            value={value}
            isFlipped={isFlipped}
            isMatched={isMatched}
            onClick={() => handleCardClick(index)}
          />
        );
      })}
    </div>
  );
};

export default GameBoard;
