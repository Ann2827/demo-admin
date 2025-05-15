import { Box, List } from '@mui/material';
import * as React from 'react';

import { ITask } from '@/types/validation';

import { TasksItem } from './TaskItem';

interface TabPanelProps {
  index: number;
  value: number;
  tasks?: ITask[];
}

export const CustomTabPanel: React.FC<React.PropsWithChildren<TabPanelProps>> = ({ index, value, tasks }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
            {tasks?.map((item) => <TasksItem task={item} />)}
          </List>
        </Box>
      )}
    </div>
  );
};
