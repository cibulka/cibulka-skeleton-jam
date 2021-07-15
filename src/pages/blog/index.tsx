import React from 'react';
import { GetStaticProps, NextPage } from 'next';

import BlogContainer from 'src/containers/blog/Blog';
import { wrapper } from 'src/store';
import { isErrorResponse } from 'src/helpers/typeGuards';
import { getPosts, getPostsThunk, setServerState } from 'src/store/sanity';
import { PostsServerResponse } from 'src/types/sanity';

const Blog: NextPage = () => <BlogContainer />;

export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => async () => {
  const payload = { page: 1, postsPerPage: 4 };

  const response: PostsServerResponse = { postsPayload: payload, postsState: '' };

  try {
    const data = await getPosts(payload);
    response.posts = data;
    response.postsState = getPostsThunk.fulfilled.type;
  } catch (e) {
    response.postsState = getPostsThunk.rejected.type;
    if (isErrorResponse(e)) response.postsError = e;
  }

  store.dispatch(setServerState(response));
  return { props: { preloaded: true } };
});

export default Blog;
