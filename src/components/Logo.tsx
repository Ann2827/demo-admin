import { Icon, SxProps, Theme, Typography, Button } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import LogoSvg from '@/assets/icons/logo.svg?react';
import { ROUTE_MAIN } from '@/constants/routes';

const Logo: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => {
  const navigate = useNavigate();

  return (
    // FIXME: не работает вариант href={ROUTE_MAIN} + LinkComponent={Link}
    <Button
      variant='text'
      color='white'
      fullWidth
      sx={sx}
      onClick={() => {
        navigate(ROUTE_MAIN);
      }}
    >
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
};

export default Logo;
