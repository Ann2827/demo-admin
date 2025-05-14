import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Switch,
  useColorScheme,
} from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Language from '@/modules/Language';

export const MenuDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { mode, setMode } = useColorScheme();

  return (
    <Dialog onClose={onClose} open={open} maxWidth='xs' fullWidth>
      <DialogTitle textAlign='center'>{t('action.settings')}</DialogTitle>
      <DialogContent>
        <List>
          <ListItem disablePadding>
            <ListItemText sx={{ maxWidth: '200px' }}>{t('field.language')}</ListItemText>
            <Language />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText sx={{ maxWidth: '200px' }}>{t('field.darkTheme')}</ListItemText>
            <Switch
              size='small'
              checked={mode === 'dark'}
              onChange={(_, checked) => {
                setMode(checked ? 'dark' : 'light');
              }}
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};
