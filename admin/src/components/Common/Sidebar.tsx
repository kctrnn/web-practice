import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard } from '@material-ui/icons';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import GroupIcon from '@material-ui/icons/Group';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 1),
  },

  link: {
    color: 'inherit',
    textDecoration: 'none',

    '& > div': {
      marginBottom: '.5rem',
      borderRadius: '.5rem',
    },

    '&.active > div': {
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

export const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
        <NavLink to="/admin/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>

            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/challenges" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <BlurLinearIcon />
            </ListItemIcon>

            <ListItemText primary="Challenge" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/solutions" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>

            <ListItemText primary="Solution" />
          </ListItem>
        </NavLink>

        <NavLink to="/admin/users" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>

            <ListItemText primary="User" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};
