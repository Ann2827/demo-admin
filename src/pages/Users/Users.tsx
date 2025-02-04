import { Button, Paper, Stack } from '@mui/material';
import { HttpsStore, ScenariosStore, useNeeds } from 'library-react-hooks';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { PageContainer, UserForm, UserFormRef } from '@/modules';
import { IUser } from '@/types/validation';
import { ModalDialog, ModalDialogRef } from '@/components';

import { ActionCell } from './components';

// TODO: добавить описание проблем с апи

const Users: React.FC = () => {
  const { t } = useTranslation();
  const { store } = useNeeds(['users']);

  const userModalAddRef = React.useRef<ModalDialogRef>(null);
  const userFormRef = React.useRef<UserFormRef>(null);

  const onDelete = React.useCallback(async (id: number) => {
    await HttpsStore.namedRequest('deleteUser', id);
    ScenariosStore.after('deleteUser');
  }, []);
  const onEdit = React.useCallback(async (id: number, user: Omit<IUser, 'id'>) => {
    await HttpsStore.namedRequest('patchUser', id, user);
    ScenariosStore.after('patchUser');
  }, []);
  const onAdd = React.useCallback(async (user: Omit<IUser, 'id'> & { password: string }) => {
    await HttpsStore.namedRequest('postUser', user);
    ScenariosStore.after('postUser');
  }, []);

  const tableRows = React.useMemo<GridRowsProp>(() => store?.users || [], [store?.users]);
  const tableColumns = React.useMemo<GridColDef[]>(
    () => [
      { field: 'id', sortable: false, filterable: false, disableColumnMenu: true },
      { field: 'email', headerName: t('field.email'), sortable: false, flex: 1 },
      { field: 'firstName', headerName: t('field.firstName'), flex: 1 },
      { field: 'lastName', headerName: t('field.lastName'), flex: 1 },
      {
        field: 'actions',
        headerName: '',
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params) => <ActionCell {...params} onDelete={onDelete} onEdit={onEdit} />,
      },
    ],
    [t, onDelete, onEdit],
  );

  return (
    <PageContainer title={t('Users')}>
      <Stack direction='row' mb={2} justifyContent='flex-end'>
        <Button
          variant='contained'
          startIcon={<AddOutlinedIcon />}
          onClick={() => {
            userModalAddRef.current?.handleOpen();
          }}
        >
          {t('Add User')}
        </Button>
        <ModalDialog
          ref={userModalAddRef}
          title='Add User'
          onAction={() => {
            const validate = userFormRef.current?.onValidate();
            if (!validate?.valid) return;

            onAdd({ ...validate.result, password: validate.result?.password || '' });
            userModalAddRef.current?.handleClose();
          }}
          buttons={{
            action: {
              children: 'Add',
            },
            reject: { children: 'Cancel' },
          }}
        >
          <UserForm ref={userFormRef} user={{ email: '', firstName: '', lastName: '' }} withPassword />
        </ModalDialog>
      </Stack>
      <Paper variant='outlined'>
        <DataGrid
          rows={tableRows}
          columns={tableColumns}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 50]}
          rowSelection={false}
          columnVisibilityModel={{ id: false }}
          sx={{ border: 0, py: 1.5 }}
        />
      </Paper>
    </PageContainer>
  );
};

export default Users;
