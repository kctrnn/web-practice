import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoginPayload } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *:last-child': {
      margin: theme.spacing(2, 0),
    },
  },
}));

const schema = yup.object().shape({
  password: yup.string().required('Please enter your password'),
});

export interface LoginFormProps {
  onSubmit?: (formValues: LoginPayload) => void;
  initialValues?: LoginPayload;
}

const LoginForm = ({ onSubmit, initialValues }: LoginFormProps) => {
  const classes = useStyles();

  const isLogging = useAppSelector((state) => state.auth.logging);

  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues: LoginPayload) => {
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        control={control}
        name="password"
        type="password"
        placeholder="Enter your password"
        size="medium"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
        disabled={isLogging}
      >
        {isLogging && <CircularProgress size={24} color="primary" />} &nbsp; Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
