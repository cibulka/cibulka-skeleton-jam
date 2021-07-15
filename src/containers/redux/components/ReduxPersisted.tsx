import React, { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'src/store';
import { setToken } from 'src/store/authorization';
import FormErrorMessage from 'src/components/form-error-message/FormErrorMessage';
import Icon from 'src/components/icon/Icon';
import InputText from 'src/components/input-text/InputText';
import { Translate } from 'src/types/translate';

type Form = {
  token: string;
};

const ReduxPersisted: FC<{
  translate: Translate;
}> = (props) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const dispatch = useDispatch();
  const isLocalStorageLoaded = useSelector((state) => state.authorization.isLocalStorageLoaded);
  const token: string = useSelector((state) => state.authorization.token || '');
  const defaultValues: FieldValues = { token };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const onSubmit = (values: Form) => {
    dispatch(setToken(values.token));
    setIsOpenForm(false);
  };
  const validation = {
    token: {
      maxLength: 10,
      minLength: 3,
      required: true,
    },
  };

  return (
    <article>
      <h2 className="font-bold mb-4">{props.translate('reduxPersisted.title')}</h2>
      <p className="mb-4">{props.translate('reduxPersisted.excerpt')}</p>

      {isLocalStorageLoaded ? (
        <>
          {isOpenForm ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex">
                <button className="mr-4" type="button" onClick={() => setIsOpenForm(false)}>
                  <Icon icon="arrow-left" />
                </button>
                <InputText
                  autoFocus
                  className="border mr-4"
                  name="token"
                  type="text"
                  register={register}
                  validation={validation.token}
                />
                <button type="submit" className="text-sm font-bold">
                  {props.translate('common.submit')}
                </button>
              </div>
              {errors && errors.testValue && (
                <p className="mt-4 text-xs text-red-500" role="alert">
                  <FormErrorMessage
                    control={control}
                    defaultValue={token || ''}
                    error={errors.token}
                    name="token"
                    translate={props.translate}
                    validation={validation.token}
                  />
                </p>
              )}
            </form>
          ) : (
            <div className="flex items-center font-mono">
              <button type="button" onClick={() => setIsOpenForm(true)}>
                <Icon icon="pen" />
              </button>
              <div className="ml-4">{token || '---'}</div>
            </div>
          )}
        </>
      ) : (
        <span>{props.translate('common.loading')}</span>
      )}
    </article>
  );
};

export default ReduxPersisted;
