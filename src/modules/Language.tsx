import { Stack, styled, ToggleButton, ToggleButtonGroup, ToggleButtonProps, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Locales } from '@/constants/locale';

import CacheManager from './CacheManager';

const CustomToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  color: 'inherit',
  border: 0,
  '&.Mui-selected': {
    textDecoration: 'underline',
    backgroundColor: 'inherit',
    color: 'inherit',
  },
  '&:hover': {
    color: theme.palette.secondary.lighter,
    transition: '0.3s ease-in-out',
    backgroundColor: 'inherit',
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'inherit',
  },
}));

const Language: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = React.useCallback(
    (lang: Locales | null) => {
      if (!lang) return;

      i18n.changeLanguage(lang);
      document.documentElement.setAttribute('lang', lang);
      CacheManager.set('locale', lang);
    },
    [i18n],
  );

  return (
    <Stack direction='row' gap={1}>
      <ToggleButtonGroup
        value={i18n.language}
        exclusive
        onChange={(_event, value) => handleChange(value)}
        aria-label='locale'
        size='small'
        sx={{ alignItems: 'center' }}
      >
        <CustomToggleButton value={Locales.ru} aria-label='ru'>
          {Locales.ru.toUpperCase()}
        </CustomToggleButton>
        <Typography variant='caption'>/</Typography>
        <CustomToggleButton value={Locales.en} aria-label='en'>
          {Locales.en.toUpperCase()}
        </CustomToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default Language;
