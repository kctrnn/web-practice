import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { Solution } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Missing title'),
  demoUrl: yup.string().required('Missing demoUrl'),
  repoUrl: yup.string().required('Missing repoUrl'),
  challengeId: yup.string().required('Missing challengeId'),
  userId: yup.string().required('Missing userId'),
});

export interface SolutionFormProps {
  onSubmit?: (formValues: Solution) => void;
  initialValues?: Solution;
}

function SolutionForm({ onSubmit, initialValues }: SolutionFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Solution>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Solution) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log('Failed to submit', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField control={control} name="title" label="Title" />
      <InputField control={control} name="demoUrl" label="DemoUrl" />
      <InputField control={control} name="repoUrl" label="RepoUrl" />
      <InputField control={control} name="challengeId" label="ChallengeId" />
      <InputField control={control} name="userId" label="UserId" />

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

export default SolutionForm;
