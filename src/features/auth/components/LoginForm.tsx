import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from 'app/hooks';
import { InputField, PasswordField } from 'components/FormFields';
import { LoginPayload } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { selectAuthLoading } from '../authSlice';

export interface LoginFormProps {
  onSubmit?: (formValues: LoginPayload) => void;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email address'),

  password: yup.string().required('Please enter your password'),
});

function LoginForm({ onSubmit }: LoginFormProps) {
  const isLogging = useAppSelector(selectAuthLoading);

  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: LoginPayload) => {
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name='email' control={control} label='Email Address' />

      <PasswordField name='password' control={control} label='Password' />

      <LoadingButton
        type='submit'
        variant='contained'
        loading={isLogging}
        size='large'
        disableElevation
        sx={{ width: '50%', mt: 2 }}
      >
        Sign In
      </LoadingButton>
    </form>
  );
}

export default LoginForm;
