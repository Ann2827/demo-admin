import { RouteObject } from 'react-router-dom';

import { Login, Main, NotFound, Dashboard, Posts, Users, Tasks } from '@/pages';
import { ROUTE_DASHBOARD, ROUTE_LOGIN, ROUTE_MAIN, ROUTE_POSTS, ROUTE_TASKS, ROUTE_USERS } from '@/constants/routes';
import { ExcludeAuth, RequireAuth } from '@/modules';

export const routes: RouteObject[] = [
  {
    index: true,
    path: ROUTE_MAIN,
    Component: Main,
  },
  {
    path: ROUTE_LOGIN,
    Component: ExcludeAuth,
    children: [
      {
        index: true,
        Component: Login,
      },
    ],
  },
  {
    Component: RequireAuth,
    children: [
      {
        index: true,
        path: ROUTE_DASHBOARD,
        Component: Dashboard,
      },
      {
        path: ROUTE_POSTS,
        Component: Posts,
        // children: [
        //   {
        //     path: ROUTE_INBOX,
        //     Component: List,
        //   },
        //   {
        //     path: ':uuid',
        //     Component: List,
        //   },
        //   {
        //     path: '*',
        //     Component: () => Navigate({ to: ROUTE_MAIN, replace: true }),
        //   },
        // ],
      },
      {
        path: ROUTE_USERS,
        Component: Users,
      },
      {
        path: ROUTE_TASKS,
        Component: Tasks,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
];
