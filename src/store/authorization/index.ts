import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthorizationStore = {
  isLocalStorageLoaded: boolean;
  token?: string;
};

const initialState: AuthorizationStore = {
  isLocalStorageLoaded: false,
};

/* eslint-disable no-param-reassign */
export const slice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setAuthorizationStoreFromLocalStorage: (_state, action: PayloadAction<string>) => ({
      ...JSON.parse(action.payload),
      isLocalStorageLoaded: true,
    }),
    clear() {
      return initialState;
    },
  },
});

export const { clear, setAuthorizationStoreFromLocalStorage, setToken } = slice.actions;

export default slice.reducer;
