import { useSelector } from 'src/store';
import { PostPayload, PostResponse, PostsResponse } from 'src/types/sanity';

import { getPostThunk, getPostsThunk } from './actions';

export function selectPost(payload: PostPayload): PostResponse {
  return useSelector((state) => {
    const { postPayload } = state.sanity;
    if (postPayload && postPayload.slug !== payload.slug)
      return {
        isFailure: false,
        isLoading: false,
        isSuccess: false,
      };

    return {
      error: state.sanity.postError,
      isFailure: state.sanity.postState === getPostThunk.rejected.type,
      isLoading: state.sanity.postState === getPostThunk.pending.type,
      isSuccess: state.sanity.postState === getPostThunk.fulfilled.type,
      payload: state.sanity.postPayload || undefined,
      result: state.sanity.post || undefined,
    };
  });
}

export function selectPosts(): PostsResponse {
  return useSelector((state) => ({
    error: state.sanity.postsError,
    isFailure: state.sanity.postsState === getPostsThunk.rejected.type,
    isLoading: state.sanity.postsState === getPostsThunk.pending.type,
    isSuccess: state.sanity.postsState === getPostsThunk.fulfilled.type,
    payload: state.sanity.postsPayload || undefined,
    result: state.sanity.posts || undefined,
  }));
}
