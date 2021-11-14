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

export interface ChallengeSuccessProps {
  onClose: () => void;
}

function ChallengeSuccess({ onClose }: ChallengeSuccessProps) {
  return (
    <Box textAlign="center">
      <Image>
        <img src={Images.SUCCESS_IMG} alt=""></img>
      </Image>

      <Typography
        sx={{ fontWeight: 500, color: 'success.dark', fontSize: '1.125rem' }}
      >
        Successfully started
      </Typography>

      <Typography sx={{ mt: 2, mb: 4 }}>
        You can click the button below for 7 steps to get started
      </Typography>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button
          variant="contained"
          color="inherit"
          disableElevation
          onClick={onClose}
        >
          Got it
        </Button>

        <Link to="/seven-step">
          <Button variant="contained" color="warning" disableElevation>
            7 step to start
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default ChallengeSuccess;
