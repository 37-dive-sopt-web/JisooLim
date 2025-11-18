import type { UserProfile } from "@/api";
import { STORAGE_KEYS } from "@/shared/constants/storage";
import type { MyPageFieldName } from "../fields";

const EMPTY_FORM_VALUES: Record<MyPageFieldName, string> = {
  name: "",
  email: "",
  age: "",
};

export const profileToFormValues = (profile: UserProfile | null) => {
  if (!profile) {
    return { ...EMPTY_FORM_VALUES };
  }

  return {
    name: profile.name ?? "",
    email: profile.email ?? "",
    age: profile.age ? String(profile.age) : "",
  };
};

export const readProfileCache = () => {
  if (typeof window === "undefined") return null;
  const storedId = window.localStorage.getItem(STORAGE_KEYS.userId);
  const cached = window.localStorage.getItem(STORAGE_KEYS.userProfile);
  if (!storedId || !cached) return null;

  try {
    const parsed = JSON.parse(cached) as UserProfile;
    if (String(parsed.id) !== storedId) {
      return null;
    }
    return parsed;
  } catch {
    clearProfileCache();
    return null;
  }
};

export const clearProfileCache = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.userProfile);
};

export const writeProfileCache = (profile: UserProfile | null) => {
  if (typeof window === "undefined") return;
  if (!profile) {
    clearProfileCache();
    return;
  }
  window.localStorage.setItem(STORAGE_KEYS.userProfile, JSON.stringify(profile));
};
