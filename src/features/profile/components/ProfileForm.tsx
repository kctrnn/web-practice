import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { InputField } from 'components/FormFields';
import { User } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Missing name'),
  email: yup.string().required('Missing your email'),
  username: yup.string().required('Missing your username'),

  avatarUrl: yup.string().required('Missing your avatarUrl'),
  bio: yup.string(),
});

const Form = styled('form')(({ theme }) => ({
  border: '1px solid #E0E0E0',
  borderRadius: '12px',
  padding: theme.spacing(3, 6),
  marginTop: theme.spacing(3),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textTransform: 'none',
}));

export interface ProfileFormProps {
  initialValues: User;
  onSubmit?: (user: User) => void;
}

const ProfileForm = ({ onSubmit, initialValues }: ProfileFormProps) => {
  const form = useForm<User>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleSubmitForm = (values: User) => {
    if (!onSubmit) return;
    onSubmit(values);
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitForm)}>
      <Typography component="h2" variant="h6" color="textPrimary" mb={4}>
        Change Info
      </Typography>

      <Avatar
        variant="rounded"
        src={initialValues.avatarUrl}
        alt=""
        sx={{ width: '4rem', height: '4rem' }}
      />

      <Box sx={{ maxWidth: { xs: '90%', md: '70%', lg: '50%' } }}>
        <InputField
          name="name"
          control={control}
          label="Name"
          placeholder="Enter your name..."
        />

        <InputField
          name="username"
          control={control}
          label="Username"
          placeholder="Enter your username..."
        />

        <InputField
          name="bio"
          control={control}
          label="Bio"
          placeholder="Enter your bio..."
          rows={2}
        />

        <InputField
          name="email"
          control={control}
          label="Email"
          placeholder="Enter your email..."
          type="email"
        />

        <ButtonStyled
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          disabled={isSubmitting}
        >
          Save
        </ButtonStyled>
      </Box>
    </Form>
  );
};

export default ProfileForm;
