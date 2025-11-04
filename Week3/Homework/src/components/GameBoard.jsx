import { useState } from 'react';

const TOTAL_CARDS = 16;

const GameBoard = () => {
  const [flipped, setFlipped] = useState(Array(TOTAL_CARDS).fill(false));

  const handleCardClick = (index) => {
    setFlipped((prev) =>
      prev.map((isFlipped, cardIndex) =>
        cardIndex === index ? !isFlipped : isFlipped,
      ),
    );
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {flipped.map((isFlipped, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleCardClick(index)}
          className="relative aspect-square overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-(--mint-dark)"
          aria-pressed={isFlipped}
        >
          <div
            className={`absolute inset-0 rounded-xl transition-transform duration-500 transform-3dtransform:rotateY(180deg)]' : ''}`}
          >
            <span className="absolute inset-0 rounded-xl bg-(--mint) backface-hidden" />
            <span className="absolute inset-0 rounded-xl bg-(--peach) backface-hidden transform-[rotateY(180deg)]" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
