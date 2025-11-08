export const createShuffledPairs = (totalCards) => {
  const pairCount = totalCards / 2;
  const baseValues = Array.from({ length: pairCount }, (_, index) => index + 1);
  const deck = [...baseValues, ...baseValues];

  for (let i = deck.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[swapIndex]] = [deck[swapIndex], deck[i]];
  }

  return deck;
};

export const areCardsMatching = (cardValues, firstIndex, secondIndex) =>
  cardValues[firstIndex] === cardValues[secondIndex];
