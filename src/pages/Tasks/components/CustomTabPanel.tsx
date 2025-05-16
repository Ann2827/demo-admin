import { Box, SxProps, Theme } from '@mui/material';
import * as React from 'react';

import { ITask } from '@/types/validation';

import { TaskList } from './TaskList';
import { TasksItemProps } from './TaskItem';

interface TabPanelProps {
  index: number;
  value: number;
  sx?: SxProps<Theme>;
}

export const CustomTabPanel: React.FC<React.PropsWithChildren<TabPanelProps>> = ({ index, value, children, sx }) => (
  <Box
    role='tabpanel'
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    sx={{ m: 2, ...sx }}
  >
    {value === index && <Box>{children}</Box>}
  </Box>
);

export const CustomTabPanelTasks: React.FC<
  TabPanelProps & { tasks?: ITask[] } & Pick<TasksItemProps, 'onEdit' | 'onDelete'>
> = ({ index, value, sx, ...rest }) => (
  <CustomTabPanel index={index} value={value} sx={sx}>
    <TaskList {...rest} />
  </CustomTabPanel>
);
