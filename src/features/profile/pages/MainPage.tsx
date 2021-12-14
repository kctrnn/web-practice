import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import ProfileInfo from '../components/ProfileInfo';

function MainPage() {
  const profile = useAppSelector(selectCurrentUser);

  return (
    <Box>
      <Box textAlign="center" my={3}>
        <Typography component="h1" variant="h4">
          Personal info
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Basic info, like your name and photo
        </Typography>
      </Box>

      <ProfileInfo profile={profile} />
    </Box>
  );
}

export default MainPage;
