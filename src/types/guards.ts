import { validateProfile, validatePost, validateUser, validateTask, validateProperty } from '@/validation';

import { IPost, IProfile, ITask, IUser } from './validation';

export function IsString(payload: unknown): payload is string {
  return typeof payload === 'string';
}

export function IsNumber(payload: unknown): payload is number {
  return typeof payload === 'number' && !Number.isNaN(payload);
}

export function IsObject<T extends string = string>(payload: unknown, keys?: T[]): payload is Record<T, unknown> {
  return (
    typeof payload === 'object' && !!payload && (!!keys && keys.length > 0 ? keys.every((key) => key in payload) : true)
  );
}

export function IsArray<T = unknown>(payload: unknown, fn?: (...args: any) => boolean): payload is [T] {
  return Array.isArray(payload) && (payload.length > 0 && !!fn ? payload.every((item) => fn(item)) : true);
}

/**
 * ==============================
 * With type validator
 * ==============================
 */
function withLogs(data: ReturnType<typeof validateProperty>) {
  const { valid, error } = data;
  if (!!import.meta.env.DEV && error) console.error(error);
  return valid;
}

export function IsProfile(payload: unknown): payload is IProfile {
  return withLogs(validateProfile(payload));
}

export function IsPost(payload: unknown): payload is IPost {
  return withLogs(validatePost(payload));
}

export function IsUser(payload: unknown): payload is IUser {
  return withLogs(validateUser(payload));
}

export function IsTask(payload: unknown): payload is ITask {
  return withLogs(validateTask(payload));
}
