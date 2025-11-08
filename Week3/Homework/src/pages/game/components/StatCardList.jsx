const StatCardList = ({
  stats = { totalPairs: 0, matchedPairs: 0, remainingPairs: 0, timeLeft: 0 },
}) => {
  const { totalPairs, matchedPairs, remainingPairs, timeLeft } = stats;
  const formattedTime = timeLeft.toFixed(2).padStart(5, '0');

  const cardItems = [
    {
      id: 'time',
      label: '남은 시간',
      value: formattedTime,
    },
    {
      id: 'matched',
      label: '성공한 짝',
      value: `${matchedPairs}/${totalPairs}`,
    },
    {
      id: 'remaining',
      label: '남은 짝',
      value: remainingPairs,
    },
  ];

  return (
    <div className="grid shrink-0 grid-cols-3 gap-4">
      {cardItems.map(({ id, label, value }) => (
        <div
          key={id}
          className="flex flex-col items-center justify-center rounded-xl bg-white/70 p-4 text-center"
        >
          <p className="text-xs font-medium text-(--gray)">{label}</p>
          <p className="mt-2 text-lg font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatCardList;
