import * as React from 'react';
import {
  Divider,
  Stack,
  StackProps,
  styled,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import { ROUTE_DASHBOARD, ROUTE_POSTS, ROUTE_TASKS, ROUTE_USERS } from '@/constants/routes';
import { useAuth } from '../Auth';
import useNeeds from '@/hooks/needs.hook';

import { MenuDialog, MenuDrawer, MenuList, MenuListProps, MenuProfileConfig, MunuProfile } from './components';
import { MenuAccordion } from './components/MenuAccordion';
import { Logo } from '@/components';

const MenuWrapper = styled(Stack)<StackProps>(({ theme }) =>
  theme.unstable_sx({
    component: 'nav',
    direction: 'column',
    height: '100%',
    maxHeight: '100vh',
    width: '360px',
    justifyContent: 'space-between',
    overflowY: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,
  }),
);

const config: MenuListProps['config'] = [
  { route: ROUTE_DASHBOARD, text: 'page.dashboard.title', icon: GridViewOutlinedIcon },
  { route: ROUTE_USERS, text: 'page.users.title', icon: PeopleAltOutlinedIcon },
  { route: ROUTE_POSTS, text: 'page.posts.title', icon: DnsOutlinedIcon },
  { route: ROUTE_TASKS, text: 'page.tasks.title', icon: PlaylistAddCheckOutlinedIcon },
];

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { store } = useNeeds(['profile', 'posts', 'tasks']);
  const { logout } = useAuth();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDialogOpen = React.useCallback(() => {
    setDialogOpen(true);
  }, []);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const profileConfig = React.useMemo<MenuProfileConfig[]>(
    () => [
      { text: 'action.settings', icon: SettingsRoundedIcon, action: handleDialogOpen },
      { text: 'action.exit', icon: LogoutOutlinedIcon, action: logout },
    ],
    [logout, handleDialogOpen],
  );

  return (
    <React.Fragment>
      <MenuWrapper sx={{ display: { md: 'flex', xs: 'none' } }}>
        <Stack>
          <Stack py={1} px={2} alignItems='center' justifyContent='center' direction='row'>
            <Logo />
          </Stack>
          <Divider variant='middle' />
          <MenuList
            config={config}
            bages={[0, 0, store?.posts?.length, store?.tasks?.length]}
            onItemAction={({ route }) => {
              navigate(route);
            }}
            activeRoute={pathname}
          />
        </Stack>
        <Stack>
          <Divider variant='middle' />
          <MenuAccordion email={store.profile?.email}>
            <MunuProfile config={profileConfig} />
          </MenuAccordion>
        </Stack>
      </MenuWrapper>

      <MenuDrawer sx={{ display: { md: 'none', xs: 'flex' }, height: 'fit-content' }}>
        <MenuWrapper>
          <MenuList
            config={config}
            onItemAction={({ route }) => {
              navigate(route);
            }}
            activeRoute={pathname}
          />
          <Stack>
            <Divider variant='middle' />
            <MunuProfile config={profileConfig} />
          </Stack>
        </MenuWrapper>
      </MenuDrawer>

      <MenuDialog open={dialogOpen} onClose={handleDialogClose} />
    </React.Fragment>
  );
};

export default Menu;
