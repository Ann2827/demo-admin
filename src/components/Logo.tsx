import { Icon, SxProps, Theme, Typography, Button } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

import LogoSvg from '@/assets/icons/logo.svg?react';
import { ROUTE_MAIN } from '@/constants/routes';

const Logo: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => (
  // FIXME: не работает ссылка
  <Button href={ROUTE_MAIN} variant='text' color='white' fullWidth sx={sx} LinkComponent={Link}>
    <Icon component={LogoSvg} sx={{ mr: 1, cursor: 'pointer' }} />
    <Typography
      variant='h6'
      noWrap
      sx={{
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      LOGO
    </Typography>
  </Button>
);

export default Logo;
