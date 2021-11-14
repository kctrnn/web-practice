import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Images } from 'constants/index';
import { Link } from 'react-router-dom';

const Image = styled(Box)(({ theme }) => ({
  width: 100,
  margin: '0 auto',
  marginBottom: theme.spacing(4),

  '& > img': {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
}));

function ChallengeError() {
  return (
    <Box textAlign="center">
      <Image>
        <img src={Images.ERROR_IMG} alt=""></img>
      </Image>

      <Typography
        sx={{ fontWeight: 500, color: 'warning.dark', fontSize: '1.125rem' }}
      >
        You don't have enough reputations!
      </Typography>

      <Typography sx={{ mt: 2, mb: 4 }}>
        You can only start 5 challenges at the same time
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Link to="/">
          <Button variant="contained" disableElevation>
            Homepage
          </Button>
        </Link>

        <Link to="/dashboard">
          <Button variant="contained" color="warning" disableElevation>
            Dashboard
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default ChallengeError;
