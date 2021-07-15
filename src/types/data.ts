import { Response } from './common';

// User
// ======================================================================

export type User = {
  name: {
    title: string;
    first: string;
    last: string;
  };
};

// https://randomuser.me/documentation
export type UsersPayload = {
  exc?: string;
  inc?: string;
  page?: number;
  results?: number;
};

export type UsersApiReponse = {
  info: {
    page: number;
  };
  results: User[];
};

export interface UsersResponse extends Response {
  payload?: UsersPayload;
  result?: User[];
}
