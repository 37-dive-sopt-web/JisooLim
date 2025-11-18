import type { ApiErrorResponse } from "../types";

export const isApiErrorResponse = (
  value: unknown,
): value is ApiErrorResponse => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ApiErrorResponse>;
  if (candidate.success !== false) return false;
  if (typeof candidate.code !== "string" || typeof candidate.message !== "string")
    return false;

  if (candidate.data === undefined) return true;
  if (!candidate.data || typeof candidate.data !== "object") return false;

  const { code, message } = candidate.data as Partial<ApiErrorResponse["data"]>;
  if (code !== undefined && typeof code !== "string") return false;
  if (message !== undefined && typeof message !== "string") return false;

  return true;
};

export const extractApiErrorMessage = (response: ApiErrorResponse) =>
  response.data?.message ?? response.message;

export class ApiError extends Error {
  code: string;
  status: number;
  response: ApiErrorResponse;

  constructor(payload: ApiErrorResponse, status: number) {
    super(extractApiErrorMessage(payload));
    this.name = "ApiError";
    this.code = payload.code;
    this.status = status;
    this.response = payload;
  }
}
