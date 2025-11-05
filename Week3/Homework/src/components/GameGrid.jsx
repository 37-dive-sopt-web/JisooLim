import { useEffect, useState } from 'react';
import GameCard from './GameCard.jsx';
import { useCardMatching } from '../hooks/useCardMatching.js';

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
    <div
      className="grid w-full gap-3"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cardValues.map((value, index) => (
        <GameCard
          key={`${value}-${index}`}
          value={value}
          isFlipped={flipped[index]}
          isMatched={matched[index]}
          onClick={() => handleCardSelection(index)}
        />
      ))}
    </div>
  );
};

export default GameGrid;
