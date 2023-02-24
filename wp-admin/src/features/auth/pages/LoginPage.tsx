import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { useHistory } from 'react-router-dom';
import { login, LoginPayload } from '../authSlice';
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  paper: {
    maxWidth: '500px',
    padding: theme.spacing(6),
    borderRadius: '8px',

    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const history = useHistory();

  // redirect to admin page if is logged in
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (isLoggedIn) {
    history.push('/admin/dashboard');
  }

  const handleLoginFormSubmit = (formValues: LoginPayload) => {
    const action = login(formValues);
    dispatch(action);
  };

  const initialValues: LoginPayload = {
    password: '',
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box textAlign="center" mb={4}>
          <Typography component="h1" variant="h5" color="primary" gutterBottom>
            Web Practice Admin 🤕
          </Typography>
        </Box>

        <LoginForm
          onSubmit={handleLoginFormSubmit}
          initialValues={initialValues}
        />
      </Paper>
    </div>
  );
}

export default LoginPage;
