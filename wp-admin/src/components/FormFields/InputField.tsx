import { TextField } from '@material-ui/core';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps {
  name: string;
  control: Control<any>;

  type?: string;
  placeholder?: string;
  label?: string;
  size?: 'small' | 'medium';
  rows?: number;
}

export const InputField = (props: InputFieldProps) => {
  const {
    name,
    control,
    placeholder,
    label,
    size = 'small',
    type = 'text',
    rows,
  } = props;

  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      {...field}
      variant="outlined"
      fullWidth
      error={invalid}
      helperText={error?.message}
      label={label}
      size={size}
      placeholder={placeholder}
      type={type}
      autoComplete="off"
      margin="normal"
      multiline={Boolean(rows)}
      rows={rows}
    />
  );
};
