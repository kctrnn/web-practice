import { Divider, Link, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useAppDispatch } from 'app/hooks';
import { Images } from 'constants/index';
import { SignupPayload } from 'models';
import { signup } from '../authSlice';
import RegisterForm from '../components/RegisterForm';
import SocialList from '../components/SocialList';

const ArtworkImage = styled('div')(({ theme }) => ({
  width: 480,
  flexShrink: 0,

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },

  '& > img': {
    height: '100%',
    objectFit: 'cover',
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  padding: theme.spacing(5),
}));

function RegisterPage() {
  const dispatch = useAppDispatch();

  const handleSubmit = (formValues: SignupPayload) => {
    const action = signup(formValues);
    dispatch(action);
  };

  return (
    <Stack direction='row' minHeight='100vh'>
      <ArtworkImage>
        <img src={Images.SIGNUP_ARTWORK} alt='signup-artwork' />
      </ArtworkImage>

      <FormContainer>
        <Box>
          <Typography component='h1' fontSize='1.5rem' fontWeight={700}>
            Sign up to WebPractice
          </Typography>

          <SocialList isRegisterMode />

          <Divider sx={{ color: 'text.secondary', mb: 2 }}>Or</Divider>

          <RegisterForm onSubmit={handleSubmit} />
        </Box>
      </FormContainer>

      <Typography position='fixed' right={32} top={32}>
        Already a member?{' '}
        <Link href='#' underline='none'>
          Sign In
        </Link>
      </Typography>
    </Stack>
  );
}

export default RegisterPage;
