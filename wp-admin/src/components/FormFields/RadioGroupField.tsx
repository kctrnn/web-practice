import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Control, useController } from "react-hook-form";

export interface RadioOption {
  value: string | number;
  label: string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  options: RadioOption[];

  label?: string;
}

export function RadioGroupField({
  name,
  control,
  options,
  label,
}: RadioGroupFieldProps) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl component='fieldset' error={invalid} margin='normal'>
      <FormLabel component='legend'>{label}</FormLabel>

      <RadioGroup {...field}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio size='small' color='primary' />}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
