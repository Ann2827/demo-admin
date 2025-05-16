import { List, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { ITask } from '@/types/validation';

import { TasksItem, TasksItemProps } from './TaskItem';

export const TaskList: React.FC<
  {
    tasks?: ITask[];
    sx?: SxProps<Theme>;
  } & Pick<TasksItemProps, 'next' | 'hint' | 'check' | 'onEdit' | 'onDelete'>
> = ({ tasks, sx, ...rest }) => {
  const { t } = useTranslation();

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1, ...sx }}>
      {tasks?.map((item, id) => <TasksItem key={item.id} task={item} index={id} {...rest} />)}
      {tasks?.length === 0 && (
        <Typography color='secondary' variant='overline' textAlign='center'>
          {t('page.tasks.empty')}
        </Typography>
      )}
    </List>
  );
};
