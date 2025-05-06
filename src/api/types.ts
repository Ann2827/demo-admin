import { IPost, IProfile, ITask, IUser } from '@/types/validation';
import type { IHttpsRequest, RequestManagerBase } from 'request-store-manager';

type TError = { message?: string[]; error?: string; statusCode?: number };
export type TAnswer<T> = { data: T; success: boolean };

export type TTokens = 'main';

export type TStore = {
  profile: IProfile | null;
  posts: IPost[] | null;
  users: IUser[] | null;
  tasks: ITask[] | null;
};

export interface RM extends RequestManagerBase<TTokens, TStore> {
  postAuth: {
    fn: (props: { email: string; password: string }) => IHttpsRequest<TTokens>;
    success: { token: string };
    storeKey: 'profile';
    error: TError;
  };
  getPosts: {
    fn: () => IHttpsRequest<TTokens>;
    success: { posts: IPost[]; total: number };
    storeKey: 'posts';
    error: TError;
  };
  getUsers: {
    fn: () => IHttpsRequest<TTokens>;
    success: { users: IUser[]; total: number };
    storeKey: 'users';
    error: TError;
  };
  deleteUser: {
    fn: (id: number) => IHttpsRequest<TTokens>;
    success: object;
    error: TError;
  };
  patchUser: {
    fn: (id: number, user: Omit<IUser, 'id'>) => IHttpsRequest<TTokens>;
    success: IUser;
    error: TError;
  };
  postUser: {
    fn: (user: Omit<IUser, 'id'> & { password: string }) => IHttpsRequest<TTokens>;
    success: IUser;
    error: TError;
  };
  getTasks: {
    fn: () => IHttpsRequest<TTokens>;
    success: { tasks: ITask[]; total: number };
    storeKey: 'tasks';
    error: TError;
  };
}
