import Ajv from 'ajv';

import { IProfile, IPost, IUser, ITask } from '@/types/validation';

import SCHEMA from './schema.json';

const ajv = new Ajv({ removeAdditional: true }).addSchema(SCHEMA, 'SCHEMA');

/**
 * Библиотека https://www.npmjs.com/package/create-validator-ts генерила не под все дефинишины
 * Файл schema.json генерится коммандой из package.json
 */
export function validateProperty<T>(payload: unknown, key: string): { valid: boolean; error: Error | null; data: T } {
  const keyRef = `SCHEMA#/definitions/${key}`;

  /** Schema is defined in {@link {keyRef}} } **/
  const valid = ajv.validate<T>(keyRef, payload);

  let error = null;
  if (!valid) {
    error = new Error(`Invalid ${key}: ` + ajv.errorsText(ajv.errors, { dataVar: key }));
    error.name = 'ValidationError';
  }

  return { valid, error, data: payload as T };
}

export function validateProfile(payload: unknown): ReturnType<typeof validateProperty> {
  return validateProperty<IProfile>(payload, 'IProfile');
}

export function validatePost(payload: unknown): ReturnType<typeof validateProperty> {
  return validateProperty<IPost>(payload, 'IPost');
}

export function validateUser(payload: unknown): ReturnType<typeof validateProperty> {
  return validateProperty<IUser>(payload, 'IUser');
}

export function validateTask(payload: unknown): ReturnType<typeof validateProperty> {
  return validateProperty<ITask>(payload, 'ITask');
}
