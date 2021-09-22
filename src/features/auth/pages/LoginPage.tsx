import { Divider, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useAppDispatch } from 'app/hooks';
import { Images } from 'constants/index';
import { LoginPayload } from 'models';
import { Link } from 'react-router-dom';
import { login } from '../authSlice';
import LoginForm from '../components/LoginForm';
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

function LoginPage() {
  const dispatch = useAppDispatch();

  const handleSubmit = (formValues: LoginPayload) => {
    const action = login(formValues);
    dispatch(action);
  };

  return (
    <Stack direction='row' minHeight='100vh'>
      <ArtworkImage>
        <img src={Images.SIGNIN_ARTWORK} alt='signin-artwork' />
      </ArtworkImage>

      <FormContainer>
        <Box>
          <Typography component='h1' fontSize='1.5rem' fontWeight={700}>
            Sign in to WebPractice
          </Typography>

          <SocialList />
          <Divider sx={{ color: 'text.secondary', mb: 2 }}>Or</Divider>

          <LoginForm onSubmit={handleSubmit} />
        </Box>
      </FormContainer>

      <Typography position='fixed' right={32} top={32}>
        Not a member? <Link to='/signup'>Sign up now</Link>
      </Typography>
    </Stack>
  );
}

export default LoginPage;
