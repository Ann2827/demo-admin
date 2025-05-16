const API_URL = import.meta.env.VITE_API_URL;

// Auth
export const POST_AUTH = `${API_URL}/login`;

// Users
export const GET_USERS = `${API_URL}/users`;
export const DELETE_USER = `${API_URL}/users/`;
export const PATCH_USER = `${API_URL}/users/`;
export const POST_USER = `${API_URL}/users`;

// Posts
export const GET_POSTS = `${API_URL}/posts`;

// Tasks
export const GET_TASKS = `${API_URL}/tasks`;
export const POST_TASK = `${API_URL}/tasks`;
export const PATCH_TASK = `${API_URL}/tasks/`;
export const DELETE_TASK = `${API_URL}/tasks/`;
