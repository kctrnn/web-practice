import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAppSelector } from 'app/hooks';
import {
  InputField,
  RadioGroupField,
  SelectField,
} from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;

      return value.split(' ').length >= 2;
    }),

  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select either male or female')
    .required('Please select your gender'),

  age: yup
    .number()
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .integer('Please enter an integer')
    .typeError('Please enter a valid number')
    .required(),

  mark: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .typeError('Please enter a valid number')
    .required(),

  city: yup.string().required('Please select your city'),
});

export interface StudentFormProps {
  onSubmit?: (formValues: Student) => void;
  initialValues?: Student;
}

function StudentForm({ onSubmit, initialValues }: StudentFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState<string>('');

  const cityOptions = useAppSelector(selectCityOptions);

  const handleFormSubmit = async (formValues: Student) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      // setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField control={control} name="name" label="Full name" />

      <RadioGroupField
        name="gender"
        control={control}
        options={[
          { label: 'Female', value: 'female' },
          { label: 'Male', value: 'male' },
        ]}
      />

      <InputField name="age" control={control} label="Age" type="number" />
      <InputField name="mark" control={control} label="Mark" type="number" />

      <SelectField
        name="city"
        control={control}
        options={cityOptions}
        label="City"
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Box mt={2}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting && <CircularProgress size={24} color="primary" />}{' '}
          &nbsp; Save
        </Button>
      </Box>
    </form>
  );
}

export default StudentForm;
