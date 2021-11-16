import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Button, Stack } from '@mui/material';
import { toast } from 'react-toastify';

function SocialList() {
  const handleClick = () => {
    toast.info('This feature is coming', { icon: '🚀', position: 'top-right' });
  };

  return (
    <Stack direction="row" my={4} spacing={2}>
      <Button
        variant="contained"
        disableElevation
        startIcon={<GitHubIcon />}
        sx={{
          fontSize: '.75rem',
          textTransform: 'none',
          width: 240,
          bgcolor: 'grey.800',
          ':hover': { bgcolor: 'grey.900' },
        }}
        onClick={handleClick}
      >
        Continue with Github
      </Button>

      <Button
        variant="contained"
        disableElevation
        sx={{
          bgcolor: '#f2f2f2',
          color: '#6e6d7a',
          minWidth: 44,
          px: 1,
          ':hover': { bgcolor: '#e5e5e5' },
        }}
        onClick={handleClick}
      >
        <GoogleIcon />
      </Button>
    </Stack>
  );
}

export default SocialList;
