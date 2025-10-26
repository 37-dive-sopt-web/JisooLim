import { defaultMembers } from './data.js';

const STORAGE_KEY = 'membersData';

export const seedMembers = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMembers));
  }
};

export const getMembers = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export const saveMembers = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const getNextMemberId = (list) =>
  list.reduce((max, member) => Math.max(max, member.id ?? 0), 0) + 1;
