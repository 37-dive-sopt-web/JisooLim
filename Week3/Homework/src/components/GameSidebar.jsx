import dropdownIcon from '../assets/svgs/ic_downarrow.svg';

const GameSidebar = ({
  levels = [],
  selectedLevelId,
  onLevelChange,
  stats = {
    totalPairs: 0,
    matchedPairs: 0,
    remainingPairs: 0,
    timeLeft: 0,
  },
}) => {
  const { totalPairs, matchedPairs, remainingPairs, timeLeft } = stats;
  const formattedTime = timeLeft.toFixed(2).padStart(5, '0');

  return (
    <aside className="flex h-full w-full flex-col gap-5 rounded-2xl bg-[rgba(231,232,234,0.45)] p-6">
      <div className="relative">
        <select
          id="level-select"
          className="w-full appearance-none rounded-xl border border-[rgba(63,72,82,0.2)] bg-white py-3 pl-4 pr-10 text-sm font-semibold text-(--black) shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-(--card-back)"
          value={selectedLevelId}
          onChange={(event) => onLevelChange?.(event.target.value)}
        >
          {levels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.label}
            </option>
          ))}
        </select>
        <img
          src={dropdownIcon}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 my-auto h-4 w-4"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/70 p-4 text-center">
          <p className="text-xs font-medium text-(--gray)">남은 시간</p>
          <p className="mt-2 text-lg font-semibold text-(--black)">{formattedTime}</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/70 p-4 text-center">
          <p className="text-xs font-medium text-(--gray)">성공한 짝</p>
          <p className="mt-2 text-lg font-semibold text-(--black)">
            {matchedPairs}/{totalPairs}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/70 p-4 text-center">
          <p className="text-xs font-medium text-(--gray)">남은 짝</p>
          <p className="mt-2 text-lg font-semibold text-(--black)">{remainingPairs}</p>
        </div>
      </div>
      <div className="h-32 rounded-xl bg-white/70" aria-hidden="true" />
      <div className="h-48 rounded-xl bg-white/70" aria-hidden="true" />
      <div className="flex-1 rounded-xl bg-white/70" aria-hidden="true" />
    </aside>
  );
};

export default GameSidebar;
