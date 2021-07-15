import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import getQueryStringFromObject from 'src/helpers/getQueryStringFromObject';
import { getErrorResponse } from 'src/helpers/fetch';
import { UsersPayload, UsersApiReponse } from 'src/types/data';

// Types

// Actions
export async function getUsers(payload: UsersPayload): Promise<UsersApiReponse> {
  const response = await axios.get(
    `https://randomuser.me/api?${getQueryStringFromObject(payload)}`,
  );
  return response.data;
}

// Thunks
const USER_ACTION = 'data/users';
export const getUsersThunk = createAsyncThunk(
  USER_ACTION,
  async (payload: UsersPayload, action) => {
    try {
      return await getUsers(payload);
    } catch (error) {
      return action.rejectWithValue(getErrorResponse(USER_ACTION, error));
    }
  },
);
