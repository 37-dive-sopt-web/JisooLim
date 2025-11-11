export interface ApiSuccessResponse<TData> {
  data: TData;
  message?: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}