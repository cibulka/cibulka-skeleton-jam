import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { getUsersThunk } from 'src/store/data';
import { isErrorResponse } from 'src/helpers/typeGuards';

import { ErrorResponse } from 'src/types/common';
import { UsersPayload } from 'src/types/data';

type AppStore = {
  isFirstLoad: boolean;
  test?: string;
  usersError?: ErrorResponse;
  usersPayload?: UsersPayload;
  usersState?:
    | typeof getUsersThunk.pending.type
    | typeof getUsersThunk.rejected.type
    | typeof getUsersThunk.fulfilled.type;
};

const initialState: AppStore = {
  isFirstLoad: true,
};

/* eslint-disable no-param-reassign */
export const slice = createSlice({
  name: 'app',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state) => {
        state.isFirstLoad = false;
      })
      // User
      .addCase(getUsersThunk.pending, (state, action) => {
        state.usersPayload = action.meta.arg;
        state.usersError = initialState.usersError;
        state.usersState = getUsersThunk.pending.type;
      })
      .addCase(getUsersThunk.rejected, (state, action: PayloadAction<unknown>) => {
        if (action.payload && isErrorResponse(action.payload)) {
          state.usersError = action.payload;
        }
        state.usersState = getUsersThunk.rejected.type;
      })
      .addCase(getUsersThunk.fulfilled, (state) => {
        state.usersState = getUsersThunk.fulfilled.type;
      });
  },
  reducers: {
    setIsAfterFirstLoad: (state) => {
      state.isFirstLoad = false;
    },
    setTestValue: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const { setTestValue } = slice.actions;

export default slice.reducer;
