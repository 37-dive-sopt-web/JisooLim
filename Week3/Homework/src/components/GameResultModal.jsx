import { createPortal } from 'react-dom';

const formatSeconds = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '0';
  }
  return value.toFixed(2).replace(/\.?0+$/, '');
};

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

  const isSuccess = type === 'success';
  const formattedSeconds = formatSeconds(timeTaken);

  const headingText = isSuccess ? '축하합니다 !!' : '아쉽지만 다음 기회에';
  const primaryMessage = isSuccess
    ? `${levelLabel ?? 'Level'}을 ${formattedSeconds}초 만에 클리어했어요`
    : `${levelLabel ?? 'Level'}을 제한 시간 안에 클리어하지 못했어요`;
  const countdownColor = isSuccess ? 'text-(--green)' : 'text-(--peach-dark)';

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
