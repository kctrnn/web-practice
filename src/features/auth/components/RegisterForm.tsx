import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Stack } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, PasswordField } from 'components/FormFields';
import { SignupPayload } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { selectAuthLoading } from '../authSlice';

export interface RegisterFormProps {
  onSubmit?: (formValues: SignupPayload) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Please enter your name'),

  username: yup.string().required('Please enter your username'),
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email address'),

  password: yup.string().required('Please enter your password'),
});

function RegisterForm({ onSubmit }: RegisterFormProps) {
  const isLogging = useAppSelector(selectAuthLoading);

  const { control, handleSubmit } = useForm<SignupPayload>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },

    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues: SignupPayload) => {
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack
        direction='row'
        alignItems='center'
        sx={{ '> *:last-child': { ml: 4 } }}
      >
        <InputField name='name' control={control} label='Name' />
        <InputField name='username' control={control} label='Username' />
      </Stack>

      <InputField name='email' control={control} label='Email Address' />

      <PasswordField
        name='password'
        control={control}
        label='Password'
        placeholder='6+ characters'
      />

      <LoadingButton
        type='submit'
        variant='contained'
        loading={isLogging}
        size='large'
        disableElevation
        sx={{ width: '40%', mt: 2 }}
      >
        Create Account
      </LoadingButton>
    </form>
  );
}

export default RegisterForm;
