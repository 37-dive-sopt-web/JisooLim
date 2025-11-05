import { createPortal } from 'react-dom';
import { formatSeconds } from '../../../utils/format.js';
import { RESULT_MODAL_MESSAGES } from '../../../constants/messages.js';

const GameResultModal = ({
  isOpen = false,
  type,
  levelLabel,
  timeTaken,
  countdown = 3,
}) => {
  if (!isOpen || !type || typeof document === 'undefined') {
    return null;
  }

  const levelDisplay = levelLabel ?? 'Level';
  const formattedSeconds = formatSeconds(timeTaken, { trimZeros: true });
  const messageSet = RESULT_MODAL_MESSAGES[type] ?? RESULT_MODAL_MESSAGES.timeout;
  const headingText = messageSet.heading;
  const primaryMessage = messageSet.primary(levelDisplay, formattedSeconds);
  const countdownColor = messageSet.countdownClass;

  const modalContent = (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-6 py-8">
      <div
        role="dialog"
        aria-live="assertive"
        aria-modal="true"
        className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
      >
        <h3 className="text-2xl font-bold text-(--black)">{headingText}</h3>
        <p className="mt-4 text-base font-semibold text-(--gray-dark)">{primaryMessage}</p>
        <p className={`mt-6 text-sm font-semibold ${countdownColor}`}>
          <span className="text-lg font-bold">{countdown}</span>초 후 자동으로 새 게임을 시작해요
        </p>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default GameResultModal;
