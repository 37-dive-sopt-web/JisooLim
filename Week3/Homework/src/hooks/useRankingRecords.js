import { useCallback, useEffect, useState } from 'react';
import { generateClientId } from '../utils/id.js';
import { sortRecordsByTime } from '../utils/ranking.js';

export const useRankingRecords = ({
  storageKey,
  levels = [],
  levelOrder = {},
}) => {
  const [records, setRecords] = useState([]);

  const addRecord = useCallback(
    (record) => {
      setRecords((prev) => sortRecordsByTime([...prev, record], levelOrder));
    },
    [levelOrder],
  );

  const resetRecords = useCallback(() => {
    setRecords([]);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedValue = window.localStorage.getItem(storageKey);
      if (!storedValue) {
        return;
      }

      const parsed = JSON.parse(storedValue);
      if (!Array.isArray(parsed)) {
        return;
      }

      const normalized = parsed
        .map((record) => {
          const levelMeta = levels.find((level) => level.id === record.levelId);
          return {
            id: record.id ?? generateClientId(),
            levelId: record.levelId,
            levelLabel: record.levelLabel ?? levelMeta?.label ?? record.levelId,
            clearSeconds: Number.isFinite(Number(record.clearSeconds))
              ? Number(Number(record.clearSeconds).toFixed(2))
              : 0,
            timestamp: record.timestamp ?? new Date().toISOString(),
          };
        })
        .filter((record) => Boolean(record.levelId));

      setRecords(sortRecordsByTime(normalized, levelOrder));
    } catch (error) {
      console.error('랭킹 데이터를 불러오는 중 문제가 발생했어요.', error);
    }
  }, [levels, levelOrder, storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (records.length === 0) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(records));
  }, [records, storageKey]);

  return { records, addRecord, resetRecords };
};
