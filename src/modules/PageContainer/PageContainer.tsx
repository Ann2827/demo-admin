import * as React from 'react';
import { Container, Divider, Stack, Typography, useMediaQuery } from '@mui/material';

import { Menu } from '../Menu';

import { PageContainerProps } from './PageContainer.types';
import Language from '../Language';

const PageContainer: React.FC<React.PropsWithChildren<PageContainerProps>> = ({ sx, children, title }) => {
  const isTablet = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return isTablet ? (
    <Stack direction='column' sx={sx}>
      <Stack direction='row' width='100%' alignItems='center'>
        <Menu />
        {title && (
          <Typography variant='subtitle1' color='textSecondary' p={2}>
            {title}
          </Typography>
        )}
      </Stack>
      <Divider />
      <Container sx={{ minHeight: 'calc(100vh - 57px)', width: '100%' }} component='main'>
        <Stack my={2}>{children}</Stack>
      </Container>
    </Stack>
  ) : (
    <Stack direction='row' width='100%' sx={{ ...sx, overflowY: 'hidden' }}>
      <Menu />
      <Stack direction='column' width='100%'>
        {title && (
          <Stack direction='column' width='100%'>
            <Typography variant='subtitle1' color='textSecondary' p={2}>
              {title}
            </Typography>
            <Divider />
          </Stack>
        )}
        <Container
          sx={{
            minHeight: 'calc(100vh - 53px)',
            overflow: 'auto',
          }}
          component='main'
        >
          <Stack my={3}>{children}</Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default PageContainer;
