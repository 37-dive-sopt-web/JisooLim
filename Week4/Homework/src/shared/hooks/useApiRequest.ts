import { useCallback, useState } from "react";
import { ApiError } from "@/api";

interface UseApiRequestOptions {
  defaultErrorMessage?: string;
}

interface ApiRequestState<TResult> {
  data: TResult | null;
  error: string | null;
  isLoading: boolean;
}

const extractErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
};

export const useApiRequest = <TArgs extends unknown[], TResult>(
  requestFn: (...args: TArgs) => Promise<TResult>,
  { defaultErrorMessage = "요청 실패" }: UseApiRequestOptions = {},
) => {
  const [state, setState] = useState<ApiRequestState<TResult>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: TArgs) => {
      setState({ data: null, error: null, isLoading: true });
      try {
        const result = await requestFn(...args);
        setState({ data: result, error: null, isLoading: false });
        return result;
      } catch (error) {
        const message = extractErrorMessage(error, defaultErrorMessage);
        setState({ data: null, error: message, isLoading: false });
        throw error;
      }
    },
    [requestFn, defaultErrorMessage],
  );

  return { ...state, execute };
};

export default useApiRequest;
