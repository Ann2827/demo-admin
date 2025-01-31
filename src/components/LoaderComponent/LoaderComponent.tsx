import * as React from 'react';
import { Backdrop } from '@mui/material';

import { LoaderComponentProps } from './LoaderComponent.types';
import { StyledCircularProgress } from './LoaderComponent.styled';

const LoaderComponent: React.FC<LoaderComponentProps> = ({ active = true, sx }) => {
  return (
    <Backdrop
      sx={(theme) => theme.unstable_sx({ ...sx, color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={active}
    >
      <StyledCircularProgress />
    </Backdrop>
  );
};

export default LoaderComponent;
