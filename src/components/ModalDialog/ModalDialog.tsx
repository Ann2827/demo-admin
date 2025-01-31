import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';

import { listenKeydown } from '@/utils/keyboard';

import { ModalDialogProps, ModalDialogRef } from './ModalDialog.types';

const ModalDialog = React.forwardRef<ModalDialogRef, React.PropsWithChildren<ModalDialogProps>>(
  ({ title, children, buttons, onAction, ...rest }, ref) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = React.useCallback(() => {
      setOpen(true);
    }, []);
    const handleClose = React.useCallback(() => {
      setOpen(false);
    }, []);

    React.useImperativeHandle(
      ref,
      () => ({
        handleOpen,
        handleClose,
      }),
      [handleOpen, handleClose],
    );

    React.useEffect(
      () => listenKeydown('Enter', onAction, buttons.action.disabled || !open),
      [buttons.action, onAction, open],
    );

    return (
      <Dialog maxWidth='sm' fullWidth {...rest} open={open}>
        <DialogTitle variant='h6' p={2}>
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 3, px: 2 }}>{children}</DialogContent>
        <Divider />
        <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: 2 }}>
          {buttons.reject && (
            <Button
              color='secondary'
              {...buttons.reject}
              onClick={(event) => {
                buttons.reject?.onClick?.(event);
                handleClose();
              }}
            />
          )}
          <Button variant='outlined' {...buttons.action} onClick={onAction} />
        </DialogActions>
      </Dialog>
    );
  },
);

export default ModalDialog;
