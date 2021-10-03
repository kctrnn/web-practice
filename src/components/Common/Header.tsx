import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/auth/authSlice';
import { Link } from 'react-router-dom';

export const Header = () => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const Logo = styled(Typography)(() => ({
    fontSize: '1.2rem',
    fontWeight: 700,
    fontFamily: `'Raleway', sans-serif`,
  }));

  const ButtonText = styled(Typography)(() => ({
    fontSize: '0.875rem',
  }));

  return (
    <AppBar position='static' color='transparent' sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Logo>🚀 Web Practice</Logo>

        {!isLoggedIn && (
          <Stack direction='row' spacing={2}>
            <Link to='/login'>
              <Button>
                <ButtonText>Sign in</ButtonText>
              </Button>
            </Link>

            <Link to='/signup'>
              <Button variant='contained' disableElevation>
                <ButtonText>Sign up</ButtonText>
              </Button>
            </Link>
          </Stack>
        )}

        {isLoggedIn && (
          <Button
            variant='outlined'
            color='warning'
            disableElevation
            onClick={handleLogoutClick}
          >
            <ButtonText>Logout</ButtonText>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
