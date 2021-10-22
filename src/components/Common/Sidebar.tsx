import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import DashboardIcon from '@mui/icons-material/Dashboard';
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

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 0,
  },
}));

export const Sidebar = () => {
  return (
    <Box px={2} pt={1}>
      <List>
        <LinkStyled exact to='/'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                <HomeMaxIcon />
              </ListItemIconStyled>

              <ListItemTextStyled primary='Home' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        <LinkStyled to='/dashboard'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                <DashboardIcon />
              </ListItemIconStyled>

              <ListItemTextStyled primary='Dashboard' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        <LinkStyled to='/solutions'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                <AspectRatioIcon />
              </ListItemIconStyled>

              <ListItemTextStyled primary='Solutions' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        <LinkStyled to='/faq'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                <LiveHelpIcon />
              </ListItemIconStyled>

              <ListItemTextStyled primary='FAQ' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>
      </List>
    </Box>
  );
};
