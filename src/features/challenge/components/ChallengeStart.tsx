import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { TOKEN } from 'constants/index';

const List = styled('ul')(({ theme }) => ({
  listStyleType: 'none',
  fontFamily: `'Lato', sans-serif`,
  marginBottom: theme.spacing(2),
}));

function ChallengeStart() {
  const isLoggedIn = Boolean(localStorage.getItem(TOKEN));

  return (
    <Paper variant='outlined' sx={{ p: 2.5 }}>
      <Typography fontWeight={500} mb={1.5}>
        How to start
      </Typography>

      <List>
        <li>1. Read the challenge's details</li>
        <li>2. Start the challenge and download the resources</li>
        <li>3. Check designs on Figma</li>
        <li>4. Have fun coding!</li>
      </List>

      {!isLoggedIn && (
        <Typography
          fontSize='.75rem'
          color='grey.600'
          mb={1}
          fontStyle='italic'
        >
          Please login to start
        </Typography>
      )}

      <Button
        variant={isLoggedIn ? 'contained' : 'outlined'}
        color='info'
        disableElevation
        fullWidth
        disabled={!isLoggedIn}
        startIcon={<DownloadRoundedIcon fontSize='small' />}
      >
        Start and download
      </Button>
    </Paper>
  );
}

export default ChallengeStart;
