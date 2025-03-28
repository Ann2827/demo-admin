import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Box,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';

import { Logo } from '@/components';

import { StyledListItem } from './MenuComponent.styled';

import type {
  MenuComponentProfileConfigItem,
  MenuComponentProfileConfigItemAction,
  MenuComponentProps,
} from './MenuComponent.types';

function IsItemAction(payload: MenuComponentProfileConfigItem): payload is MenuComponentProfileConfigItemAction {
  return 'action' in payload;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  sx,
  profile,
  config,
  onItemAction,
  activeRoute,
  profileConfig,
  onClose,
}) => (
  <Stack
    component='nav'
    direction='column'
    height='100%'
    maxHeight='100vh'
    width='360px'
    justifyContent='space-between'
    sx={(theme) => theme.unstable_sx({ ...sx, overflowY: 'hidden', borderRight: `1px solid ${theme.palette.divider}` })}
  >
    <Stack>
      <Stack py={1} px={2} alignItems='center' justifyContent='center' direction='row'>
        <Logo />
        {!!onClose && (
          <IconButton onClick={() => onClose?.()}>
            <Icon component={MenuOpenOutlinedIcon} />
          </IconButton>
        )}
      </Stack>
      <Divider variant='middle' />
      <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 130px)' }}>
        <List sx={{ px: 2, py: 0 }}>
          {config.map((item, id) => (
            <StyledListItem key={id} disablePadding active={activeRoute === item.route}>
              <ListItemButton onClick={() => onItemAction(item)}>
                <ListItemIcon sx={{ minWidth: '36px' }}>
                  <Icon color='secondary' component={item.icon} fontSize='small' />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant='subtitle2'>{item.text}</Typography>
                </ListItemText>
                <Badge badgeContent={item.bage} color='primary' />
              </ListItemButton>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Stack>
    <Stack>
      <Divider variant='middle' />
      <Accordion elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon color='primary' />}>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Avatar sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}>
              {profile?.email[0].toUpperCase()}
            </Avatar>
            <Stack direction='column' flexGrow={1} flexWrap='wrap'>
              <Typography variant='subtitle2' textTransform='none'>
                {profile?.email}
              </Typography>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <List disablePadding dense>
            {profileConfig.map((item, id) => (
              <ListItem disablePadding key={id}>
                {IsItemAction(item) ? (
                  <ListItemButton onClick={item.action}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <Icon color='secondary' component={item.icon} />
                    </ListItemIcon>
                    <ListItemText secondary={item.text} slotProps={{ secondary: { variant: 'caption' } }} />
                  </ListItemButton>
                ) : (
                  <Box py={0.5} px={2}>
                    {item.node}
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Stack>
  </Stack>
);

export default MenuComponent;
