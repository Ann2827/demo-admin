import * as React from 'react';
import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, InputProps } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const InputPassword: React.FC<InputProps & { label?: string; helperText?: string }> = ({
  label,
  id,
  helperText,
  error,
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant='standard'>
      {label && id && <InputLabel htmlFor={id}>Password</InputLabel>}
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        error={error}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label={showPassword ? 'hide the password' : 'display the password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...rest}
      />
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default InputPassword;
