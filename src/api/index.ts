import { HttpsStore, ICustomFetchCheckProps, NeedsStore, NotificationsStore, SettingsStore } from 'library-react-hooks';

import { IsArray, IsNumber, IsObject, IsPost, IsProfile, IsString, IsTask, IsUser } from '@/types/guards';
import { IPost, ITask, IUser } from '@/types/validation';

import { DELETE_USER, GET_POSTS, GET_TASKS, GET_USERS, PATCH_USER, POST_AUTH, POST_USER } from './urls';
import { TAnswer } from './types';
import { mockPosts, mockSuccessAnswer, mockTasks, mockUsers } from './mocks';

export * from './types';

function validationSuccessAnswer(dataJson: unknown, response: Response | undefined): dataJson is TAnswer<unknown> {
  return !!response?.ok && IsObject(dataJson);
}

SettingsStore.initialize({
  logger: !!import.meta.env.DEV,
  modules: {
    https: {
      settings: {
        mockMode: Boolean(import.meta.env.VITE_MOCK_MODE === 'true'),
        waitToken: false,
        loader: true,
        messages: true,
        requestWithoutToken: true,
        mockDelay: 0,
      },
      tokens: {
        main: { template: 'bearer', cache: { time: 60 * 24, cleanWhenResponseIs: [401] } },
      },
      namedRequests: {
        postAuth: (props) => ({
          url: POST_AUTH,
          init: { method: 'POST' },
          body: props,
        }),
        getPosts: () => ({
          url: GET_POSTS,
          init: { method: 'GET' },
          tokenName: 'main',
        }),
        getUsers: () => ({
          url: GET_USERS,
          init: { method: 'GET' },
          tokenName: 'main',
        }),
        deleteUser: (id) => ({
          url: DELETE_USER + id,
          init: { method: 'DELETE' },
          tokenName: 'main',
        }),
        patchUser: (id, user) => ({
          url: PATCH_USER + id,
          init: { method: 'PATCH' },
          body: user,
          tokenName: 'main',
        }),
        postUser: (user) => ({
          url: POST_USER,
          init: { method: 'POST' },
          body: user,
          tokenName: 'main',
        }),
        getTasks: () => ({
          url: GET_TASKS,
          init: { method: 'GET' },
          tokenName: 'main',
        }),
      },
      validation: {
        postAuth: (dataJson, response): dataJson is { token: string } =>
          validationSuccessAnswer(dataJson, response) &&
          IsObject<'token'>(dataJson, ['token']) &&
          IsString(dataJson.token),
        getPosts: (dataJson, response): dataJson is { posts: IPost[]; total: number } =>
          validationSuccessAnswer(dataJson, response) &&
          IsObject<'posts' | 'total'>(dataJson, ['posts', 'total']) &&
          IsArray<IPost>(dataJson.posts, IsPost) &&
          IsNumber(dataJson.total),
        getUsers: (dataJson, response): dataJson is { users: IUser[]; total: number } =>
          validationSuccessAnswer(dataJson, response) &&
          IsObject<'users' | 'total'>(dataJson, ['users', 'total']) &&
          IsArray<IUser>(dataJson.users, IsUser) &&
          IsNumber(dataJson.total),
        patchUser: (dataJson, response): dataJson is IUser =>
          validationSuccessAnswer(dataJson, response) && IsUser(dataJson),
        postUser: (dataJson, response): dataJson is IUser =>
          validationSuccessAnswer(dataJson, response) && IsUser(dataJson),
        getTasks: (dataJson, response): dataJson is { tasks: ITask[]; total: number } =>
          validationSuccessAnswer(dataJson, response) &&
          IsObject<'tasks' | 'total'>(dataJson, ['tasks', 'total']) &&
          IsArray<IUser>(dataJson.tasks, IsTask) &&
          IsNumber(dataJson.total),
      },
      mocks: {
        namedRequests: {
          postAuth: mockSuccessAnswer<{ token: string }>({ token: 'ea in' }),
          getPosts: mockSuccessAnswer<{ posts: IPost[]; total: number }>({ posts: [...mockPosts], total: 10 }),
          getUsers: mockSuccessAnswer<{ users: IUser[]; total: number }>({ users: [...mockUsers], total: 10 }),
          getTasks: mockSuccessAnswer<{ tasks: ITask[]; total: number }>({ tasks: [...mockTasks], total: 10 }),
        },
        additionalRules({ requestName, options, input }: ICustomFetchCheckProps) {
          if (requestName === 'patchUser' && options?.body) {
            const id = input.toString().split('/').reverse()[0];
            return new Response(JSON.stringify({ id, ...options.body }));
          }
          if (requestName === 'postUser' && options?.body) {
            const id = Math.floor(Math.random() * 1000);
            return new Response(
              JSON.stringify({
                id,
                email: options.body.email,
                firstName: options.body.firstName,
                lastName: options.body.lastName,
              }),
            );
          }
        },
      },
    },
    needs: {
      settings: { loader: true, waitRequest: true },
      store: {
        profile: null,
        posts: null,
        users: null,
        tasks: null,
      },
      requests: {
        profile: '',
        posts: ['getPosts', 'posts'],
        users: ['getUsers', 'users'],
        tasks: ['getTasks', 'tasks'],
      },
      cache: {
        profile: {
          time: 60,
          clean: { thisResponseIs: false, otherResponse: { which: 'token', token: 'main', is: [401, 403] } },
        },
        users: { time: null, clean: { thisResponseIs: false } },
        tasks: { time: null, clean: { thisResponseIs: false } },
      },
    },
    cache: {
      settings: { place: 'localStorage', prefix: 'admin--cache' },
      placements: {
        users: { place: 'sessionStorage' },
        tasks: { place: 'sessionStorage' },
      },
    },
    scenarios: {
      afterRequest: {
        postAuth: ({ dataJson, valid, options }) => {
          const profile = { email: options?.body.email };
          if (!valid || !IsProfile(profile)) return;

          NeedsStore.set('profile', profile);
          HttpsStore.setToken('main', dataJson.token);
        },
        deleteUser: ({ response, input }) => {
          if (!response.ok) return;

          const id = input.toString().split('/').reverse()[0];
          NeedsStore.set('users', (prev: IUser[]) => prev.filter((user) => user.id !== Number(id)));
          NotificationsStore.send({ data: { text: 'Пользователь успешно удален' }, type: 'success', sticky: false });
        },
        patchUser: ({ valid, input, dataJson }) => {
          if (!valid) return;

          const id = input.toString().split('/').reverse()[0];
          NeedsStore.set('users', (prev: IUser[]) => [...prev.filter((user) => user.id !== Number(id)), dataJson]);
          NotificationsStore.send({
            data: { text: 'Данные пользователя успешно обновлены.' },
            type: 'success',
            sticky: false,
          });
        },
        postUser: ({ valid, dataJson }) => {
          if (!valid) return;

          NeedsStore.set('users', (prev: IUser[]) => [...prev, dataJson]);
          NotificationsStore.send({
            data: { text: 'Пользователь успешно добавлен' },
            type: 'success',
            sticky: false,
          });
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
    notifications: {
      settings: { duplicate: false, sticky: true, duration: 3 },
    },
  },
});
