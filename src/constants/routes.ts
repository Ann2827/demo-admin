import { withSlash } from '@/utils/url';

export const ROUTE_MAIN = withSlash([import.meta.env.BASE_URL, '/']);
export const ROUTE_LOGIN = withSlash([ROUTE_MAIN, 'login']);

export const ROUTE_DASHBOARD = withSlash([ROUTE_MAIN, 'dashboard']);
export const ROUTE_POSTS = withSlash([ROUTE_MAIN, 'posts']);
export const ROUTE_USERS = withSlash([ROUTE_MAIN, 'users']);
export const ROUTE_TASKS = withSlash([ROUTE_MAIN, 'tasks']);
