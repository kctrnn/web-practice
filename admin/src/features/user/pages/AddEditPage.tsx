import { Box, Chip, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import userApi from 'api/userApi';
import { User } from 'models';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserForm from '../components/UserForm';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
  },

  titleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  back: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(4),

    textDecoration: 'none',
    color: theme.palette.primary.dark,
  },

  form: {
    marginTop: theme.spacing(2),
    maxWidth: '500px',
  },

  userId: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),

    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

function AddEditPage() {
  const classes = useStyles();
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();

  const isEdit = Boolean(userId);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const response = await userApi.get(userId);
        setUser(response);
      } catch (error) {
        console.log('Failed to fetch user detail', error);
      }
    })();
  }, [userId]);

  const initialValues: User = {
    name: '',
    description: '',
    level: '0',
    pathSlug: '',
    ...user,
  } as User;

  const handleUserFormSubmit = async (formValues: User) => {
    if (isEdit) {
      await userApi.update(user?.id || '', formValues);
    } else {
      const data: User = {
        ...formValues,
        avatarUrl: '',
      };
      await userApi.add(data);
    }

    // Show toast success
    toast.success('🚀 Save user successfully');

    // Redirect to user main page
    history.push('/admin/users');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titleBox}>
        <Typography variant="h5">
          {isEdit ? 'User details' : 'Add new user'}
        </Typography>

        <Typography
          variant="subtitle2"
          component={Link}
          to="/admin/users"
          className={classes.back}
        >
          <ChevronLeft /> Back to user list
        </Typography>
      </Box>

      {user && (
        <Box className={classes.userId}>
          <Chip label="User ID" size="small" />
          <Typography variant="body2">{user.id}</Typography>
        </Box>
      )}

      {(user || !isEdit) && (
        <Box className={classes.form}>
          <UserForm
            initialValues={initialValues}
            onSubmit={handleUserFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}

export default AddEditPage;
