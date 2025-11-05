import { useEffect, useRef, useState } from 'react';

const TOTAL_CARDS = 16;

const createShuffledPairs = () => {
  const baseValues = Array.from({ length: TOTAL_CARDS / 2 }, (_, index) => index + 1);
  const pairedValues = [...baseValues, ...baseValues];

  for (let i = pairedValues.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [pairedValues[i], pairedValues[swapIndex]] = [pairedValues[swapIndex], pairedValues[i]];
  }

  return pairedValues;
};

const GameBoard = ({ resetToken = 0 }) => {
  const [cardValues, setCardValues] = useState(() => createShuffledPairs());
  const [flipped, setFlipped] = useState(Array(TOTAL_CARDS).fill(false));
  const [matched, setMatched] = useState(Array(TOTAL_CARDS).fill(false));
  const [activeIndices, setActiveIndices] = useState([]);
  const [isResolving, setIsResolving] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setCardValues(createShuffledPairs());
    setFlipped(Array(TOTAL_CARDS).fill(false));
    setMatched(Array(TOTAL_CARDS).fill(false));
    setActiveIndices([]);
    setIsResolving(false);
  }, [resetToken]);

  const handleCardClick = (index) => {
    if (matched[index] || isResolving || activeIndices.includes(index)) {
      return;
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
      setMatched((prev) =>
        prev.map((isMatched, cardIndex) =>
          cardIndex === firstIndex || cardIndex === secondIndex ? true : isMatched,
        ),
      );
      setActiveIndices([]);
      return;
    }

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
    }, 900);
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
    <div className="grid w-full grid-cols-4 gap-3">
      {cardValues.map((value, index) => {
        const isFlipped = flipped[index];
        const isMatched = matched[index];

        return (
          <button
            key={`${value}-${index}`}
            type="button"
            aria-pressed={isFlipped}
            onClick={() => handleCardClick(index)}
            className={`relative aspect-square overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-(--card-outline) ${
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
