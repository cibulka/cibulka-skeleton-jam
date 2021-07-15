import React, { FC } from 'react';
import { useWatch, Control, FieldError } from 'react-hook-form';

import { InputNumberValidation, InputTextValidation } from 'src/types/form';
import { Translate } from 'src/types/translate';

const ErrorMessage: FC<{
  control: Control;
  defaultValue?: string;
  error: FieldError;
  name: string;
  translate: Translate;
  validation: InputTextValidation | InputNumberValidation;
}> = (props) => {
  const { maxLength, minLength } = props.validation as InputTextValidation;
  const { max, min } = props.validation as InputNumberValidation;

  const value = useWatch({
    control: props.control,
    name: props.name,
    defaultValue: props.defaultValue || '',
  });

  if (props.error.type === 'required') {
    return <span>{props.translate('common.errorsForm.required')}</span>;
  }
  if (props.error.type === 'max') {
    return <span>{props.translate('common.errorsForm.max', max, { value })}</span>;
  }
  if (props.error.type === 'min') {
    return <span>{props.translate('common.errorsForm.min', min, { value })}</span>;
  }
  if (props.error.type === 'maxLength') {
    return <span>{props.translate('common.errorsForm.maxLength', maxLength, { value })}</span>;
  }
  if (props.error.type === 'minLength') {
    return <span>{props.translate('common.errorsForm.minLength', minLength, { value })}</span>;
  }
  return null;
};

export default ErrorMessage;
