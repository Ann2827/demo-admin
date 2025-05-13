import {
  DialogContentText,
  Icon,
  IconButton,
  IconOwnProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
} from '@mui/material';
import * as React from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTranslation } from 'react-i18next';

import { ModalDialog, ModalDialogRef } from '@/components';
import { UserForm, UserFormRef } from '@/modules';

import { ActionCellProps } from './ActionCell.types';

const ActionCell: React.FC<ActionCellProps> = (params) => {
  const { t } = useTranslation();

  const [anchorPopover, setAnchorPopover] = React.useState<HTMLButtonElement | null>(null);
  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPopover(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorPopover(null);
  };

  const userModalDeleteRef = React.useRef<ModalDialogRef>(null);
  const userModalEditRef = React.useRef<ModalDialogRef>(null);
  const userFormRef = React.useRef<UserFormRef>(null);

  const menuConfig = React.useMemo<
    { icon: React.ElementType; text: string; action(): void; color?: IconOwnProps['color'] }[]
  >(
    () => [
      {
        icon: EditOutlinedIcon,
        text: t('action.edit'),
        action: () => {
          userModalEditRef.current?.handleOpen();
          handlePopoverClose();
        },
      },
      {
        icon: DeleteOutlineOutlinedIcon,
        text: t('action.delete'),
        color: 'error',
        action: () => {
          userModalDeleteRef.current?.handleOpen();
          handlePopoverClose();
        },
      },
    ],
    [],
  );

  return (
    <React.Fragment>
      <IconButton onClick={handlePopoverClick} size='small'>
        <MoreVertOutlinedIcon />
      </IconButton>
      <Popover
        id={anchorPopover ? params.row.id : undefined}
        open={!!anchorPopover}
        anchorEl={anchorPopover}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{ paper: { variant: 'outlined', sx: (theme) => ({ boxShadow: theme.shadows[2] }) } }}
      >
        <List dense disablePadding>
          {menuConfig.map(({ icon, text, color, action }, id) => (
            <ListItem key={id} sx={{ px: 0.5 }}>
              <ListItemButton onClick={action} sx={{ borderRadius: '8px' }}>
                <ListItemIcon sx={{ minWidth: '28px' }}>
                  <Icon component={icon} color={color} fontSize='small' />
                </ListItemIcon>
                <ListItemText primary={t(text)} slotProps={{ primary: { variant: 'caption', color } }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
      <ModalDialog
        ref={userModalEditRef}
        title={t('page.users.userEdit')}
        onAction={() => {
          const validate = userFormRef.current?.onValidate();
          if (!validate?.valid) return;

          params.onEdit(params.row.id, validate.result);
          userModalEditRef.current?.handleClose();
        }}
        buttons={{
          action: {
            children: t('action.update'),
          },
          reject: { children: t('action.cancel') },
        }}
      >
        <UserForm
          ref={userFormRef}
          user={{ email: params.row.email, firstName: params.row.firstName, lastName: params.row.lastName }}
        />
      </ModalDialog>
      <ModalDialog
        ref={userModalDeleteRef}
        title={t('page.users.userDelete')}
        onAction={() => {
          params.onDelete(params.row.id);
          userModalDeleteRef.current?.handleClose();
        }}
        buttons={{
          action: {
            color: 'error',
            children: t('action.delete'),
          },
          reject: { children: t('action.cancel') },
        }}
      >
        <Stack direction='column' alignItems='center' gap={1}>
          <Icon component={DeleteOutlineOutlinedIcon} fontSize='huge' color='error' />
          <DialogContentText color='primaryText'>{t('page.users.userDeleteDescription')}</DialogContentText>
          <DialogContentText>email: {params.row.email}</DialogContentText>
        </Stack>
      </ModalDialog>
    </React.Fragment>
  );
};

export default ActionCell;
