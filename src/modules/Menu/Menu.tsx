import * as React from 'react';
import { Box, Drawer, FormControlLabel, IconButton, Switch, Typography, useColorScheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';

import { ROUTE_DASHBOARD, ROUTE_POSTS, ROUTE_TASKS, ROUTE_USERS } from '@/constants/routes';
import { useAuth } from '../Auth';
import useNeeds from '@/hooks/needs.hook';

import { MenuComponent, MenuComponentConfigItem, MenuComponentProfileConfigItem } from './components';

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { store } = useNeeds(['profile', 'posts', 'tasks']);
  const { logout } = useAuth();
  const { mode, setMode } = useColorScheme();

  const [open, setOpen] = React.useState(false);

  const menuConfig = React.useMemo<MenuComponentConfigItem[]>(
    () => [
      { route: ROUTE_DASHBOARD, text: t('page.dashboard.title'), icon: GridViewOutlinedIcon },
      { route: ROUTE_USERS, text: t('page.users.title'), icon: PeopleAltOutlinedIcon },
      { route: ROUTE_POSTS, text: t('page.posts.title'), icon: DnsOutlinedIcon, bage: store?.posts?.length },
      {
        route: ROUTE_TASKS,
        text: t('page.tasks.title'),
        icon: PlaylistAddCheckOutlinedIcon,
        bage: store?.tasks?.length,
      },
    ],
    [store, t],
  );

  const profileConfig = React.useMemo<MenuComponentProfileConfigItem[]>(
    () => [
      {
        node: (
          <FormControlLabel
            control={
              <Switch
                size='small'
                checked={mode === 'dark'}
                onChange={(_, checked) => {
                  setMode(checked ? 'dark' : 'light');
                }}
              />
            }
            label={
              <Typography color='secondary' variant='caption'>
                {t('field.darkTheme')}
              </Typography>
            }
            sx={{ marginRight: 0, marginLeft: '-6px' }}
          />
        ),
      },
      { text: t('action.exit'), icon: LogoutOutlinedIcon, action: logout },
    ],
    [logout, mode, setMode, t],
  );

  return (
    <React.Fragment>
      <MenuComponent
        config={menuConfig}
        onItemAction={({ route }) => {
          navigate(route);
        }}
        activeRoute={pathname}
        profile={store?.profile || null}
        profileConfig={profileConfig}
        sx={{ display: { md: 'flex', xs: 'none' } }}
      />
      <Box sx={{ display: { md: 'none', xs: 'flex' }, height: 'fit-content' }}>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
          sx={{ p: 2 }}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <Drawer
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <MenuComponent
            config={menuConfig}
            onItemAction={({ route }) => {
              navigate(route);
            }}
            activeRoute={pathname}
            profile={store?.profile || null}
            profileConfig={profileConfig}
            onClose={() => {
              setOpen(false);
            }}
          />
        </Drawer>
      </Box>
    </React.Fragment>
  );
};

export default Menu;
