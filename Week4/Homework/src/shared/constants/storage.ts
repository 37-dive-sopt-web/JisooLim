export const STORAGE_KEYS = {
  accessToken: "accessToken",
  userId: "userId",
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;