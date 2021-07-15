import { createAsyncThunk } from '@reduxjs/toolkit';

import { getErrorResponse } from 'src/helpers/fetch';
import { sanityClient } from 'src/helpers/sanity';
import { PostApiResponse, PostPayload, PostsApiResponse, PostsPayload } from 'src/types/sanity';

// Fields
// =============================================================================

const postFields = `
    _id,
    "slug": slug.current,
    title,
    mainImage,
`;

// Queries
// =============================================================================

const postsQuery = `{
    "posts": *[_type == "post"] | order(_createdAt) {${postFields}}[$start...$end],
    "count": count(*[_type == "post"])
}`;

const postQuery = `{
    "post": *[_type == "post" && slug.current == $slug][0]{
        content,
        ${postFields}
    },
    "related": *[_type == "post" && slug.current != $slug][0...4]{
        ${postFields}
    },
}`;

// Actions
// =============================================================================

export async function getPosts(payload: PostsPayload): Promise<PostsApiResponse> {
  const { page } = payload;
  const start = (page - 1) * payload.postsPerPage;
  const end = page * payload.postsPerPage;

  const response = await sanityClient.fetch(postsQuery, { start, end });

  return {
    page,
    pages: Math.ceil(response.count / payload.postsPerPage),
    posts: response.posts,
  };
}

export async function getPost(payload: PostPayload): Promise<PostApiResponse> {
  const response = await sanityClient.fetch(postQuery, payload);
  return response;
}

// Thunks
// =============================================================================

const GET_POST = 'sanity/post';
export const getPostThunk = createAsyncThunk(GET_POST, async (payload: PostPayload, action) => {
  try {
    return await getPost(payload);
  } catch (error) {
    return action.rejectWithValue(getErrorResponse(GET_POST, error));
  }
});

const GET_POSTS = 'sanity/posts';
export const getPostsThunk = createAsyncThunk(GET_POSTS, async (payload: PostsPayload, action) => {
  try {
    return await getPosts(payload);
  } catch (error) {
    return action.rejectWithValue(getErrorResponse(GET_POSTS, error));
  }
});
