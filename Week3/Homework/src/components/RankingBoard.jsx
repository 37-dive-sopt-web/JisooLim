const secondsFormatter = (value) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '0.00';
  }
  return value.toFixed(2);
};

const dateTimeFormatter = new Intl.DateTimeFormat('ko-KR', {
  dateStyle: 'medium',
  timeStyle: 'medium',
});

const formatTimestamp = (value) => {
  if (!value) {
    return '-';
  }
  try {
    return dateTimeFormatter.format(new Date(value));
  } catch {
    return '-';
  }
};

const RankingBoard = ({ records = [], onReset }) => {
  const hasRecords = records.length > 0;

  return (
    <div className="flex min-h-[520px] flex-col">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onReset?.()}
          className="rounded-full bg-(--peach) px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[color-mix(in_srgb,var(--peach),#ffffff_14%)] focus-visible:outline focus-visible:outline-(--peach-dark)"
        >
          기록 초기화
        </button>
      </div>
      <div className="mt-4 flex flex-1 flex-col overflow-hidden rounded-3xl bg-white/75 ring-1 ring-(--gray-light)">
        <div className="grid h-14 grid-cols-[72px_minmax(0,1fr)_140px_200px] items-center justify-items-center rounded-t-3xl bg-[#cde6ff] px-6 text-sm font-bold text-(--gray-dark)">
          <span>순위</span>
          <span>레벨</span>
          <span>클리어 시간(초)</span>
          <span>기록 시각</span>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          {hasRecords ? (
            records.map((record, index) => (
              <div
                key={record.id ?? `${record.levelId}-${record.timestamp}-${index}`}
                className="grid grid-cols-[72px_minmax(0,1fr)_140px_200px] items-center justify-items-center border-t border-[rgba(63,72,82,0.08)] px-6 py-4 text-sm font-semibold text-(--gray-dark) odd:bg-white/55"
              >
                <span>{index + 1}</span>
                <span className="text-(--black)">{record.levelLabel ?? record.levelId}</span>
                <span>{secondsFormatter(record.clearSeconds)}</span>
                <span>{formatTimestamp(record.timestamp)}</span>
              </div>
            ))
          ) : (
            <div className="flex flex-1 items-center justify-center px-6 text-center text-sm font-semibold text-(--gray-dark)">
              아직 등록된 클리어 기록이 없어요
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingBoard;
