import { AxiosError } from 'axios';
import { ErrorResponse, ErrorResponseHandled } from 'src/types/common';
import { LocalizationValuePlural } from 'src/types/translate';

export function isErrorResponse(error: unknown): error is ErrorResponse {
  if (!error) return false;
  return (
    (error as ErrorResponse).status !== undefined &&
    (error as ErrorResponse).typePrefix !== undefined
  );
}

export function isErrorResponseHandled(error: unknown): error is ErrorResponseHandled {
  if (!error) return false;
  return (
    isErrorResponse(error) &&
    (error as ErrorResponseHandled).errorCode !== undefined &&
    (error as ErrorResponseHandled).errors !== undefined
  );
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function isLocalizationValuePlural(value: unknown): value is LocalizationValuePlural {
  return (
    (value as LocalizationValuePlural).zero !== undefined &&
    (value as LocalizationValuePlural).one !== undefined &&
    (value as LocalizationValuePlural).few !== undefined &&
    (value as LocalizationValuePlural).many !== undefined
  );
}
