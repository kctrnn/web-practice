import { LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { User } from 'models';
import { useEffect, useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';

function MainPage() {
  const { _id: userId } = useAppSelector(selectCurrentUser);
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const user = await userApi.get(userId);
      setProfile(user);
    })();
  }, [userId]);

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

      {!profile && <LinearProgress sx={{ mt: 4 }} />}
      {profile && <ProfileInfo profile={profile} />}
    </Box>
  );
}

export default MainPage;
