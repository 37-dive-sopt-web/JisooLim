export const LEVELS = [
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

export const RANKING_STORAGE_KEY = 'game-ranking';

export const LEVEL_ORDER = LEVELS.reduce((accumulator, level, index) => {
  accumulator[level.id] = index;
  return accumulator;
}, {});