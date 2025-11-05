import { useCallback, useState } from 'react';
import { generateClientId } from '../utils/id.js';

export const useFlipHistory = ({ maxEntries = 10 } = {}) => {
  const [history, setHistory] = useState([]);

  const resetHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const addEntry = useCallback(
    (cards, result) => {
      setHistory((prev) => {
        const nextEntry = {
          id: generateClientId(),
          cards,
          result,
        };
        return [nextEntry, ...prev].slice(0, maxEntries);
      });
    },
    [maxEntries],
  );

  return { history, addEntry, resetHistory };
};
