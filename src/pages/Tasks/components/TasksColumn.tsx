import { Badge, Divider, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';

export const TasksColumn: React.FC<
  React.PropsWithChildren<{ name: string; tasksLength?: number; active?: boolean }>
> = ({ name, tasksLength, active, children }) => {
  return (
    <Stack
      direction='column'
      component={Paper}
      variant='outlined'
      width='33%'
      sx={(theme) => ({ border: active ? `1px solid ${theme.palette.primary.light}` : undefined })}
    >
      <Stack p={1} direction='row' justifyContent='center' alignItems='center' gap={2}>
        <Typography textAlign='center' variant='subtitle1'>
          {name}
        </Typography>
        <Badge badgeContent={active ? tasksLength : undefined} color='primary' />
      </Stack>
      <Divider variant='middle' />
      {children}
    </Stack>
  );
};
