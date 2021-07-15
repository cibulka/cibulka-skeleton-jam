import React, { FC } from 'react';

import BlogItem from 'src/components/blog-item/BlogItem';
import ErrorMessage from 'src/components/error-message/ErrorMessage';
import useSizes from 'src/hooks/useSizes';
import useTranslate from 'src/hooks/useTranslate';
import { Post } from 'src/types/sanity';
import { Translate } from 'src/types/translate';

import localization from './BlogItems.localization';

const BlogItems: FC<{
  className?: string;
  error?: unknown;
  handleLoadMore?: () => void;
  isFailure: boolean;
  isLoading: boolean;
  posts: Post[];
  title: string;
  translate?: Translate;
}> = (props) => {
  const defaultTranslate = useTranslate(localization);
  const translate = props.translate || defaultTranslate;

  const sizes = useSizes('50vw', {
    lg: '25vw',
  });

  return (
    <section className={props.className}>
      <h2 className="text-4xl text-center">{props.title}</h2>

      <div className="mt-8">
        {props.isFailure && <ErrorMessage error={props.error} translate={translate} />}

        {props.posts && props.posts.length === 0 && !props.isFailure && !props.isLoading && (
          <div className="bg-gray-500 p-2">{translate('common.emptySection')}</div>
        )}

        {props.posts && props.posts.length > 0 && (
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {props.posts.map((post: Post, i: number) => (
              <li key={i} className="mb-4">
                <BlogItem post={post} sizes={sizes} />
              </li>
            ))}
          </ul>
        )}

        {props.isLoading && (
          <div className="text-lg font-italic">{translate('common.loading')}</div>
        )}

        {props.handleLoadMore && !props.isLoading && (
          <button
            className="rounded border p-2 bg-yellow-500"
            type="button"
            onClick={() => props.handleLoadMore()}
          >
            {translate('common.loadMore')}
          </button>
        )}
      </div>
    </section>
  );
};

export default BlogItems;
