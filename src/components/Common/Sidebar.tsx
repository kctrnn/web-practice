import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, styled } from '@mui/system';
import { PathSlug } from 'models';
import { NavLink, useParams } from 'react-router-dom';
import { getPathImage, getPathName } from 'utils';

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

const Image = styled(Box)(({ theme }) => ({
  borderRadius: '.5rem',
  overflow: 'hidden',

  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export const Sidebar = () => {
  const { pathSlug } = useParams<{ pathSlug: PathSlug }>();
  const isPathMode = Boolean(pathSlug);

  return (
    <Box px={2} pt={1}>
      <List>
        <LinkStyled exact to='/'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                {isPathMode ? <KeyboardBackspaceIcon /> : <HomeMaxIcon />}
              </ListItemIconStyled>

              <ListItemTextStyled primary='Home' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        {isPathMode && (
          <LinkStyled to={`/paths/${pathSlug}`}>
            <Box py={1}>
              <Image>
                <img src={getPathImage(pathSlug)} alt={pathSlug} />
              </Image>

              <Box py={1} px={2}>
                <Typography variant='subtitle2'>Path</Typography>
                <Typography variant='body2' color='grey.500'>
                  {getPathName(pathSlug)}
                </Typography>
              </Box>
            </Box>
          </LinkStyled>
        )}

        {isPathMode && (
          <LinkStyled to={`/paths/${pathSlug}`}>
            <ListItem disableGutters>
              <ListItemButton sx={{ borderRadius: '.5rem' }}>
                <ListItemIconStyled>
                  <LocalOfferIcon />
                </ListItemIconStyled>

                <ListItemTextStyled primary='Overview' disableTypography />
              </ListItemButton>
            </ListItem>
          </LinkStyled>
        )}

        {!isPathMode && (
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
        )}

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

        <LinkStyled to='/forum'>
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                <LiveHelpIcon />
              </ListItemIconStyled>

              <ListItemTextStyled primary='Forum' disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>
      </List>
    </Box>
  );
};
