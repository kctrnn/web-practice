import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <AppBar position='static' color='transparent' sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' component='h1' fontWeight={500}>
          WebPractice
        </Typography>

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
      </Toolbar>
    </AppBar>
  );
};
