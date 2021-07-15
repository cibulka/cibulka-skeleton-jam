import nextConfig from '../../next.config';

export const localeCatchAll = 'LOCALE_CATCH_ALL';

export const locales: string[] = nextConfig.i18n.locales.filter((l) => l !== localeCatchAll);

export type Locale = typeof locales[number];

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
