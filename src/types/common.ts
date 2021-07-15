export interface ErrorResponse {
  status: number;
  typePrefix: string;
}

export interface ErrorResponseHandled extends ErrorResponse {
  errorCode: string;
  errors: Record<string, string>;
}

export interface Response {
  error?: ErrorResponse;
  isFailure: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  payload?: unknown;
  result?: unknown;
}
