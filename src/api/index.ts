import { RequestManager } from 'request-store-manager';

import { IsArray, IsNumber, IsObject, IsPost, IsProfile, IsString, IsTask, IsUser } from '@/types/guards';
import { IPost, IProfile, ITask, IUser } from '@/types/validation';

import {
  DELETE_TASK,
  DELETE_USER,
  GET_POSTS,
  GET_TASKS,
  GET_USERS,
  PATCH_TASK,
  PATCH_USER,
  POST_AUTH,
  POST_TASK,
  POST_USER,
} from './urls';
import { RM, TAnswer, TStore, TStoreTaskKeys, TTokens } from './types';
import { mockPosts, mockSuccessAnswer, mockTasks, mockUsers } from './mocks';

export * from './types';

function validationSuccessAnswer(dataJson: unknown, response: Response | undefined): dataJson is TAnswer<unknown> {
  return !!response?.ok && IsObject(dataJson);
}

const TASK_KEY_BY_STATUS: Record<ITask['status'], TStoreTaskKeys> = {
  Archived: 'archived',
  Backlog: 'backlog',
  Done: 'done',
  'In Progress': 'inProgress',
  Ready: 'ready',
};

const defaultTasks: TStore['tasks'] = { backlog: [], ready: [], inProgress: [], done: [], archived: [] };
const deleteTask = (tasks: ITask[], id: string): ITask[] => tasks.filter((task) => task.id !== Number(id));

