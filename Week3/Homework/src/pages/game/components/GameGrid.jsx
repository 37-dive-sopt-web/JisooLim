import { useEffect, useState } from 'react';
import GameCard from './GameCard.jsx';
import { useCardMatching } from '@/hooks/useCardMatching.js';

const GameGrid = ({
  resetToken = 0,
  rows = 4,
  columns = 4,
  onMatchChange,
  onFirstFlip,
  isLocked = false,
  onStatusChange,
  onPairResolved,
}) => {
  const [hasStarted, setHasStarted] = useState(false);

  const {
    cardValues,
    flipped,
    matched,
    handleCardClick,
    resetDeck,
    cleanup,
  } = useCardMatching({
    rows,
    columns,
    onMatchChange,
    onStatusChange,
    onPairResolved,
  });

  useEffect(() => {
    resetDeck();
    setHasStarted(false);
  }, [resetDeck, resetToken]);

  useEffect(() => cleanup, [cleanup]);

  const handleCardSelection = (index) => {
    if (isLocked) {
      return;
    }

    if (!hasStarted && !matched[index]) {
      setHasStarted(true);
      onFirstFlip?.();
    }

    handleCardClick(index);
  };

  return (
    <ul
      className="m-0 grid w-full list-none gap-3 p-0"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cardValues.map((value, index) => (
        <li key={`${value}-${index}`}>
          <GameCard
            value={value}
            isFlipped={flipped[index]}
            isMatched={matched[index]}
            onClick={() => handleCardSelection(index)}
          />
        </li>
      ))}
    </ul>
  );
};

export default GameGrid;
