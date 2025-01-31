import { styled } from '@mui/material';

export const StyledCircularProgress = styled('div')(({ theme }) =>
  theme.unstable_sx({
    width: '100px',
    height: '100px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: theme.zIndex.drawer + 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: theme.palette.secondary.dark,
      borderRadius: '50px',
      opacity: 0,
    },
    ':before': {
      transform: 'scale(1)',
      animation: 'pulse 2s infinite linear',
    },
    ':after': {
      animation: 'pulse 2s 1s infinite linear',
    },
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(0.6)',
        opacity: 0,
      },
      '33%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(1.4)',
        opacity: 0,
      },
    },
  }),
);
