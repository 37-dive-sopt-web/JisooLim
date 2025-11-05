import { useEffect, useRef, useState } from 'react';

const HistoryList = ({ history = [] }) => {
  const hasHistory = history.length > 0;
  const scrollAreaRef = useRef(null);
  const [historyHeight, setHistoryHeight] = useState(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      setHistoryHeight(scrollAreaRef.current.clientHeight);
    }
  }, []);

  return (
    <div className="flex flex-1 min-h-0 flex-col gap-2 overflow-hidden">
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
  );
};

export default HistoryList;
