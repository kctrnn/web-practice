import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Stack } from '@mui/material';

function SocialList() {
  return (
    <Stack direction='row' my={4} spacing={2}>
      <Button
        variant='contained'
        size='large'
        disableElevation
        startIcon={<GitHubIcon />}
        sx={{
          textTransform: 'none',
          width: 240,
          bgcolor: 'grey.800',
          ':hover': { bgcolor: 'grey.900' },
        }}
      >
        Sign in with Github
      </Button>

      <Button
        variant='contained'
        disableElevation
        size='large'
        sx={{
          bgcolor: '#f2f2f2',
          color: '#6e6d7a',
          minWidth: 48,
          px: 1,
          ':hover': { bgcolor: '#e5e5e5' },
        }}
      >
        <GoogleIcon />
      </Button>
    </Stack>
  );
}

export default SocialList;
