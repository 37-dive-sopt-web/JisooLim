import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameResultModal from './components/GameResultModal.jsx';
import RankingBoard from './components/RankingBoard.jsx';
import {
  LEVELS,
  LEVEL_ORDER,
  RANKING_STORAGE_KEY,
} from './constants/gameConfig.js';
import { generateClientId } from './utils/id.js';
import {
  useCountdownTimer,
  useFlipHistory,
  useGameCompletion,
  useRankingRecords,
  useResultModalEffects,
} from './hooks/index.js';

const App = () => {
  const [activeTab, setActiveTab] = useState('game');
  const [boardResetToken, setBoardResetToken] = useState(0);
  const [selectedLevelId, setSelectedLevelId] = useState(LEVELS[0].id);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [status, setStatus] = useState('idle');
  const [resultModal, setResultModal] = useState(null);
  const [modalCountdown, setModalCountdown] = useState(3);
  const [hasRecordedResult, setHasRecordedResult] = useState(false);

  const selectedLevel =
    LEVELS.find((level) => level.id === selectedLevelId) ?? LEVELS[0];
  const totalPairs = (selectedLevel.rows * selectedLevel.columns) / 2;
  const remainingPairs = Math.max(totalPairs - matchedPairs, 0);
  const headingText = activeTab === 'game' ? '게임 보드' : '랭킹 보드';

  const {
    records: rankingRecords,
    addRecord: addRankingRecord,
    resetRecords: resetRankingRecords,
  } = useRankingRecords({
    storageKey: RANKING_STORAGE_KEY,
    levels: LEVELS,
    levelOrder: LEVEL_ORDER,
  });

  const { history: flipHistory, addEntry: addFlipHistoryEntry, resetHistory } =
    useFlipHistory({ maxEntries: 10 });

  const {
    timeLeft,
    isActive: timerActive,
    start: startTimer,
    stop: stopTimer,
    reset: resetTimer,
  } = useCountdownTimer({
    initialTime: selectedLevel.timeLimit,
    intervalMs: 100,
    step: 0.1,
  });

  useEffect(() => {
    resetTimer(selectedLevel.timeLimit);
  }, [resetTimer, selectedLevel.timeLimit]);

  const resetGameState = useCallback((level) => {
    setBoardResetToken((prev) => prev + 1);
    setMatchedPairs(0);
    stopTimer();
    resetTimer(level.timeLimit);
    setStatus('idle');
    resetHistory();
    setResultModal(null);
    setModalCountdown(3);
    setHasRecordedResult(false);
  }, [resetHistory, resetTimer, stopTimer]);

  const handleBoardReset = () => {
    resetGameState(selectedLevel);
  };

  const handleLevelChange = (nextLevelId) => {
    const targetLevel = LEVELS.find((level) => level.id === nextLevelId) ?? LEVELS[0];
    setSelectedLevelId(nextLevelId);
    resetGameState(targetLevel);
  };

  const handleGameSuccess = useCallback(
    (timeTaken) => {
      stopTimer();
      setStatus('success');
      if (hasRecordedResult) {
        return;
      }
      setResultModal((prev) => {
        if (prev) {
          return prev;
        }
        return {
          type: 'success',
          levelLabel: selectedLevel.label,
          timeTaken,
        };
      });

      const generatedId = generateClientId();
      addRankingRecord({
        id: generatedId,
        levelId: selectedLevel.id,
        levelLabel: selectedLevel.label,
        clearSeconds: timeTaken,
        timestamp: new Date().toISOString(),
      });
      setHasRecordedResult(true);
    },
    [addRankingRecord, hasRecordedResult, selectedLevel, stopTimer],
  );

  useGameCompletion({
    matchedPairs,
    totalPairs,
    selectedLevel,
    timeLeft,
    onComplete: handleGameSuccess,
  });

  const handleTimeout = useCallback(() => {
    stopTimer();
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
  }, [selectedLevel, stopTimer]);

  useEffect(() => {
    if (timeLeft === 0 && !timerActive) {
      handleTimeout();
    }
  }, [handleTimeout, timeLeft, timerActive]);

  const handleFirstFlip = () => {
    if (!timerActive && timeLeft > 0) {
      startTimer();
    }
  };

  const handlePairResolved = (cards, result) => {
    addFlipHistoryEntry(cards, result);
  };

  const handleAutoReset = useCallback(() => {
    resetGameState(selectedLevel);
  }, [resetGameState, selectedLevel]);

  useResultModalEffects({
    resultModal,
    setModalCountdown,
    onAutoReset: handleAutoReset,
  });

  return (
    <div className="min-h-screen bg-(--gray-extra-light)">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="rounded-3xl bg-(--white) p-10 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-(--black)">{headingText}</h2>
          </div>
          {activeTab === 'game' ? (
            <GameBoard
              onReset={handleBoardReset}
              gridProps={{
                resetToken: boardResetToken,
                rows: selectedLevel.rows,
                columns: selectedLevel.columns,
                onMatchChange: setMatchedPairs,
                onFirstFlip: handleFirstFlip,
                isLocked: timeLeft <= 0,
                onStatusChange: setStatus,
                onPairResolved: handlePairResolved,
              }}
              sidebarProps={{
                levels: LEVELS,
                selectedLevelId,
                onLevelChange: handleLevelChange,
                stats: {
                  totalPairs,
                  matchedPairs,
                  remainingPairs,
                  timeLeft,
                },
                status,
                history: flipHistory,
              }}
            />
          ) : (
            <div className="mt-8 min-h-[520px]">
              <RankingBoard
                records={rankingRecords}
                onReset={resetRankingRecords}
              />
            </div>
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
