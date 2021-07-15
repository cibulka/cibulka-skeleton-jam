import { NextApiRequest } from 'next';
import { AxiosError } from 'axios';

import { ErrorResponseHandled } from 'src/types/common';
import { isAxiosError } from 'src/helpers/typeGuards';

export function getErrorResponse(
  typePrefix: string,
  error: Error | AxiosError | null,
): ErrorResponseHandled {
  if (!error) throw new Error('Unknown error');

  if (!isAxiosError(error)) throw error;

  if (!error.response) throw error;

  return {
    errorCode: error.response.data.errorCode,
    status: error.response.status,
    errors: error.response.data.errors,
    typePrefix,
  };
}

export function isFirstServerRender(req: NextApiRequest): boolean {
  return req.url?.indexOf('/_next/data/') === -1;
}
