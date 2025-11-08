import { formatSeconds, formatTimestamp } from '@/utils/format.js';

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
        {hasRecords ? (
          <div className="flex-1 overflow-y-auto">
            <table
              aria-label="랭킹 기록"
              className="w-full border-collapse text-sm font-semibold text-(--gray-dark)"
            >
              <thead className="bg-[#cde6ff] text-(--gray-dark)">
                <tr>
                  <th
                    scope="col"
                    className="h-14 w-[72px] px-6 text-center font-bold"
                  >
                    순위
                  </th>
                  <th scope="col" className="px-6 text-left font-bold">
                    레벨
                  </th>
                  <th scope="col" className="px-6 text-center font-bold">
                    클리어 시간(초)
                  </th>
                  <th scope="col" className="px-6 text-center font-bold">
                    기록 시각
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr
                    key={record.id ?? `${record.levelId}-${record.timestamp}-${index}`}
                    className="border-t border-[rgba(63,72,82,0.08)] odd:bg-white/55"
                  >
                    <th scope="row" className="px-6 py-4 text-center font-semibold">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4 text-left font-semibold text-(--black)">
                      {record.levelLabel ?? record.levelId}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {formatSeconds(record.clearSeconds)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {formatTimestamp(record.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-sm font-semibold text-(--gray-dark)">
            아직 등록된 클리어 기록이 없어요
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingBoard;
