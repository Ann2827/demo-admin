import * as React from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { HeaderProps } from '../Header.types';
import { smoothScroll } from '@/utils/scroll';
import { Logo } from '@/components';

export const HeaderMenu: React.FC<{ menu: HeaderProps['menu'] }> = ({ menu }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Logo />
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton size='large' onClick={handleOpenNavMenu} color='inherit'>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {menu?.map(({ title, href }) => (
            <MenuItem key={title} onClick={handleCloseNavMenu}>
              <Typography sx={{ textAlign: 'center' }} component='a' href={href} onClick={smoothScroll}>
                {title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Logo sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {menu?.map(({ title, href }) => (
          <Button key={title} color='white' href={href} sx={{ my: 2, display: 'block' }} onClick={smoothScroll}>
            {title}
          </Button>
        ))}
      </Box>
    </React.Fragment>
  );
};
