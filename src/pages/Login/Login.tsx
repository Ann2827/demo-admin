import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useField from '@/hooks/field.hook';
import { listenKeydown } from '@/utils/keyboard';
import { Footer, Header, useAuth } from '@/modules';
import { ROUTE_MAIN } from '@/constants/routes';
import { InputPassword } from '@/components';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();

  const [email, changeEmail, { error: errorEmail, setError: setErrorEmail }] = useField<string>('test@mail.ru', {
    translate: t,
  });
  const [password, changePassword, { error: errorPassword, setError: setErrorPassword }] = useField<string>('123', {
    translate: t,
  });

  const handleValidation = React.useCallback(() => {
    let valid = true;
    if (!email) {
      setErrorEmail(t('message.requiredField'));
      valid = false;
    } else if (email.length > 50) {
      setErrorEmail(t('message.maxLength', { length: '50' }));
      valid = false;
    }
    if (!password) {
      setErrorPassword(t('message.requiredField'));
      valid = false;
    } else if (password.length > 50) {
      setErrorPassword(t('message.maxLength', { length: '50' }));
      valid = false;
    }
    return valid;
  }, [email, password, setErrorEmail, setErrorPassword, t]);

  const handleAuth = React.useCallback(async () => {
    if (!handleValidation()) return;
    await login({ email, password });
  }, [handleValidation, email, password, login]);

  const buttonDisabled: boolean = Boolean(errorEmail) || Boolean(errorPassword);
  React.useEffect(() => listenKeydown('Enter', handleAuth, buttonDisabled), [handleAuth, buttonDisabled]);

  return (
    <Stack direction='column' width='100%'>
      <Header />
      <Container maxWidth='sm' sx={{ mt: '64px' }}>
        <Alert severity='info' sx={{ mt: 5 }}>
          {t('message.login')}
        </Alert>
        <Paper sx={{ mt: 3 }}>
          <Stack p={4} direction='column' gap={4}>
            <Typography variant='h2' textAlign='center'>
              {t('page.login.title')}
            </Typography>
            <TextField
              label='Email'
              variant='standard'
              value={email}
              onChange={(event) => changeEmail(event.target.value)}
            />
            <InputPassword
              id='password'
              label={t('field.password')}
              type='password'
              value={password}
              onChange={(event) => changePassword(event.target.value)}
            />
            <Stack direction='row' mt={3} justifyContent='space-between'>
              <Button
                onClick={() => {
                  navigate(ROUTE_MAIN);
                }}
              >
                {t('action.back')}
              </Button>
              <Button onClick={handleAuth} disabled={buttonDisabled} variant='contained'>
                {t('action.login')}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
      <Footer sx={{ position: 'fixed', bottom: 0 }} />
    </Stack>
  );
};

export default Login;
