import { configureStore, getDefaultMiddleware, Store } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import {
  createSelectorHook,
  useDispatch as useReduxDispatch
} from "react-redux";

import { rootReducer, RootState } from "./reducers";

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type
 */

const middlewares = getDefaultMiddleware<RootState>();

export const makeStore: MakeStore<Store<RootState>> = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: process.env.NODE_ENV === "development"
  });
  return store;
};

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  // debug: process.env.NODE_ENV === 'development',
  debug: false
});

export const useSelector = createSelectorHook<RootState>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDispatch: any = () => useReduxDispatch<any>();
