import { Accordion, AccordionDetails, AccordionSummary, Avatar, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export const MenuAccordion: React.FC<React.PropsWithChildren<{ email?: string }>> = ({ children, email }) => {
  return (
    <Accordion elevation={0}>
      <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon color='primary' />}>
        <Stack spacing={2} direction='row' alignItems='center'>
          <Avatar sx={(theme) => ({ bgcolor: theme.palette.secondary.main })}>{email?.[0].toUpperCase()}</Avatar>
          <Stack direction='column' flexGrow={1} flexWrap='wrap'>
            <Typography variant='subtitle2' textTransform='none'>
              {email}
            </Typography>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
