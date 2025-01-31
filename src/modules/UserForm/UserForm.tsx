import * as React from 'react';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslation } from 'react-i18next';

import { IUser } from '@/types/validation';
import useField from '@/hooks/field.hook';
import { InputPassword } from '@/components';

import { UserFormProps, UserFormRef } from './UserForm.types';

const UserForm = React.forwardRef<UserFormRef, UserFormProps>(({ sx, user, withPassword = false }, ref) => {
  const { t } = useTranslation();

  const [email, changeEmail, { error: errorEmail, setError: setErrorEmail }] = useField<IUser['email']>(user.email, {
    translate: t,
  });
  const [firstName, changeFirstName, { error: errorFirstName, setError: setErrorFirstName }] = useField<
    IUser['firstName']
  >(user.firstName, { translate: t });
  const [lastName, changeLastName, { error: errorLastName, setError: setErrorLastName }] = useField<IUser['lastName']>(
    user.lastName,
    { translate: t },
  );
  const [password, changePassword, { error: errorPassword, setError: setErrorPassword }] = useField<string>('', {
    translate: t,
  });

  const result = React.useMemo<ReturnType<UserFormRef['onValidate']>['result']>(() => {
    const r: ReturnType<UserFormRef['onValidate']>['result'] = { email, firstName, lastName };
    if (withPassword) r.password = password;
    return r;
  }, [email, firstName, lastName, password, withPassword]);
  const onValidate = React.useCallback(() => {
    let valid = true;

    if (!result.email) {
      setErrorEmail('message.requiredField');
      valid = false;
    }
    if (!result.firstName) {
      setErrorFirstName('message.requiredField');
      valid = false;
    }
    if (!result.lastName) {
      setErrorLastName('message.requiredField');
      valid = false;
    }
    if (withPassword && !result?.password) {
      setErrorPassword('message.requiredField');
      valid = false;
    }

    return { valid, result };
  }, [result, setErrorEmail, setErrorFirstName, setErrorLastName, setErrorPassword, withPassword]);

  React.useImperativeHandle(
    ref,
    () => ({
      onValidate,
    }),
    [onValidate],
  );

  return (
    <Grid container spacing={2} sx={sx}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label='Email'
          variant='standard'
          value={email}
          onChange={(event) => {
            changeEmail(event.target.value);
          }}
          fullWidth
          error={!!errorEmail}
          helperText={errorEmail}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label='First Name'
          variant='standard'
          value={firstName}
          onChange={(event) => {
            changeFirstName(event.target.value);
          }}
          fullWidth
          error={!!errorFirstName}
          helperText={errorFirstName}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label='Last Name'
          variant='standard'
          value={lastName}
          onChange={(event) => {
            changeLastName(event.target.value);
          }}
          fullWidth
          error={!!errorLastName}
          helperText={errorLastName}
        />
      </Grid>
      {withPassword && (
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputPassword
            label='Password'
            type='password'
            value={password}
            onChange={(event) => {
              changePassword(event.target.value);
            }}
            fullWidth
            error={!!errorPassword}
            helperText={errorPassword}
          />
        </Grid>
      )}
    </Grid>
  );
});

export default UserForm;