const requestManager = new RequestManager<TTokens, TStore, RM>({
  settings: {
    logger: !!import.meta.env.DEV,
    notifications: { duplicate: false, sticky: true, duration: 3 },
    cache: { prefix: 'admin' },
    request: { mockMode: false },
    https: {
      notifications: true,
      loader: true,
    },
    token: { waitTime: 0 },
  },
  tokens: {
    main: {
      template: 'bearer',
      cache: {
        maxAge: 60 * 24,
      },
    },
  },
  store: {
    profile: {
      default: null,
      validation: (data): data is IProfile => IsProfile(data),
      cache: { maxAge: 60, place: 'localStorage' },
    },
    posts: {
      default: null,
      validation: (data): data is TStore[RM['getPosts']['storeKey']] => IsArray<IPost>(data, IsPost),
      isEmpty: (value) => !value || value.length === 0,
      autoRequest: 'getPosts',
    },
    users: {
      default: null,
      validation: (data): data is TStore[RM['getUsers']['storeKey']] => IsArray<IUser>(data, IsUser),
      cache: { maxAge: 0, place: 'sessionStorage' },
      isEmpty: (value) => !value || value.length === 0,
      autoRequest: 'getUsers',
    },
    tasks: {
      default: null,
      validation: (data): data is TStore['tasks'] =>
        IsObject<TStoreTaskKeys>(data, ['backlog', 'ready', 'inProgress', 'done', 'archived']) &&
        IsArray<ITask>(data.backlog, IsTask) &&
        IsArray<ITask>(data.ready, IsTask) &&
        IsArray<ITask>(data.inProgress, IsTask) &&
        IsArray<ITask>(data.done, IsTask) &&
        IsArray<ITask>(data.archived, IsTask),
      cache: { maxAge: 0, place: 'sessionStorage' },
      isEmpty: (value) => !value,
      autoRequest: 'getTasks',
    },
  },
  namedRequests: {
    postAuth: {
      request: (props) => ({
        url: POST_AUTH,
        method: 'POST',
        body: props,
      }),
      mock: () => mockSuccessAnswer<{ token: string }>({ token: 'ea in' }),
      parse: {
        isSuccess: (dataJson, response): dataJson is { token: string } =>
          validationSuccessAnswer(dataJson, response) &&
          IsObject<'token'>(dataJson, ['token']) &&
          IsString(dataJson.token),
        onSuccess({ validData }, _, fetchData) {
          const profile = { email: fetchData?.body.email };
          if (!IsProfile(profile)) {
            console.error('profile not valid');
            return;
          }

          requestManager.setToken('main', validData.token);
          requestManager.set('profile', () => profile);
        },
        onError({ validError }, response) {
          if (!response.ok) return;
          if (validError)
            requestManager
              .getModule('notifications')
              .send({ data: { text: JSON.stringify(validError)[0] }, type: 'error' });
        },
      },
    },
    getPosts: {
      request: () => ({
        url: GET_POSTS,
        method: 'GET',
        tokenName: 'main',
      }),
      mock: () => mockSuccessAnswer<{ posts: IPost[]; total: number }>({ posts: [...mockPosts], total: 10 }),
      parse: {
        isSuccess: (dataJson, response): dataJson is { posts: IPost[]; total: number } =>
          validationSuccessAnswer(dataJson, response) &&
          IsObject<'posts' | 'total'>(dataJson, ['posts', 'total']) &&
          IsArray<IPost>(dataJson.posts, IsPost) &&
          IsNumber(dataJson.total),
      },
      save: {
        storeKey: 'posts',
        converter: ({ validData }) => {
          return validData.posts;
        },
      },
    },
    getUsers: {
      request: () => ({
        url: GET_USERS,
        method: 'GET',
        tokenName: 'main',
      }),
      mock: () => mockSuccessAnswer<{ users: IUser[]; total: number }>({ users: [...mockUsers], total: 10 }),
      parse: {
        isSuccess: (dataJson, response): dataJson is { users: IUser[]; total: number } =>
          validationSuccessAnswer(dataJson, response) &&
          IsObject<'users' | 'total'>(dataJson, ['users', 'total']) &&
          IsArray<IUser>(dataJson.users, IsUser) &&
          IsNumber(dataJson.total),
      },
      save: {
        storeKey: 'users',
        converter: ({ validData }) => {
          return validData.users;
        },
      },
    },
    deleteUser: {
      request: (id) => ({
        url: DELETE_USER + id,
        method: 'DELETE',
        tokenName: 'main',
      }),
      parse: {
        isSuccess: (dataJson, response): dataJson is { users: IUser[]; total: number } =>
          validationSuccessAnswer(dataJson, response),
        onSuccess(_props, _response, fetchData) {
          const id = fetchData.url.toString().split('/').reverse()[0];
          requestManager.set('users', (prev) => prev?.filter((user) => user.id !== Number(id)) || []);
          requestManager.sendNotification({
            data: { text: 'message.userRemoved' },
            type: 'success',
            sticky: false,
          });
        },
      },
    },
    patchUser: {
      request: (id, user) => ({
        url: PATCH_USER + id,
        method: 'PATCH',
        body: user,
        tokenName: 'main',
      }),
      mock(input, init) {
        if (typeof init?.body !== 'string') return new Response();

        const id = input.toString().split('/').reverse()[0];
        let body = {};
        try {
          body = JSON.parse(init.body);
        } catch {
          return new Response();
        }

        return new Response(JSON.stringify({ id, ...body }));
      },
      parse: {
        isSuccess: (dataJson, response): dataJson is IUser =>
          validationSuccessAnswer(dataJson, response) && IsUser(dataJson),
        onSuccess({ validData }, _, fetchData) {
          const id = fetchData.url.toString().split('/').reverse()[0];
          requestManager.set('users', (prev) =>
            prev ? [...prev.filter((user) => user.id !== Number(id)), validData] : [validData],
          );
          requestManager.sendNotification({
            data: { text: 'message.userUpdated' },
            type: 'success',
            sticky: false,
          });
        },
      },
    },
    postUser: {
      request: (user) => ({
        url: POST_USER,
        method: 'POST',
        body: user,
        tokenName: 'main',
      }),
      mock(_input, init) {
        if (typeof init?.body !== 'string') return new Response();

        const id = Math.floor(Math.random() * 1000);
        let body = {};
        try {
          body = JSON.parse(init.body);
        } catch {
          return new Response();
        }
        return new Response(JSON.stringify({ ...body, id }));
      },
      parse: {
        isSuccess: (dataJson, response): dataJson is IUser =>
          validationSuccessAnswer(dataJson, response) && IsUser(dataJson),
        onSuccess() {
          requestManager.sendNotification({
            data: { text: 'message.userAdded' },
            type: 'success',
            sticky: false,
          });
        },
      },
      save: {
        storeKey: 'users',
        converter: ({ state, validData }) => {
          return state ? [...state, validData] : [validData];
        },
      },
    },
    getTasks: {
      request: () => ({
        url: GET_TASKS,
        method: 'GET',
        tokenName: 'main',
      }),
      mock: () => mockSuccessAnswer<{ tasks: ITask[]; total: number }>({ tasks: [...mockTasks], total: 10 }),
      parse: {
        isSuccess: (dataJson, response): dataJson is { tasks: ITask[]; total: number } =>
          validationSuccessAnswer(dataJson, response) &&
          IsObject<'tasks' | 'total'>(dataJson, ['tasks', 'total']) &&
          IsArray<ITask>(dataJson.tasks, IsTask) &&
          IsNumber(dataJson.total),
      },
      save: {
        storeKey: 'tasks',
        converter: ({ validData, state }) => {
          const tasks: TStore['tasks'] = state ?? { ...defaultTasks };
          validData.tasks.forEach((task) => {
            tasks[TASK_KEY_BY_STATUS[task.status]].push(task);
          });
          return tasks;
        },
      },
    },
    postTask: {
      request: (task) => ({
        url: POST_TASK,
        method: 'POST',
        tokenName: 'main',
        body: task,
      }),
      mock(_input, init) {
        if (typeof init?.body !== 'string') return new Response();

        const id = Math.floor(Math.random() * 1000);
        let body = {};
        try {
          body = JSON.parse(init.body);
        } catch {
          return new Response();
        }
        return new Response(JSON.stringify({ ...body, id }));
      },
      parse: {
        isSuccess: (dataJson, response): dataJson is ITask =>
          validationSuccessAnswer(dataJson, response) && IsObject(dataJson) && IsTask(dataJson),
      },
      save: {
        storeKey: 'tasks',
        converter: ({ validData, state }) => {
          const tasks: TStore['tasks'] = state ?? { ...defaultTasks };
          const fixedData: ITask = { ...validData, status: 'Backlog' };
          const taskKey = TASK_KEY_BY_STATUS[fixedData.status];
          return { ...tasks, [taskKey]: [...tasks[taskKey], fixedData] };
        },
      },
    },
    patchTask: {
      request: (id, task) => ({
        url: PATCH_TASK + id,
        method: 'PATCH',
        body: task,
        tokenName: 'main',
      }),
      mock(input, init) {
        if (typeof init?.body !== 'string') return new Response();

        const id = input.toString().split('/').reverse()[0];
        let body = {};
        try {
          body = JSON.parse(init.body);
        } catch {
          return new Response();
        }

        return new Response(JSON.stringify({ id, ...body }));
      },
      parse: {
        isSuccess: (dataJson, response): dataJson is ITask =>
          validationSuccessAnswer(dataJson, response) && IsTask(dataJson),
        onSuccess(_, __, fetchData) {
          const id = fetchData.url.toString().split('/').reverse()[0];
          const task: ITask = fetchData.body;
          task.id = Number(id);
          const taskKey = TASK_KEY_BY_STATUS[task.status];
          requestManager.set('tasks', (prev) => {
            if (!prev) return { ...defaultTasks };
            const tasks = {
              backlog: deleteTask(prev.backlog, id),
              ready: deleteTask(prev.ready, id),
              inProgress: deleteTask(prev.inProgress, id),
              done: deleteTask(prev.done, id),
              archived: deleteTask(prev.archived, id),
            };
            tasks[taskKey] = [...tasks[taskKey], task];
            return tasks;
          });
        },
      },
    },
    deleteTask: {
      request: (id) => ({
        url: DELETE_TASK + id,
        method: 'DELETE',
        tokenName: 'main',
      }),
      parse: {
        isSuccess: (dataJson, response): dataJson is { users: IUser[]; total: number } =>
          validationSuccessAnswer(dataJson, response),
        onSuccess(_props, _response, fetchData) {
          const id = fetchData.url.toString().split('/').reverse()[0];
          requestManager.set('tasks', (prev) => {
            if (!prev) return { ...defaultTasks };
            return {
              backlog: deleteTask(prev.backlog, id),
              ready: deleteTask(prev.ready, id),
              inProgress: deleteTask(prev.inProgress, id),
              done: deleteTask(prev.done, id),
              archived: deleteTask(prev.archived, id),
            };
          });
        },
      },
    },
  },
  messages: {
    codes: {
      403: {
        title: 'errors.error403',
      },
      default: {
        title: 'errors.errorTitle',
      },
    },
  },
});

export default requestManager;
