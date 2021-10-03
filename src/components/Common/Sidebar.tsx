import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import DraftsIcon from '@mui/icons-material/Drafts';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const LinkStyled = styled(NavLink)(({ theme }) => ({
  fontSize: '0.875rem',
  color: '#777',

  '&.active': {
    color: '#333',
    fontWeight: 600,
  },

  '&.active > li > div': {
    backgroundColor: theme.palette.action.selected,
  },

  '&.active svg': {
    color: '#333',
  },
}));

export const Sidebar = () => {
  return (
    <Box px={2} pt={1}>
      <List>
        <LinkStyled exact to='/'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIcon>
                <HomeMaxIcon />
              </ListItemIcon>

              <ListItemText primary='Home' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        <LinkStyled to='/dashboard'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>

              <ListItemText primary='Dashboard' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        <LinkStyled to='/solutions'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIcon>
                <AspectRatioIcon />
              </ListItemIcon>

              <ListItemText primary='Solutions' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        <LinkStyled to='/faq'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>

              <ListItemText primary='FAQ' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>
      </List>
    </Box>
  );
};
