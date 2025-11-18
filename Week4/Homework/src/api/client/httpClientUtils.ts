import type { KyResponse } from "ky";
import { STORAGE_KEYS } from "@/shared/constants/storage";
import { ApiError, isApiErrorResponse } from "../errors";

export const attachAuthHeader = (
  request: Request,
  tokenKey: string = STORAGE_KEYS.accessToken
) => {
  const token = window.localStorage.getItem(tokenKey);
  if (!token) return;
  request.headers.set("Authorization", `Bearer ${token}`);
};

export const parseJsonSafely = async (response: KyResponse) => {
  try {
    return await response.clone().json();
  } catch {
    return undefined;
  }
};

export const toApiErrorIfPossible = (payload: unknown, status: number) => {
  if (payload && isApiErrorResponse(payload)) {
    throw new ApiError(payload, status);
  }
};

export const buildFallbackMessage = (
  payload: unknown,
  status: number
): string => {
  if (
    payload &&
    typeof payload === "object" &&
    "message" in payload &&
    typeof (payload as { message?: unknown }).message === "string"
  ) {
    return (payload as { message: string }).message;
  }

  return `요청 실패 ${status}`;
};
