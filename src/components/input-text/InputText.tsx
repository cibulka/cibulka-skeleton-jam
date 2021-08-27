import React, { FC, HTMLAttributes } from 'react';

import { InputTextValidation } from 'src/types/form';

// TODO: Rename to FormInputText
/* eslint-disable jsx-a11y/no-autofocus, react/jsx-props-no-spreading */
const InputText: FC<{
  autoComplete?: 'on' | 'off';
  autoFocus?: boolean;
  className?: string;
  name: string;
  register: (name: string, validation?: InputTextValidation) => HTMLAttributes<HTMLInputElement>;
  type: 'text' | 'password';
  validation?: InputTextValidation;
}> = (props) => (
  <input
    autoComplete={props.autoComplete}
    autoFocus={props.autoFocus}
    className={props.className}
    type={props.type}
    {...props.register(props.name, props.validation || undefined)}
  />
);

InputText.defaultProps = {
  autoComplete: 'off',
};

export default InputText;
