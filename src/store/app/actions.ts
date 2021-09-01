import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { getErrorResponse } from 'src/helpers/fetch';

// Actions
export async function getApiTest() {
  const response = await axios.get('/api/test');
  return response.data;
}

// Thunks
const TEST = 'app/apiTest';
export const getApiTestThunk = createAsyncThunk(TEST, async (_payload, action) => {
  try {
    return await getApiTest();
  } catch (error) {
    return action.rejectWithValue(getErrorResponse(TEST, error));
  }
});
