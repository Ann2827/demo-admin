import { Stack, Typography } from '@mui/material';
import * as React from 'react';

import { ITask } from '@/types/validation';

export const TasksItem: React.FC<{ task: ITask }> = ({ task }) => {
  return (
    <Stack key={task.id} p={1} sx={(theme) => ({ bgcolor: theme.palette.grey[100], borderRadius: 1 })}>
      <Typography variant='subtitle2'>{task.title}</Typography>
      <Typography variant='caption' color='secondary'>
        {task.description}
      </Typography>
    </Stack>
  );
};
