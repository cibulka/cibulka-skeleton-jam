import { isErrorResponse, isErrorResponseHandled } from 'src/helpers/typeGuards';
import { ErrorResponse, ErrorResponseHandled } from 'src/types/common';
import { Replacements, Translate } from 'src/types/translate';

export default function getErrorMessage(
  error: unknown,
  translate: Translate,
  replacements?: Replacements,
  count = 1,
): string {
  const errorResponseHandled = isErrorResponseHandled(error)
    ? (error as ErrorResponseHandled)
    : undefined;
  const errorResponse = isErrorResponse(error) ? (error as ErrorResponse) : undefined;
  const errorObject = error instanceof Error ? (error as Error) : undefined;
  const errorMessage = typeof error === 'string' ? (error as string) : undefined;

  if (errorResponseHandled)
    return translate(`common.errors.${errorResponseHandled.errorCode}`, count, replacements);
  if (errorResponse) return translate(`common.errors.${errorResponse.status}`, count, replacements);
  if (errorObject) return errorObject.message;
  if (errorMessage) return errorMessage;
  return translate('common.error', count, replacements);
}
