import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameSidebar from './components/GameSidebar.jsx';

const LEVELS = [
  {
    id: 'level1',
    label: 'Level 1',
    rows: 4,
    columns: 4,
    pairs: 8,
    timeLimit: 45,
  },
  {
    id: 'level2',
    label: 'Level 2',
    rows: 4,
    columns: 6,
    pairs: 12,
    timeLimit: 60,
  },
  {
    id: 'level3',
    label: 'Level 3',
    rows: 6,
    columns: 6,
    pairs: 18,
    timeLimit: 100,
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState('game');
  const [boardResetToken, setBoardResetToken] = useState(0);
  const [selectedLevelId, setSelectedLevelId] = useState(LEVELS[0].id);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].timeLimit);
  const [status, setStatus] = useState('idle');
  const [flipHistory, setFlipHistory] = useState([]);

  const selectedLevel =
    LEVELS.find((level) => level.id === selectedLevelId) ?? LEVELS[0];
  const totalPairs = (selectedLevel.rows * selectedLevel.columns) / 2;
  const remainingPairs = Math.max(totalPairs - matchedPairs, 0);
  const headingText = activeTab === 'game' ? '게임 보드' : '랭킹 보드';

  const handleBoardReset = () => {
    setBoardResetToken((prev) => prev + 1);
    setMatchedPairs(0);
    setTimerActive(false);
    setTimeLeft(selectedLevel.timeLimit);
    setStatus('idle');
    setFlipHistory([]);
  };

  const handleLevelChange = (nextLevelId) => {
    const targetLevel = LEVELS.find((level) => level.id === nextLevelId) ?? LEVELS[0];
    setSelectedLevelId(nextLevelId);
    setBoardResetToken((prev) => prev + 1);
    setMatchedPairs(0);
    setTimerActive(false);
    setTimeLeft(targetLevel.timeLimit);
    setStatus('idle');
    setFlipHistory([]);
  };

  useEffect(() => {
    if (matchedPairs === totalPairs && totalPairs > 0) {
      setTimerActive(false);
      setStatus('success');
    }
  }, [matchedPairs, totalPairs]);

  useEffect(() => {
    if (!timerActive) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        const nextValue = Math.max(0, Number((prev - 0.1).toFixed(2)));
        if (nextValue === 0) {
          setTimerActive(false);
          setStatus('failure');
        }
        return nextValue;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [timerActive]);

  const handleFirstFlip = () => {
    if (!timerActive && timeLeft > 0) {
      setTimerActive(true);
    }
  };

  const handlePairResolved = (cards, result) => {
    setFlipHistory((prev) => {
      const generatedId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
      const nextEntry = {
        id: generatedId,
        cards,
        result,
      };
      return [nextEntry, ...prev].slice(0, 10);
    });
  };

  return (
    <div className="min-h-screen bg-(--gray-extra-light)">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="rounded-3xl bg-(--white) p-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-(--black)">{headingText}</h2>
          </div>
          {activeTab === 'game' ? (
            <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
              <div className="flex w-full flex-col items-center gap-4 lg:max-w-[520px]">
                <div className="flex w-full max-w-[520px] justify-end">
                  <button
                    type="button"
                    aria-label="게임 보드 리셋"
                    onClick={handleBoardReset}
                    className="rounded-full bg-(--peach) px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[color-mix(in_srgb,var(--peach),#ffffff_20%)] focus-visible:outline focus-visible:outline-(--peach-dark)"
                  >
                    게임 리셋
                  </button>
                </div>
                <div className="w-full max-w-[520px]">
                  <GameBoard
                    resetToken={boardResetToken}
                    rows={selectedLevel.rows}
                    columns={selectedLevel.columns}
                    onMatchChange={setMatchedPairs}
                    onFirstFlip={handleFirstFlip}
                    isLocked={timeLeft <= 0}
                    onStatusChange={setStatus}
                    onPairResolved={handlePairResolved}
                  />
                </div>
              </div>
              <div className="w-full lg:w-[480px]">
                <GameSidebar
                  levels={LEVELS}
                  selectedLevelId={selectedLevelId}
                  onLevelChange={handleLevelChange}
                  stats={{
                    totalPairs,
                    matchedPairs,
                    remainingPairs,
                    timeLeft,
                  }}
                  status={status}
                  history={flipHistory}
                />
              </div>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl bg-[rgba(231,232,234,0.45)] p-6" />
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
