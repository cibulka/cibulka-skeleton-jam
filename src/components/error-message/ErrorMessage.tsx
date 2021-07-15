import React, { FC, useEffect } from 'react';

import getErrorMessage from 'src/helpers/getErrorMessage';
import { Replacements, Translate } from 'src/types/translate';

const ErrorMessage: FC<{
  className?: string;
  classNameTheme?: string;
  error?: unknown;
  replacements?: Replacements;
  translate: Translate;
}> = (props) => {
  useEffect(() => {
    /* eslint-disable-next-line no-console */
    if (process.env.NODE_ENV === 'development') console.warn(props.error);
  }, []);

  return (
    <div
      role="alert"
      className={[props.className, props.classNameTheme || 'bg-red-500 p-2'].join(' ')}
    >
      {getErrorMessage(props.error, props.translate, props.replacements)}
    </div>
  );
};

export default ErrorMessage;
