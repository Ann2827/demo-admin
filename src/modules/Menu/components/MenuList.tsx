import {
  Badge,
  Box,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  styled,
  SvgIconTypeMap,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useTranslation } from 'react-i18next';

type MenuListConfig = {
  route: string;
  text: string;
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
};
export type MenuListProps = {
  config: MenuListConfig[];
  onItemAction: (props: MenuListConfig) => void;
  activeRoute: string;
  bages?: (number | undefined)[];
};

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ListItemProps & { active: boolean }>(({ theme, active }) =>
  theme.unstable_sx({
    bgcolor: active ? theme.palette.primary.lighter : 'inherit',
    borderRadius: '4px',
    my: 1,
    ':hover': {
      bgcolor: active ? theme.palette.primary.light : 'inherit',
    },
  }),
);

export const MenuList: React.FC<MenuListProps> = ({ config, onItemAction, activeRoute, bages }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 130px)', width: '100%' }}>
      <List sx={{ px: 2, py: 0 }}>
        {config.map((item, id) => (
          <StyledListItem key={id} disablePadding active={activeRoute === item.route}>
            <ListItemButton onClick={() => onItemAction(item)}>
              <ListItemIcon sx={{ minWidth: '36px' }}>
                <Icon color='secondary' component={item.icon} fontSize='small' />
              </ListItemIcon>
              <ListItemText>
                <Typography variant='subtitle2'>{t(item.text)}</Typography>
              </ListItemText>
              <Badge badgeContent={bages?.[id]} color='primary' />
            </ListItemButton>
          </StyledListItem>
        ))}
      </List>
    </Box>
  );
};
