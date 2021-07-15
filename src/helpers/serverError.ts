import { NextApiResponse } from 'next';
import { AxiosError } from 'axios';

import { isAxiosError } from 'src/helpers/typeGuards';

function getErrorCode(status: number, errors: Record<string, string> | undefined) {
  const firstErrorName = errors ? Object.keys(errors)[0] : undefined;
  return firstErrorName ? `${status}-${firstErrorName}` : `${status}-unknown`;
}

export default function handleServerError(res: NextApiResponse, err: Error | AxiosError): void {
  if (isAxiosError(err)) {
    res.status(err.response.status).send({
      status: err.response.status,
      errorCode: getErrorCode(err.response.status, err.response.data.errors),
      errors: err.response.data.errors,
    });
  } else {
    res.send({
      status: 500,
      errorCode: '500-unknown',
      errors: {
        unknown: err.message,
      },
    });
  }
}
