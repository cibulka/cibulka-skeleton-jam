import React, { FC, useEffect, useState } from 'react';

import ErrorMessage from 'src/components/error-message/ErrorMessage';
import { useDispatch, useSelector } from 'src/store';
import { Translate } from 'src/types/translate';
import { User, UsersResponse } from 'src/types/data';
import { getUsersThunk, selectUsers } from 'src/store/data';

const DataClient: FC<{
  translate: Translate;
}> = (props) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const usersIsMaxPage = useSelector((state) => state.data.usersIsMaxPage);
  const { error, isFailure, isLoading, isSuccess, result }: UsersResponse = selectUsers();

  useEffect(() => {
    dispatch(getUsersThunk({ page, results: 10 }));
  }, [page]);

  return (
    <article>
      <h2 className="font-bold mb-4">{props.translate('dataClient.title')}</h2>
      <p className="mb-4">{props.translate('dataClient.excerpt')}</p>
      {isFailure && (
        <ErrorMessage
          className="bg-red-500 text-xs py-2 px-2 mb-4"
          error={error}
          translate={props.translate}
        />
      )}
      {result && result.length > 0 && (
        <div className="mb-4">
          <ul className="grid grid-cols-2 gap-x-4 text-xs">
            {result.map((user: User, userIndex: number) => (
              <li className="border-b py-1" key={userIndex}>
                {Object.values(user.name).join(' ')}
              </li>
            ))}
          </ul>
          {!usersIsMaxPage && !isLoading && (
            <div className="mt-4">
              <button
                className="flex border border-gray-400 bg-gray-100 rounded p-1"
                type="button"
                onClick={() => setPage((old) => old + 1)}
              >
                {props.translate('common.loadMore')}
              </button>
            </div>
          )}
        </div>
      )}
      {isSuccess && result.length === 0 && <span>{props.translate('dataClient.empty')}</span>}
      {isLoading && <p>{props.translate('common.loading')}</p>}
    </article>
  );
};

export default DataClient;
