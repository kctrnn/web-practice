import { TextField } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;

  label?: string;
}

export const InputField = ({
  name,
  control,
  label,
  ...inputProps
}: InputFieldProps) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
  });

  return (
    <TextField
      {...field}
      variant='outlined'
      fullWidth
      label={label}
      inputProps={inputProps}
      margin='normal'
      autoComplete='off'
      error={invalid}
      helperText={error?.message}
    />
  );
};
