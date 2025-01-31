import { SxProps, Theme } from '@mui/material';

import { IUser } from '@/types/validation';

// TODO: можно ли связать типы при наличии password?

export type UserFormRef = {
  onValidate: () => { valid: boolean; result: Omit<IUser, 'id'> & Partial<{ password: string }> };
};

export interface UserFormProps {
  user: Omit<IUser, 'id'>;

  /**
   * @default false
   */
  withPassword?: boolean;

  sx?: SxProps<Theme>;
}
