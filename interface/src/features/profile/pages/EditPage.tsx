import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, LinearProgress } from '@mui/material';
import userApi from 'api/userApi';
import { User } from 'models';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileForm from '../components/ProfileForm';

function EditPage() {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<User>();

  useEffect(() => {
    (async () => {
      const user = await userApi.get(userId);
      setProfile(user);
    })();
  }, [userId]);

  const handleSubmit = async (data: User) => {
    if (!data._id) return;

    try {
      await userApi.update(data._id, data);

      history.push('/profile');
      toast.success('Update profile successfully');
    } catch (error) {
      toast.error('Failed to update user info');
    }
  };

  return (
    <Box maxWidth="50rem" margin="0 auto">
      <Link to="/profile">
        <Box
          display="flex"
          alignItems="center"
          color="#2D9CDB"
          fontSize=".875rem"
        >
          <ArrowBackIosIcon fontSize="small" />
          Back
        </Box>
      </Link>

      {!profile && <LinearProgress sx={{ mt: 4 }} />}
      {profile && (
        <ProfileForm initialValues={profile} onSubmit={handleSubmit} />
      )}
    </Box>
  );
}

export default EditPage;
