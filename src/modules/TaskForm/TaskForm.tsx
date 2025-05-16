import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ITask } from '@/types/validation';
import useField from '@/hooks/field.hook';

import { TaskFormProps, TaskFormRef } from './TaskForm.types';

const TaskForm = React.forwardRef<TaskFormRef, TaskFormProps>(({ sx, task, withStatus = false }, ref) => {
  const { t } = useTranslation();

  const [title, changeTitle, { error: errorTitle, setError: setErrorTitle }] = useField<ITask['title']>(task.title, {
    translate: t,
  });
  const [description, changeDescription, { error: errorDescription, setError: setErrorDescription }] = useField<
    ITask['description']
  >(task.description, { translate: t });
  const [status, changeStatus] = useField<ITask['status']>(task.status, { translate: t });

  const result = React.useMemo<ReturnType<TaskFormRef['onValidate']>['result']>(
    () => ({ title, description, status }),
    [title, description, status],
  );
  const onValidate = React.useCallback(() => {
    let valid = true;

    if (!result.title) {
      setErrorTitle('message.requiredField');
      valid = false;
    }
    if (!result.description) {
      setErrorDescription('message.requiredField');
      valid = false;
    }

    return { valid, result };
  }, [result, setErrorTitle, setErrorDescription]);

  React.useImperativeHandle(
    ref,
    () => ({
      onValidate,
    }),
    [onValidate],
  );

  return (
    <Stack direction='column' gap={3} sx={sx}>
      {!withStatus && (
        <Typography color='secondary' variant='caption'>
          {t('page.tasks.description')}
        </Typography>
      )}
      <TextField
        label={t('field.title')}
        variant='standard'
        value={title}
        onChange={(event) => {
          changeTitle(event.target.value);
        }}
        fullWidth
        error={!!errorTitle}
        helperText={errorTitle}
      />
      <TextField
        label={t('field.description')}
        variant='standard'
        value={description}
        onChange={(event) => {
          changeDescription(event.target.value);
        }}
        fullWidth
        error={!!errorDescription}
        helperText={errorDescription}
        multiline
        rows={2}
      />
      {withStatus && (
        <FormControl>
          <InputLabel id='status-select-label'>{t('field.status')}</InputLabel>
          <Select
            labelId='status-select-label'
            id='status-select'
            value={status}
            label={t('field.status')}
            onChange={(event) => changeStatus(event.target.value as ITask['status'])}
            variant='standard'
          >
            <MenuItem value={'Backlog'}>Backlog</MenuItem>
            <MenuItem value={'Ready'}>Ready</MenuItem>
            <MenuItem value={'In Progress'}>In Progress</MenuItem>
            <MenuItem value={'Done'}>Done</MenuItem>
            <MenuItem value={'Archived'}>Archived</MenuItem>
          </Select>
        </FormControl>
      )}
    </Stack>
  );
});

export default TaskForm;
