import { Badge, Divider, List, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';

import { ITask } from '@/types/validation';

import { TasksItem } from './TaskItem';

export const TasksColumn: React.FC<{ name: string; tasks?: ITask[]; active?: boolean }> = ({
  name,
  tasks = [],
  active,
}) => {
  return (
    <Stack
      direction='column'
      component={Paper}
      variant='outlined'
      flexGrow={1}
      sx={(theme) => ({ border: active ? `1px solid ${theme.palette.primary.light}` : undefined })}
    >
      <Stack p={1} direction='row' justifyContent='center' alignItems='center' gap={2}>
        <Typography textAlign='center' variant='subtitle1'>
          {name}
        </Typography>
        <Badge badgeContent={active ? tasks.length : undefined} color='primary' />
      </Stack>
      <Divider variant='middle' />
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
        {tasks.map((item) => (
          <TasksItem task={item} />
        ))}
      </List>
    </Stack>
  );
};
