import { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard.jsx';
import GameResultModal from './components/GameResultModal.jsx';
import { LEVELS } from '@/constants/gameConfig.js';
import { generateClientId } from '@/utils/id.js';
import {
  useCountdownTimer,
  useFlipHistory,
  useGameCompletion,
  useResultModalEffects,
} from '@/hooks/index.js';

const GamePage = ({ onAddRecord }) => {
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

  const resetGameState = (level) => {
    setBoardResetToken((prev) => prev + 1);
    setMatchedPairs(0);
    stopTimer();
    resetTimer(level.timeLimit);
    setStatus('idle');
    resetHistory();
    setResultModal(null);
    setModalCountdown(3);
    setHasRecordedResult(false);
  };

  const handleBoardReset = () => {
    resetGameState(selectedLevel);
  };

  const handleLevelChange = (nextLevelId) => {
    const targetLevel =
      LEVELS.find((level) => level.id === nextLevelId) ?? LEVELS[0];
    setSelectedLevelId(nextLevelId);
    resetGameState(targetLevel);
  };

  const handleGameSuccess = (timeTaken) => {
    stopTimer();
    setStatus('success');

    if (hasRecordedResult) {
      return;
    }

    setResultModal((current) => {
      if (current) {
        return current;
      }
      return {
        type: 'success',
        levelLabel: selectedLevel.label,
        timeTaken,
      };
    });

    if (onAddRecord) {
      const generatedId = generateClientId();
      onAddRecord({
        id: generatedId,
        levelId: selectedLevel.id,
        levelLabel: selectedLevel.label,
        clearSeconds: timeTaken,
        timestamp: new Date().toISOString(),
      });
      setHasRecordedResult(true);
    }
  };

  useGameCompletion({
    matchedPairs,
    totalPairs,
    selectedLevel,
    timeLeft,
    onComplete: handleGameSuccess,
  });

  useEffect(() => {
    if (timeLeft === 0 && !timerActive) {
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
    }
  }, [selectedLevel, stopTimer, timeLeft, timerActive]);

  const handleFirstFlip = () => {
    if (!timerActive && timeLeft > 0) {
      startTimer();
    }
  };

  const handlePairResolved = (cards, result) => {
    addFlipHistoryEntry(cards, result);
  };

  const handleAutoReset = () => {
    resetGameState(selectedLevel);
  };

  useResultModalEffects({
    resultModal,
    setModalCountdown,
    onAutoReset: handleAutoReset,
  });

  return (
    <>
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
      <GameResultModal
        isOpen={Boolean(resultModal)}
        type={resultModal?.type}
        levelLabel={resultModal?.levelLabel}
        timeTaken={resultModal?.timeTaken}
        countdown={modalCountdown}
      />
    </>
  );
};

export default GamePage;
