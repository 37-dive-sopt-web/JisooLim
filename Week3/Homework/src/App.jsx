import { useCallback, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameSidebar from './components/GameSidebar.jsx';
import GameResultModal from './components/GameResultModal.jsx';

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
  const [resultModal, setResultModal] = useState(null);
  const [modalCountdown, setModalCountdown] = useState(3);

  const selectedLevel =
    LEVELS.find((level) => level.id === selectedLevelId) ?? LEVELS[0];
  const totalPairs = (selectedLevel.rows * selectedLevel.columns) / 2;
  const remainingPairs = Math.max(totalPairs - matchedPairs, 0);
  const headingText = activeTab === 'game' ? '게임 보드' : '랭킹 보드';

  const resetGameState = useCallback((level) => {
    setBoardResetToken((prev) => prev + 1);
    setMatchedPairs(0);
    setTimerActive(false);
    setTimeLeft(level.timeLimit);
    setStatus('idle');
    setFlipHistory([]);
    setResultModal(null);
    setModalCountdown(3);
  }, []);

  const handleBoardReset = () => {
    resetGameState(selectedLevel);
  };

  const handleLevelChange = (nextLevelId) => {
    const targetLevel = LEVELS.find((level) => level.id === nextLevelId) ?? LEVELS[0];
    setSelectedLevelId(nextLevelId);
    resetGameState(targetLevel);
  };

  useEffect(() => {
    if (matchedPairs === totalPairs && totalPairs > 0) {
      setTimerActive(false);
      setStatus('success');
      setResultModal((prev) => {
        if (prev) {
          return prev;
        }
        const timeTaken = Number((selectedLevel.timeLimit - timeLeft).toFixed(2));
        return {
          type: 'success',
          levelLabel: selectedLevel.label,
          timeTaken: Math.max(0, timeTaken),
        };
      });
    }
  }, [matchedPairs, totalPairs, selectedLevel, timeLeft]);

  useEffect(() => {
    if (!timerActive) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        const nextValue = Math.max(0, Number((prev - 0.1).toFixed(2)));
        if (nextValue === 0) {
          setTimerActive(false);
          setStatus('timeout');
          setResultModal((current) => {
            if (current) {
              return current;
            }
            return {
              type: 'timeout',
              levelLabel: selectedLevel.label,
              timeTaken: selectedLevel.timeLimit,
            };
          });
        }
        return nextValue;
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [timerActive, selectedLevel]);

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

  useEffect(() => {
    if (!resultModal) {
      setModalCountdown(3);
      return undefined;
    }

    setModalCountdown(3);
    const countdownInterval = setInterval(() => {
      setModalCountdown((prev) => (prev > 1 ? prev - 1 : prev));
    }, 1000);
    const autoResetTimeout = setTimeout(() => {
      resetGameState(selectedLevel);
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(autoResetTimeout);
    };
  }, [resultModal, resetGameState, selectedLevel]);

  useEffect(() => {
    if (!resultModal || resultModal.type !== 'success') {
      return undefined;
    }

    const fireConfetti = () => {
      const baseOptions = {
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      };

      const rootStyles = getComputedStyle(document.documentElement);
      const colors1 = [
        rootStyles.getPropertyValue('--green').trim(),
        rootStyles.getPropertyValue('--card-back').trim(),
      ];
      const colors2 = [
        rootStyles.getPropertyValue('--peach').trim(),
        rootStyles.getPropertyValue('--card-back').trim(),
      ];

      confetti({
        ...baseOptions,
        angle: 60,
        colors: colors1,
      });
      confetti({
        ...baseOptions,
        angle: 120,
        colors: colors2,
      });
    };

    fireConfetti();
    const followUpTimeout = setTimeout(fireConfetti, 500);

    return () => {
      clearTimeout(followUpTimeout);
    };
  }, [resultModal]);

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
      <GameResultModal
        isOpen={Boolean(resultModal)}
        type={resultModal?.type}
        levelLabel={resultModal?.levelLabel}
        timeTaken={resultModal?.timeTaken}
        countdown={modalCountdown}
      />
    </div>
  );
};

export default App;
