import React, { FC, useEffect, useState } from 'react';

import BlogItems from 'src/components/blog-items/BlogItems';
import Head from 'src/components/head/Head';
import useTranslate from 'src/hooks/useTranslate';
import { useDispatch } from 'src/store';
import { getPostsThunk, selectPosts } from 'src/store/sanity';

import localization from './Blog.localization';

const Blog: FC = () => {
  const dispatch = useDispatch();
  const translate = useTranslate(localization);

  const { error, isFailure, isLoading, result } = selectPosts();
  const page = result?.page || 0;
  const pagesTotal = result?.pages || 0;
  const posts = result?.posts;

  const [requestedPage, setRequestedPage] = useState(result?.page || 1);

  useEffect(() => {
    if (requestedPage > page) dispatch(getPostsThunk({ page: requestedPage, postsPerPage: 4 }));
  }, [page, requestedPage]);

  return (
    <>
      <Head translate={translate} />
      <div className="flex flex-col flex-1 items-center justify-center">
        <BlogItems
          className="p-4 w-full"
          error={error}
          isFailure={isFailure}
          isLoading={isLoading}
          handleLoadMore={pagesTotal > page ? () => setRequestedPage((old) => old + 1) : undefined}
          posts={posts}
          title={translate('pageTitle')}
        />
      </div>
    </>
  );
};

export default Blog;
