import { Box, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

type MenuProfileConfigItem = {
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
  action: (...args: any) => void;
};
export type MenuProfileConfig = MenuProfileConfigItem | { node: React.ReactNode };

function IsItemAction(payload: MenuProfileConfig): payload is MenuProfileConfigItem {
  return 'action' in payload;
}

export const MunuProfile: React.FC<{ config: MenuProfileConfig[] }> = ({ config }) => {
  const { t } = useTranslation();

  return (
    <List disablePadding dense>
      {config.map((item, id) => (
        <ListItem disablePadding key={id}>
          {IsItemAction(item) ? (
            <ListItemButton onClick={item.action}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                <Icon color='secondary' component={item.icon} />
              </ListItemIcon>
              <ListItemText secondary={t(item.text)} slotProps={{ secondary: { variant: 'caption' } }} />
            </ListItemButton>
          ) : (
            <Box py={0.5} px={2}>
              {item.node}
            </Box>
          )}
        </ListItem>
      ))}
    </List>
  );
};
