import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import useNeeds from '@/hooks/needs.hook';
import { CacheManager, PageContainer, TaskForm, TaskFormRef } from '@/modules';
import requestManager from '@/api';
import { ITask } from '@/types/validation';
import { ModalDialog, ModalDialogRef } from '@/components';

import { CustomTabPanel, CustomTabPanelTasks, TaskList, TasksColumn } from './components';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const { store } = useNeeds(['tasks']);

  const taskModalAddRef = React.useRef<ModalDialogRef>(null);
  const taskFormAddRef = React.useRef<TaskFormRef>(null);

  const onAdd = React.useCallback(async (task: Omit<ITask, 'id'>) => {
    await requestManager.namedRequest('postTask', task);
  }, []);
  const onEdit = React.useCallback(async (id: number, task: Omit<ITask, 'id'>) => {
    await requestManager.namedRequest('patchTask', id, task);
  }, []);
  const onDelete = React.useCallback(async (id: number) => {
    await requestManager.namedRequest('deleteTask', id);
  }, []);

  const [tabValue, setTabValue] = React.useState(Number.parseInt(CacheManager.get('tasksTab') ?? '1'));
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    CacheManager.set('tasksTab', newValue);
    setTabValue(newValue);
  };

  return (
    <PageContainer title={t('page.tasks.title')}>
      <Stack>
        <Tabs value={tabValue} onChange={handleChange} variant='scrollable'>
          <Tab label='Backlog' iconPosition='end' value={0} {...a11yProps(0)} sx={{ gap: 1 }} />
          <Tab label='In Work' iconPosition='end' value={1} {...a11yProps(1)} sx={{ gap: 1 }} />
          <Tab label='Archived' iconPosition='end' value={2} {...a11yProps(2)} sx={{ gap: 1 }} />
        </Tabs>
        <CustomTabPanel index={0} value={tabValue} sx={{ maxWidth: { lg: '70%' } }}>
          <Box sx={{ p: 1 }}>
            <IconButton sx={{ width: '100%' }} onClick={() => taskModalAddRef.current?.handleOpen()}>
              <AddRoundedIcon />
            </IconButton>
            <ModalDialog
              ref={taskModalAddRef}
              title={t('page.tasks.taskAdd')}
              onAction={() => {
                const validate = taskFormAddRef.current?.onValidate();
                if (!validate?.valid) return;

                onAdd(validate.result);
                taskModalAddRef.current?.handleClose();
              }}
              onClose={() => taskModalAddRef.current?.handleClose()}
              buttons={{
                action: {
                  children: t('action.add'),
                },
              }}
            >
              <TaskForm ref={taskFormAddRef} task={{ title: '', description: '', status: 'Backlog' }} />
            </ModalDialog>
          </Box>
          <TaskList
            tasks={store.tasks?.backlog}
            next={(id: number) => {
              requestManager.set('tasks', (state) => {
                const taskId = state?.backlog.findIndex((item) => item.id === id);
                if (!state?.backlog || taskId === undefined || taskId < 0) {
                  console.error('taskId not found');
                  return state;
                }
                const [task] = state.backlog.splice(taskId, 1);
                task.status = 'Ready';
                return { ...state, ready: [...state.ready, task] };
              });
            }}
            hint='To Ready'
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
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
            <TasksColumn name='Ready' tasksLength={store.tasks?.ready.length} active>
              <TaskList
                tasks={store.tasks?.ready}
                next={(id: number) => {
                  requestManager.set('tasks', (state) => {
                    const taskId = state?.ready.findIndex((item) => item.id === id);
                    if (!state?.ready || taskId === undefined || taskId < 0) {
                      console.error('taskId not found');
                      return state;
                    }
                    const [task] = state.ready.splice(taskId, 1);
                    task.status = 'In Progress';
                    return { ...state, inProgress: [...state.inProgress, task] };
                  });
                }}
                hint='To In progress'
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TasksColumn>
            <TasksColumn name='In Progress' tasksLength={store.tasks?.inProgress.length}>
              <TaskList
                tasks={store.tasks?.inProgress}
                next={(id: number) => {
                  requestManager.set('tasks', (state) => {
                    const taskId = state?.inProgress.findIndex((item) => item.id === id);
                    if (!state?.inProgress || taskId === undefined || taskId < 0) {
                      console.error('taskId not found');
                      return state;
                    }
                    const [task] = state.inProgress.splice(taskId, 1);
                    task.status = 'Done';
                    return { ...state, done: [...state.done, task] };
                  });
                }}
                hint='To Done'
                check
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TasksColumn>
            <TasksColumn name='Done' tasksLength={store.tasks?.done.length}>
              <TaskList tasks={store.tasks?.done} onEdit={onEdit} onDelete={onDelete} />
            </TasksColumn>
          </Stack>
          <Stack
            sx={(theme) => ({
              display: 'flex',
              [theme.breakpoints.up('lg')]: {
                display: 'none',
              },
            })}
          >
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
                <Stack gap={2} alignItems='center' direction='row'>
                  <Typography component='span'>Ready</Typography>
                  <Badge badgeContent={store.tasks?.ready.length} color='primary' />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <TaskList tasks={store.tasks?.ready} onEdit={onEdit} onDelete={onDelete} />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2-content' id='panel2-header'>
                <Stack gap={2} alignItems='center' direction='row'>
                  <Typography component='span'>In Progress</Typography>
                  <Badge badgeContent={store.tasks?.inProgress.length} color='default' />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <TaskList tasks={store.tasks?.inProgress} onEdit={onEdit} onDelete={onDelete} />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel3-content' id='panel3-header'>
                <Stack gap={2} alignItems='center' direction='row'>
                  <Typography component='span'>Done</Typography>
                  <Badge badgeContent={store.tasks?.done.length} color='default' />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <TaskList tasks={store.tasks?.done} onEdit={onEdit} onDelete={onDelete} />
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanelTasks
          value={tabValue}
          index={2}
          tasks={store.tasks?.archived}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Stack>
    </PageContainer>
  );
};

export default Tasks;
