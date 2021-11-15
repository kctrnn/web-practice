import { TextField } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;

  label?: string;
  variant?: 'filled' | 'standard' | 'outlined';
  rows?: number;
}

export const InputField = ({
  name,
  control,
  label,
  rows,
  variant = 'filled',
  ...inputProps
}: InputFieldProps) => {
  const {
    field: { ref, ...rest },
    fieldState: { invalid, error },
  } = useController({
    control,
    name,
  });

  //   field: { name, value, onChange, onBlur, ref }

  return (
    <TextField
      {...rest}
      inputRef={ref}
      variant={variant}
      fullWidth
      label={label}
      margin="normal"
      autoComplete="off"
      error={invalid}
      helperText={error?.message}
      inputProps={{ ...inputProps, style: { fontSize: 14 } }}
      InputLabelProps={{ style: { fontSize: 14 } }}
      multiline={Boolean(rows)}
      rows={rows}
    />
  );
};
