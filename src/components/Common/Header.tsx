import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/auth/authSlice';
import { Link } from 'react-router-dom';

export const Header = () => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <AppBar position='static' color='transparent' sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' component='h1' fontWeight={500}>
          WebPractice
        </Typography>

        {!isLoggedIn && (
          <Stack direction='row' spacing={2}>
            <Link to='/login'>
              <Button>Sign in</Button>
            </Link>

            <Link to='/signup'>
              <Button variant='contained' disableElevation>
                Sign up
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
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
