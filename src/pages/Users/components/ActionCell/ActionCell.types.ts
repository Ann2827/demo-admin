import { GridRenderCellParams } from '@mui/x-data-grid';

import { IUser } from '@/types/validation';

export interface ActionCellProps extends GridRenderCellParams {
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, user: Omit<IUser, 'id'>) => Promise<void>;
}
