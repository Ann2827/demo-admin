import { Box } from '@mui/material';
import * as React from 'react';

// background-color: rgba(0, 0, 0, 0.26);

const Dot: React.FC<{ active: boolean }> = ({ active }) => (
  <Box
    sx={(theme) => ({
      width: '8px',
      height: '8px',
      margin: '0 2px',
      borderRadius: '50%',
      transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      bgcolor: active ? theme.palette.primary.main : theme.palette.divider,
    })}
  />
);

export default Dot;
