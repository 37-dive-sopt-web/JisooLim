import { useEffect, useRef, useState } from 'react';
import IcDownarrow from '../assets/svgs/icDownarrow.jsx';
import { SIDEBAR_STATUS_MESSAGES } from '../constants/messages.js';

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
  status = 'idle',
  history = [],
}) => {
  const { totalPairs, matchedPairs, remainingPairs, timeLeft } = stats;
  const formattedTime = timeLeft.toFixed(2).padStart(5, '0');
  const statusMessage =
    SIDEBAR_STATUS_MESSAGES[status] ?? SIDEBAR_STATUS_MESSAGES.idle;
  const hasHistory = history.length > 0;

  const scrollAreaRef = useRef(null);
  const [historyHeight, setHistoryHeight] = useState(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const rect = scrollAreaRef.current.getBoundingClientRect();
      setHistoryHeight(rect.height);
    }
  }, []);

  return (
    <aside className="flex h-full min-h-0 w-full flex-col space-y-5 overflow-hidden rounded-2xl bg-[rgba(231,232,234,0.45)] p-6">
      <div className="relative shrink-0">
        <select
          id="level-select"
          className="w-full appearance-none rounded-xl border border-[rgba(63,72,82,0.2)] bg-white py-3 pl-4 pr-10 text-sm font-semibold shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-(--card-back)"
          value={selectedLevelId}
          onChange={(event) => onLevelChange?.(event.target.value)}
        >
          {levels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.label}
            </option>
          ))}
        </select>
        <IcDownarrow
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 my-auto h-4 w-4 text-(--gray)"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 shrink-0">
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/70 p-4 text-center">
          <p className="text-xs font-medium text-(--gray)">남은 시간</p>
          <p className="mt-2 text-lg font-semibold">{formattedTime}</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/70 p-4 text-center">
          <p className="text-xs font-medium text-(--gray)">성공한 짝</p>
          <p className="mt-2 text-lg font-semibold">
            {matchedPairs}/{totalPairs}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/70 p-4 text-center">
          <p className="text-xs font-medium text-(--gray)">남은 짝</p>
          <p className="mt-2 text-lg font-semibold">{remainingPairs}</p>
        </div>
      </div>
      <div className="rounded-xl bg-white/70 p-4 shrink-0">
        <p className="text-sm font-semibold">
          {statusMessage}
        </p>
      </div>
      <div className="flex flex-1 min-h-0 flex-col gap-2 overflow-hidden last:mt-0">
        <p className="text-sm font-semibold text-(--gray-dark)">최근 히스토리</p>
        <div ref={scrollAreaRef} className="relative flex-1 min-h-0">
          {hasHistory ? (
            <ul
              className="flex flex-col gap-2 overflow-y-auto pr-1"
              style={historyHeight ? { height: historyHeight } : undefined}
            >
              {history.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-2"
                >
                  <span
                    className={`text-sm font-semibold ${
                      entry.result === 'success'
                        ? 'text-(--green)'
                        : 'text-(--peach-dark)'
                    }`}
                  >
                    {entry.cards.join(', ')}
                  </span>
                  <span className="text-sm font-semibold text-(--gray-dark)">
                    {entry.result === 'success' ? '성공' : '실패'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="flex items-center justify-center rounded-xl bg-white/70 px-4 py-6"
              style={historyHeight ? { height: historyHeight } : undefined}
            >
              <p className="text-sm font-semibold text-(--gray-dark)">
                아직 뒤집은 카드가 없어요
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default GameSidebar;
