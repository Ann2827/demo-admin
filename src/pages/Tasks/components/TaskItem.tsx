import { Grow, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useTranslation } from 'react-i18next';

import { ITask } from '@/types/validation';
import { ModalDialog, ModalDialogRef } from '@/components';
import { TaskForm, TaskFormRef } from '@/modules';

export type TasksItemProps = {
  task: ITask;
  next?: (id: number) => void;
  hint?: string;
  check?: boolean;
  index: number;
  onEdit: (id: number, task: Omit<ITask, 'id'>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export const TasksItem: React.FC<TasksItemProps> = ({ task, next, hint, index, check = false, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const taskModalEditRef = React.useRef<ModalDialogRef>(null);
  const taskFormEditRef = React.useRef<TaskFormRef>(null);

  return (
    <React.Fragment>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={index * 300 + 300}>
        <Stack
          key={task.id}
          direction='row'
          justifyContent='space-between'
          p={1}
          sx={(theme) => ({
            bgcolor: theme.palette.grey[100],
            borderRadius: 1,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: theme.palette.primary.lighter,
            },
          })}
          onClick={() => taskModalEditRef.current?.handleOpen()}
        >
          <Stack direction='column'>
            <Typography variant='subtitle2'>{task.title}</Typography>
            <Typography variant='caption' color='secondary'>
              {task.description}
            </Typography>
          </Stack>
          {next && (
            <Tooltip title={hint}>
              <IconButton onClick={() => next(task.id)}>
                {check ? <CheckRoundedIcon /> : <ArrowForwardIosRoundedIcon />}
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Grow>
      <ModalDialog
        ref={taskModalEditRef}
        title={t('page.tasks.taskEdit')}
        onAction={() => {
          const validate = taskFormEditRef.current?.onValidate();
          if (!validate?.valid) return;

          onEdit(task.id, validate.result);
          taskModalEditRef.current?.handleClose();
        }}
        onClose={() => taskModalEditRef.current?.handleClose()}
        buttons={{
          action: {
            children: t('action.save'),
          },
          reject: {
            children: t('action.delete'),
            color: 'error',
            variant: 'outlined',
            startIcon: <DeleteRoundedIcon />,
            onClick: () => onDelete(task.id),
          },
        }}
      >
        <TaskForm
          ref={taskFormEditRef}
          task={{ title: task.title, description: task.description, status: task.status }}
          withStatus
        />
      </ModalDialog>
    </React.Fragment>
  );
};
