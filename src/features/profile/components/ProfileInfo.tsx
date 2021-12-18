import { LoadingButton } from '@mui/lab';
import { Avatar, Button, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import axiosClient from 'api/axiosClient';
import userApi from 'api/userApi';
import { useAppDispatch } from 'app/hooks';
import { USER } from 'constants/index';
import { loginSuccess } from 'features/auth/authSlice';
import { User } from 'models';
import { ChangeEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: '52rem',
  border: '1px solid #E0E0E0',
  margin: '0 auto',
  borderRadius: '12px',
}));

const Name = styled(Typography)(({ theme }) => ({
  width: '30%',
  textTransform: 'uppercase',
  color: '#BDBDBD',
  fontSize: '0.8125rem',
}));

const Content = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2.5, 0),
}));

const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #E0E0E0',
  padding: theme.spacing(0, 6),

  '&:last-child': {
    borderBottom: 0,
  },
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(9),
  height: theme.spacing(9),
  margin: theme.spacing(1.5, 0),
}));

export interface ProfileInfoProps {
  profile: User;
}

function ProfileInfo({ profile }: ProfileInfoProps) {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [profileAvatar, setProfileAvatar] = useState(profile.avatarUrl);
  const [loading, setLoading] = useState(false);

  const handleInputFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;

      const imageFile = e.target.files[0];
      const formData = new FormData();
      formData.append('image', imageFile);

      const apiUrl = 'https://api-kctrnn.herokuapp.com/upload';
      setLoading(true);
      const { url: avatarUrl }: any = await axiosClient.post(apiUrl, formData);

      setProfileAvatar(avatarUrl);
      const newProfile: User = { ...profile, avatarUrl };

      if (newProfile._id) {
        await userApi.update(newProfile._id, newProfile);
        localStorage.setItem(USER, JSON.stringify(newProfile));
        dispatch(loginSuccess(newProfile));
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleInputFileClick = () => {
    inputRef.current && inputRef.current.click();
  };

  return (
    <Wrapper>
      <Item justifyContent="space-between">
        <Box py={3}>
          <Typography component="h2" variant="h5">
            Profile
          </Typography>

          <Typography variant="subtitle1" color="textSecondary">
            Some info may be visible to other people
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          component={Link}
          to={`/profile/${profile._id}`}
        >
          Edit
        </Button>
      </Item>

      <Item>
        <Name variant="body1">Photo</Name>
        <AvatarStyled
          variant="rounded"
          src={profileAvatar}
          alt=""
          sx={{ mr: 4 }}
        />

        <input
          type="file"
          ref={inputRef}
          onChange={handleInputFileChange}
          hidden
        />

        <LoadingButton
          size="small"
          variant="outlined"
          loading={loading}
          onClick={handleInputFileClick}
        >
          Change
        </LoadingButton>
      </Item>

      <Item>
        <Name variant="body1">Name</Name>
        <Content variant="body1">{profile.name}</Content>
      </Item>

      <Item>
        <Name variant="body1">Bio</Name>
        <Content variant="body1">{profile.bio}</Content>
      </Item>

      <Item>
        <Name variant="body1">Username</Name>
        <Content variant="body1">{profile.username}</Content>
      </Item>

      <Item>
        <Name variant="body1">Email</Name>
        <Content variant="body1">{profile.email}</Content>
      </Item>

      {/* <Item>
        <Name variant="body1">Password</Name>
        <Content variant="body1">**********</Content>
      </Item> */}
    </Wrapper>
  );
}

export default ProfileInfo;
