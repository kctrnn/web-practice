import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { InputHTMLAttributes, useState } from 'react';
import { Control, useController } from 'react-hook-form';

export interface PasswordFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;

  label?: string;
}

export const PasswordField = ({
  name,
  control,
  label,
  ...inputProps
}: PasswordFieldProps) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...field}
      variant='filled'
      fullWidth
      label={label}
      inputProps={inputProps}
      margin='normal'
      autoComplete='off'
      error={invalid}
      helperText={error?.message}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPassword((x) => !x)}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
