import { ErrorResponse, Response } from './common';

// Entities
// ======================================================================

export type Post = {
  content?: string;
  mainImage: string;
  slug: string;
  title: string;
};

// QUERY: Posts
// ======================================================================

export type PostsPayload = {
  page: number;
  postsPerPage: number;
};

export type PostsApiResponse = {
  page: number;
  pages: number;
  posts: Post[];
};

export interface PostsResponse extends Response {
  payload?: PostsPayload;
  result: PostsApiResponse;
}

export type PostsServerResponse = {
  postsError?: ErrorResponse;
  posts?: PostsApiResponse;
  postsPayload?: PostsPayload;
  postsState: string;
};

// QUERY: Post
// ======================================================================

export type PostPayload = {
  slug: string;
};

export type PostApiResponse = {
  post: Post;
  related: Post[];
};

export interface PostResponse extends Response {
  payload?: PostPayload;
  result?: PostApiResponse;
}

export type PostServerResponse = {
  postError?: ErrorResponse;
  post?: PostApiResponse;
  postPayload?: PostPayload;
  postState: string;
};
