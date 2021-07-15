import React, { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'src/store';
import { setTestValue } from 'src/store/app';
import FormErrorMessage from 'src/components/form-error-message/FormErrorMessage';
import Icon from 'src/components/icon/Icon';
import InputText from 'src/components/input-text/InputText';
import { Translate } from 'src/types/translate';

type Form = {
  testValue: string;
};

const Redux: FC<{
  translate: Translate;
}> = (props) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const dispatch = useDispatch();
  const testValue: string = useSelector((state) => state.app.test || '');
  const defaultValues: FieldValues = { testValue };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const onSubmit = (values: Form) => {
    dispatch(setTestValue(values.testValue));
    setIsOpenForm(false);
  };
  const validation = {
    testValue: {
      maxLength: 10,
      minLength: 3,
      required: true,
    },
  };

  return (
    <article>
      <h2 className="font-bold mb-4">{props.translate('reduxTest.title')}</h2>
      <p className="mb-4">{props.translate('reduxTest.excerpt')}</p>
      {isOpenForm ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <button className="mr-4" type="button" onClick={() => setIsOpenForm(false)}>
              <Icon icon="arrow-left" />
            </button>
            <InputText
              autoFocus
              className="border mr-4"
              name="testValue"
              type="text"
              register={register}
              validation={validation.testValue}
            />
            <button type="submit" className="text-sm font-bold">
              {props.translate('common.submit')}
            </button>
          </div>
          {errors && errors.testValue && (
            <p className="mt-4 text-xs text-red-500" role="alert">
              <FormErrorMessage
                control={control}
                defaultValue={testValue || ''}
                error={errors.testValue}
                name="testValue"
                translate={props.translate}
                validation={validation.testValue}
              />
            </p>
          )}
        </form>
      ) : (
        <div className="flex items-center font-mono">
          <button type="button" onClick={() => setIsOpenForm(true)}>
            <Icon icon="pen" />
          </button>
          <div className="ml-4">{testValue || '---'}</div>
        </div>
      )}
    </article>
  );
};

export default Redux;
