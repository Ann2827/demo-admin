import { ButtonProps, DialogProps } from '@mui/material';

export type ModalDialogRef = {
  handleOpen: () => void;
  handleClose: () => void;
};

export interface ModalDialogProps extends Omit<DialogProps, 'open'> {
  title: string;
  onAction: () => void;
  buttons: {
    action: ButtonProps;
    reject?: ButtonProps;
  };
  // open?: DialogProps['open'];
}
