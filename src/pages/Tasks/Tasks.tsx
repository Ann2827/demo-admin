import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Box, Stack, Tab, Tabs } from '@mui/material';
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import PublishedWithChangesRoundedIcon from '@mui/icons-material/PublishedWithChangesRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import useNeeds from '@/hooks/needs.hook';
import { PageContainer } from '@/modules';

import { CustomTabPanel, TasksColumn } from './components';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const { store } = useNeeds(['tasks']);

  const [value, setValue] = React.useState(1);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageContainer title={t('page.tasks.title')}>
      <Stack
        direction='row'
        gap={1}
        minHeight='300px'
        sx={(theme) => ({
          display: 'flex',
          [theme.breakpoints.down('lg')]: {
            display: 'none',
          },
        })}
      >
        <TasksColumn name='Backlog' tasks={store.tasks?.backlog} />
        <TasksColumn name='Ready' tasks={store.tasks?.ready} active />
        <TasksColumn name='In Progress' tasks={store.tasks?.inProgress} />
        <TasksColumn name='Done' tasks={store.tasks?.done} />
        <TasksColumn name='Archived' tasks={store.tasks?.archived} />
      </Stack>
      <Stack
        sx={(theme) => ({
          display: 'flex',
          [theme.breakpoints.up('lg')]: {
            display: 'none',
          },
        })}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant='scrollable'>
            <Tab
              label={<AllInboxRoundedIcon />}
              icon={<Badge badgeContent={store.tasks?.backlog.length} color='default' />}
              iconPosition='end'
              value={0}
              {...a11yProps(0)}
              sx={{ gap: 1 }}
            />
            <Tab
              label={<BorderColorRoundedIcon />}
              icon={<Badge badgeContent={store.tasks?.ready.length} color='default' />}
              iconPosition='end'
              value={1}
              {...a11yProps(1)}
              sx={{ gap: 1 }}
            />
            <Tab
              label={<PublishedWithChangesRoundedIcon />}
              icon={<Badge badgeContent={store.tasks?.inProgress.length} color='default' />}
              iconPosition='end'
              value={2}
              {...a11yProps(2)}
              sx={{ gap: 1 }}
            />
            <Tab
              label={<CheckCircleOutlineRoundedIcon />}
              icon={<Badge badgeContent={store.tasks?.done.length} color='default' />}
              iconPosition='end'
              value={3}
              {...a11yProps(3)}
              sx={{ gap: 1 }}
            />
            <Tab
              label={<CancelRoundedIcon />}
              icon={<Badge badgeContent={store.tasks?.archived.length} color='default' />}
              iconPosition='end'
              value={4}
              {...a11yProps(4)}
              sx={{ gap: 1 }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} tasks={store.tasks?.backlog} />
        <CustomTabPanel value={value} index={1} tasks={store.tasks?.ready} />
        <CustomTabPanel value={value} index={2} tasks={store.tasks?.inProgress} />
        <CustomTabPanel value={value} index={3} tasks={store.tasks?.done} />
        <CustomTabPanel value={value} index={4} tasks={store.tasks?.archived} />
      </Stack>
    </PageContainer>
  );
};

export default Tasks;
