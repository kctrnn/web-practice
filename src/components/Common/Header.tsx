import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Header = () => {
  return (
    <AppBar position='static' color='transparent' sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' component='h1'>
          WebPractice.
        </Typography>

        <Stack direction='row' spacing={2}>
          <Button>Sign in</Button>
          <Button variant='contained'>Sign up</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
