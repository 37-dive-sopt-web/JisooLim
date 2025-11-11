export interface ApiResponse<TData> {
  success: boolean;
  code: string;
  message: string;
  data: TData;
}

export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  data?: unknown;
}
