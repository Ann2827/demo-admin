import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/locales';

import App from './App';
import theme from './theme';

import './index.css';
import '@/api';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme} defaultMode='light'>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
