import { MenuItem, TextField } from "@material-ui/core";
import { Control, useController } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  options: SelectOption[];

  label?: string;
}

export function SelectField({
  name,
  control,
  options,
  label,
}: SelectFieldProps) {
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
      select
      label={label}
      variant='outlined'
      fullWidth
      size='small'
      margin='normal'
      helperText={error?.message}
      error={invalid}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
