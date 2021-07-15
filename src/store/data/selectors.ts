import { useSelector } from 'src/store';
import { UsersResponse } from 'src/types/data';

import { getUsersThunk } from './actions';

export const selectUsers = () =>
  useSelector(
    (state): UsersResponse => ({
      error: state.app.usersError,
      isFailure: state.app.usersState === getUsersThunk.rejected.type,
      isLoading: state.app.usersState === getUsersThunk.pending.type,
      isSuccess: state.app.usersState === getUsersThunk.fulfilled.type,
      payload: state.app.usersPayload,
      result: state.data.users,
    }),
  );
