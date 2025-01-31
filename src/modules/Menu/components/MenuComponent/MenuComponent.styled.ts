import { ListItem, ListItemProps, styled } from '@mui/material';

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ListItemProps & { active: boolean }>(({ theme, active }) =>
  theme.unstable_sx({
    bgcolor: active ? theme.palette.primary.lighter : 'inherit',
    borderRadius: '4px',
    my: 1,
    ':hover': {
      bgcolor: active ? theme.palette.primary.light : 'inherit',
    },
  }),
);
