import React, { FC } from 'react';
import Link from 'next/link';
import Img from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';

import Icon from 'src/components/icon/Icon';
import { sanityClient } from 'src/helpers/sanity';
import { Post } from 'src/types/sanity';

const BlogItem: FC<{ post: Post; sizes: string }> = (props) => {
  const imageProps = useNextSanityImage(sanityClient, props.post.mainImage);

  return (
    <Link href={`/blog/${props.post.slug}`}>
      <a className="block">
        <h3 className="font-bold mb-4 underline">{props.post.title}</h3>
        <div className="relative bg-gray-100 aspect-w-16 aspect-h-9">
          {imageProps ? (
            <Img
              src={imageProps.src}
              loader={imageProps.loader}
              layout="fill"
              objectFit="cover"
              sizes={props.sizes}
            />
          ) : (
            <div className="absolute t-0 l-0 w-full h-full flex items-center justify-center">
              <Icon icon="pen" className="w-8 h-8" />
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default BlogItem;
