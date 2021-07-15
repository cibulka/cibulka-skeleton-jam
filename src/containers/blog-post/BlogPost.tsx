import React, { FC, useEffect } from 'react';
import Img from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

import BlogItems from 'src/components/blog-items/BlogItems';
import ErrorMessage from 'src/components/error-message/ErrorMessage';
import { sanityClient } from 'src/helpers/sanity';
import { useDispatch } from 'src/store';
import { getPostThunk, selectPost } from 'src/store/sanity';
import useTranslate from 'src/hooks/useTranslate';
import { Post } from 'src/types/sanity';

import localization from './BlogPost.localization';

const BlogPost: FC<{ preloaded: boolean; slug: string }> = (props) => {
  const dispatch = useDispatch();
  const translate = useTranslate(localization);

  const s = selectPost({ slug: props.slug });
  const { error, isFailure, isLoading, isSuccess, payload, ...response } = s;
  const post: Post = response?.result?.post;
  const related: Post[] = response?.result?.related;
  const imageProps = useNextSanityImage(sanityClient, post?.mainImage);

  useEffect(() => {
    if (props.preloaded) return;
    if (payload && payload.slug === props.slug) return;
    dispatch(getPostThunk({ slug: props.slug }));
  }, [props.preloaded, payload, props.slug]);

  return (
    <article className="pt-14">
      <header className="px-4 flex flex-col items-center mb-8">
        <h1 className="text-4xl b">{post ? post.title : translate('titleLoading')}</h1>
        <p>{props.slug}</p>
      </header>

      <div className="mb-8">
        {imageProps ? (
          <div className="relative h-33vh min-h-20 bg-gray-100">
            <Img
              src={imageProps.src}
              loader={imageProps.loader}
              layout="fill"
              objectFit="cover"
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="bg-blue-500 p-1" />
        )}
      </div>

      <div className="mb-8">
        <div className="text-lg max-w-lg m-auto">
          {isFailure && <ErrorMessage error={error} translate={translate} />}
          {isLoading && <div>{translate('common.loading')}</div>}
          {isSuccess && (
            <>
              {post && post.content}
              {post && !post.content && translate('common.emptySection')}
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-500 p-1 mb-8" />

      {!isFailure && (
        <div className="px-4">
          <BlogItems
            isFailure={false}
            isLoading={isLoading}
            posts={related}
            title={translate('titleRelated')}
            translate={translate}
          />
        </div>
      )}
    </article>
  );
};

export default BlogPost;
