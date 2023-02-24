import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { User } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Missing name'),
  email: yup.string().required('Missing email'),
  username: yup.string().required('Missing username'),
  bio: yup.string(),
});

export interface UserFormProps {
  onSubmit?: (formValues: User) => void;
  initialValues?: User;
}

function UserForm({ onSubmit, initialValues }: UserFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<User>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: User) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log('Failed to submit', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField control={control} name="name" label="Name" />
      <InputField control={control} name="email" label="Email" />
      <InputField control={control} name="username" label="Username" />
      <InputField name="bio" control={control} label="Bio" rows={4} />

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

export default UserForm;
