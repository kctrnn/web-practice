import { Link } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/auth/authSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},

  menuButton: {
    marginRight: theme.spacing(1),
  },

  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },

  link: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: '.875rem',
    marginRight: '2rem',
  },
}));

export const Header = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <BlurLinearIcon />
          </IconButton>

          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push('/')}
          >
            Web Practice Admin
          </Typography>

          <Link
            href="https://webpractice-c1se21.vercel.app"
            target="_blank"
            rel="noreferrer"
            className={classes.link}
            underline="none"
          >
            Go to Web Practice
          </Link>

          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
