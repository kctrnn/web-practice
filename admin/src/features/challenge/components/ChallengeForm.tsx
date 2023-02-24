import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { InputField, SelectField } from 'components/FormFields';
import { Challenge, PathSlug } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Missing name'),
  description: yup.string().required('Missing description'),
  pathSlug: yup.string().required('Missing path slug'),
  level: yup.number().min(0).max(5).required('Missing level'),
});

export interface ChallengeFormProps {
  onSubmit?: (formValues: Challenge) => void;
  initialValues?: Challenge;
}

export interface PathSlugOption {
  value: PathSlug;
  label: string;
}

function ChallengeForm({ onSubmit, initialValues }: ChallengeFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Challenge>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const pathSlugOptionList: PathSlugOption[] = [
    { value: 'responsive-web-developer', label: 'response web developer' },
    { value: 'front-end-developer', label: 'frontend developer' },
    { value: 'full-stack-developer', label: 'fullstack developer' },
  ];

  const handleFormSubmit = async (formValues: Challenge) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log('Failed to submit', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField control={control} name="name" label="Name" />
      <InputField
        name="description"
        control={control}
        label="Description"
        rows={4}
      />
      <InputField name="level" control={control} label="Level" type="number" />

      <SelectField
        name="pathSlug"
        control={control}
        options={pathSlugOptionList}
        label="PathSlug"
      />

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

export default ChallengeForm;
