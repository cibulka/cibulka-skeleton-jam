import { combineReducers } from '@reduxjs/toolkit';

import app from './app';
import authorization from './authorization';
import data from './data';
import sanity from './sanity';

export const rootReducer = combineReducers({
  app,
  authorization,
  data,
  sanity,
});

export type RootState = ReturnType<typeof rootReducer>;
