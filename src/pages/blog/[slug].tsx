import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { wrapper } from 'src/store';
import { isErrorResponse } from 'src/helpers/typeGuards';
import { getPost, getPosts, getPostThunk, setServerState } from 'src/store/sanity';
import BlogPost from 'src/containers/blog-post/BlogPost';
import { PostServerResponse } from 'src/types/sanity';
import { LOCALE_CATCH_ALL } from 'src/types/config';

type Props = {
  preloaded: boolean;
  slug: string;
};

const BlogPostPage: NextPage<Props> = (props) => (
  <BlogPost preloaded={props.preloaded} slug={props.slug} />
);

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = wrapper.getStaticProps(
  (store) => async (ctx) => {
    const params = ctx.params as Params;
    const payload = { slug: params.slug };

    const response: PostServerResponse = { postPayload: payload, postState: '' };

    try {
      const data = await getPost(payload);
      response.post = data;
      response.postState = getPostThunk.fulfilled.type;
    } catch (e) {
      response.postState = getPostThunk.rejected.type;
      if (isErrorResponse(e)) response.postError = e;
    }

    store.dispatch(setServerState(response));
    return { props: { preloaded: true, slug: params.slug } };
  },
);

export const getStaticPaths: GetStaticPaths<{ locales: string[] }> = async ({ locales }) => {
  const posts = await getPosts({ page: 1, postsPerPage: 9999 });
  const slugs = posts.posts.map((p) => p.slug);

  const paths = [];
  slugs.forEach((slug) => {
    locales.forEach((locale) => {
      if (locale === LOCALE_CATCH_ALL) return;
      paths.push({
        params: { slug },
        locale,
      });
    });
  });

  return { paths, fallback: false };
};

export default BlogPostPage;
