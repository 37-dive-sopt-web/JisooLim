import { useEffect, useRef, useState } from 'react';

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
          <button
            key={`${value}-${index}`}
            type="button"
            aria-pressed={isFlipped}
            onClick={() => handleCardClick(index)}
            className={`relative aspect-square overflow-hidden rounded-xl focus-visible:outline-4 focus-visible:outline-(--card-outline) ${
              isMatched ? 'cursor-default opacity-95' : 'cursor-pointer'
            }`}
          >
            <div
              className={`absolute inset-0 rounded-xl transition-transform duration-500 transform-3d ${
                isFlipped ? 'transform-[rotateY(180deg)]' : ''
              }`}
            >
              <div className="absolute inset-0 rounded-xl bg-(--card-front) backface-hidden" />
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-(--card-back) text-3xl font-semibold text-(--black) backface-hidden transform-[rotateY(180deg)]">
                {value}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default GameBoard;
