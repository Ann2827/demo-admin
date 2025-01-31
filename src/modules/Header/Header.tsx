import * as React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';

import { HeaderProps } from './Header.types';
import { HeaderMenu } from './components';

const Header: React.FC<HeaderProps> = ({ sx, menu, endContent = null }) => (
  <AppBar position='fixed' sx={sx}>
    <Container maxWidth='xl'>
      <Toolbar disableGutters>
        <HeaderMenu menu={menu} />
        {endContent}
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
