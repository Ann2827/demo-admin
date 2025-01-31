import { IPost, ITask, IUser } from '@/types/validation';
export function mockSuccessAnswer<T>(payload: T): { body: T } {
  return {
    body: payload,
  };
}

export const mockPosts: IPost[] = [];
export const mockUsers: IUser[] = [];
export const mockTasks: ITask[] = [];
