import { IPost, ITask, IUser } from '@/types/validation';
export function mockSuccessAnswer<T>(payload: T): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    statusText: 'OK',
  });
}

export const mockPosts: IPost[] = [];
export const mockUsers: IUser[] = [{ id: 1, email: 'test@mail.ru', firstName: 'Ann', lastName: 'Bystrova' }];
export const mockTasks: ITask[] = [];
