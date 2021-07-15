import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { isErrorResponse } from 'src/helpers/typeGuards';
import { ErrorResponse } from 'src/types/common';
import { PostApiResponse, PostsApiResponse, PostPayload, PostsPayload } from 'src/types/sanity';

import { getPostThunk, getPostsThunk } from './actions';

type SanityStore = {
  post?: PostApiResponse;
  postError?: ErrorResponse;
  postPayload?: PostPayload;
  postState?:
    | typeof getPostThunk.pending.type
    | typeof getPostThunk.rejected.type
    | typeof getPostThunk.fulfilled.type;
  posts?: PostsApiResponse;
  postsError?: ErrorResponse;
  postsPayload?: PostsPayload;
  postsState?:
    | typeof getPostsThunk.pending.type
    | typeof getPostsThunk.rejected.type
    | typeof getPostsThunk.fulfilled.type;
};

const initialState: SanityStore = {};

/* eslint-disable no-param-reassign */
export const slice = createSlice({
  name: 'sanity',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (_state, action: AnyAction) => action.payload.sanity)
      // Post
      .addCase(getPostThunk.pending, (state, action) => {
        state.post = initialState.post;
        state.postPayload = action.meta.arg;
        state.postError = initialState.postError;
        state.postState = getPostThunk.pending.type;
      })
      .addCase(getPostThunk.rejected, (state, action: PayloadAction<unknown>) => {
        if (action.payload && isErrorResponse(action.payload)) {
          state.postError = action.payload;
        }
        state.postState = getPostThunk.rejected.type;
      })
      .addCase(getPostThunk.fulfilled, (state, action: PayloadAction<PostApiResponse>) => {
        state.post = action.payload;
        state.postState = getPostThunk.fulfilled.type;
      })
      // Posts
      .addCase(getPostsThunk.pending, (state, action) => {
        state.postsPayload = action.meta.arg;
        state.postsError = initialState.postError;
        state.postsState = getPostsThunk.pending.type;
      })
      .addCase(getPostsThunk.rejected, (state, action: PayloadAction<unknown>) => {
        if (action.payload && isErrorResponse(action.payload)) {
          state.postsError = action.payload;
        }
        state.postsState = getPostsThunk.rejected.type;
      })
      .addCase(getPostsThunk.fulfilled, (state, action: PayloadAction<PostsApiResponse>) => {
        const { page, pages, posts } = action.payload;
        const newPosts = {
          page,
          pages,
          posts: state.posts ? state.posts.posts.concat(posts) : posts,
        };

        state.posts = newPosts;
        state.postsState = getPostsThunk.fulfilled.type;
      });
  },
  reducers: {
    resetPosts(state) {
      ['posts', 'postsError', 'postsState', 'postsPayload'].forEach((prop) => {
        state[prop] = initialState[prop];
      });
    },
    setServerState(_state, action: PayloadAction<SanityStore>) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const { clear, resetPosts, setServerState } = slice.actions;
export { getPost, getPosts, getPostThunk, getPostsThunk } from './actions';
export { selectPost, selectPosts } from './selectors';

export default slice.reducer;
