import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UsersApiReponse } from 'src/types/data';

import { getUsersThunk } from './actions';

type AppStore = {
  users?: User[];
  usersIsMaxPage?: boolean;
};

const initialState: AppStore = {};

/* eslint-disable no-param-reassign */
export const slice = createSlice({
  name: 'data',
  initialState,
  extraReducers: (builder) => {
    builder
      // User
      .addCase(getUsersThunk.fulfilled, (state, action: PayloadAction<UsersApiReponse>) => {
        const users = state.users || [];
        state.users = users.concat(action.payload.results);
        state.usersIsMaxPage = action.payload.results.length === 0;
      });
  },
  reducers: {
    clear() {
      return initialState;
    },
  },
});

export const { clear } = slice.actions;
export { getUsersThunk } from './actions';
export { selectUsers } from './selectors';

export default slice.reducer;
