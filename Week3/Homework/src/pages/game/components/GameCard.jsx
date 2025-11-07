const GameCard = ({
  value,
  isFlipped = false,
  isMatched = false,
  onClick,
}) => (
  <button
    type="button"
    aria-pressed={isFlipped}
    onClick={onClick}
    className={`relative block aspect-square w-full overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-(--card-outline) ${
      isMatched ? 'cursor-default opacity-95' : 'cursor-pointer'
    }`}
  >
    <div
      className={`absolute inset-0 rounded-xl transition-transform duration-500 transform-3d ${
        isFlipped ? 'transform-[rotateY(180deg)]' : ''
      }`}
    >
      <div className="absolute inset-0 rounded-xl bg-(--card-front) backface-hidden" />
      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-(--card-back) text-3xl font-semibold backface-hidden transform-[rotateY(180deg)]">
        {value}
      </div>
    </div>
  </button>
);

export default GameCard;
