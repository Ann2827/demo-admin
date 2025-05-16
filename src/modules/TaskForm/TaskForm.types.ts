import { SxProps, Theme } from '@mui/material';

import { ITask } from '@/types/validation';

// TODO: можно ли связать типы при наличии password?

export type TaskFormRef = {
  onValidate: () => { valid: boolean; result: Omit<ITask, 'id'> };
};

export interface TaskFormProps {
  task: Omit<ITask, 'id'>;

  /**
   * @default false
   */
  withStatus?: boolean;

  sx?: SxProps<Theme>;
}
