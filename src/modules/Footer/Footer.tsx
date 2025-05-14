import * as React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FooterProps } from './Footer.types';

const Footer: React.FC<FooterProps> = ({ sx }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Stack width='100%' p={2} direction='row' justifyContent='center' bgcolor={theme.palette.third.lighter} sx={sx}>
      <Typography color='textSecondary'>{t('label.copyright', { date: new Date().getFullYear() })}</Typography>
    </Stack>
  );
};

export default Footer;
