import { Box, Divider, Drawer, Icon, IconButton, Stack, SxProps, Theme } from '@mui/material';
import * as React from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

import { Logo } from '@/components';

export const MenuDrawer: React.FC<React.PropsWithChildren<{ sx?: SxProps<Theme> }>> = ({ children, sx }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={sx}>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
        sx={{ p: 2 }}
      >
        <MenuOutlinedIcon />
      </IconButton>
      <Drawer open={open} onClose={handleClose}>
        <Stack py={1} px={2} alignItems='center' justifyContent='center' direction='row'>
          <Logo />
          <IconButton onClick={handleClose}>
            <Icon component={MenuOpenOutlinedIcon} />
          </IconButton>
        </Stack>
        <Divider variant='middle' />
        {children}
      </Drawer>
    </Box>
  );
};
