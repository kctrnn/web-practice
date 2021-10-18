import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Button, Divider, Stack, Typography } from '@mui/material';
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
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  padding: theme.spacing(5),
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: '#555',
}));

const HeaderContainer = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  left: '1.5rem',
  top: '1.5rem',
  right: '1.5rem',

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ArtBy = styled(Typography)(({ theme }) => ({
  position: 'fixed',
  left: 180,
  bottom: 16,

  fontSize: '.875rem',
  color: '#555',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
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
        <HeaderContainer>
          <LinkStyled to='/'>
            <Button
              color='inherit'
              size='small'
              startIcon={<KeyboardBackspaceRoundedIcon />}
            >
              Home page
            </Button>
          </LinkStyled>

          <Typography fontSize='.875rem'>
            Not a member? <Link to='/register'>Sign up now</Link>
          </Typography>
        </HeaderContainer>

        <Box>
          <Typography
            component='h1'
            fontSize='1.5rem'
            fontWeight={700}
            fontFamily={`'Raleway', sans-serif`}
          >
            Sign in to Web Practice
          </Typography>

          <SocialList />
          <Divider sx={{ color: 'text.secondary', mb: 2 }}>Or</Divider>

          <LoginForm onSubmit={handleSubmit} />
        </Box>
      </FormContainer>

      <ArtBy>
        Art by <a href='https://dribbble.com/'>Dribbble</a>
      </ArtBy>
    </Stack>
  );
}

export default LoginPage;
