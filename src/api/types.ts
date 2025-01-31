import { IPost, IProfile, ITask, IUser } from '@/types/validation';

import type { IHttpsRequest } from 'library-react-hooks';

type TError = { message?: string[]; error?: string; statusCode?: number };
export type TAnswer<T> = { data: T; success: boolean };

declare module 'library-react-hooks' {
  interface IHttpsResponseCatch {
    success: boolean;
  }
  // -----------------------------------
  interface IHttpsTokenNames {
    names: 'main';
  }
  interface IHttpsRequestsConfig {
    postAuth: [(props: { email: string; password: string }) => IHttpsRequest, { token: string }, TError];
    getPosts: [() => IHttpsRequest, { posts: IPost[]; total: number }, TError];
    getUsers: [() => IHttpsRequest, { users: IUser[]; total: number }, TError];
    deleteUser: [(id: number) => IHttpsRequest, object, TError];
    patchUser: [(id: number, user: Omit<IUser, 'id'>) => IHttpsRequest, IUser, TError];
    postUser: [(user: Omit<IUser, 'id'> & { password: string }) => IHttpsRequest, IUser, TError];
    getTasks: [() => IHttpsRequest, { tasks: ITask[]; total: number }, TError];
  }
  interface INeedsStoreConfig {
    profile: IProfile | null;
    posts: IPost[] | null;
    users: IUser[] | null;
    tasks: ITask[] | null;
  }
}
