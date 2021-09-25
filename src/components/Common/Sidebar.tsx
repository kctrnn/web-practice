import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <nav>
      <List>
        <Link to=''>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>

              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to='/dashboard'>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>

              <ListItemText primary='Dashboard' />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </nav>
  );
};
