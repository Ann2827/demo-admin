import { Box } from '@mui/material';
import * as React from 'react';

import MainImg from '@/assets/images/main.png';

const Background: React.FC = () => (
  <React.Fragment>
    <Box
      sx={{
        position: 'absolute',
        backgroundImage: `url(${MainImg})`,
        backgroundRepeat: 'no-repeat',
        opacity: 0.4,
        transform: 'scale(1, -1)',
        backgroundPositionY: 'bottom',
        filter: 'saturate(1.5)',
        right: '-100px',
      }}
      height='100%'
      width='100%'
    />
    <Box
      sx={{
        position: 'absolute',
        backgroundImage: `url(${MainImg})`,
        backgroundRepeat: 'no-repeat',
        opacity: 0.4,
        transform: 'scale(-1, 1)',
        backgroundPositionY: 'bottom',
        filter: 'saturate(1.5)',
        left: '-200px',
      }}
      height='100%'
      width='100%'
    />
  </React.Fragment>
);

export default Background;
