import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import HomeMaxIcon from '@mui/icons-material/HomeMax';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, styled } from '@mui/system';
import challengeApi from 'api/challengeApi';
import { PathSlug } from 'models';
import { useEffect, useState } from 'react';
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

  [theme.breakpoints.down('md')]: {
    height: '2rem',
  },

  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const PathName = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },

  p: {
    fontSize: '.75rem',
  },
}));

export interface SidebarState {
  pathSlug: PathSlug;
  challengeId: string;
}

export const Sidebar = () => {
  const { pathSlug: pathSlugParam, challengeId } = useParams<SidebarState>();
  const isPathMode = Boolean(pathSlugParam || challengeId);

  const [pathSlug, setPathSlug] = useState<PathSlug>(pathSlugParam);

  useEffect(() => {
    if (!challengeId) return;

    (async () => {
      try {
        const { pathSlug } = await challengeApi.get(challengeId);
        setPathSlug(pathSlug);
      } catch (error) {
        console.log('Fetch challenge failed', error);
      }
    })();
  }, [challengeId]);

  return (
    <Box px={2} pt={1}>
      <List>
        <LinkStyled exact to="/">
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                {isPathMode ? <KeyboardBackspaceIcon /> : <HomeMaxIcon />}
              </ListItemIconStyled>

              <ListItemTextStyled primary="Home" disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        {isPathMode && (
          <LinkStyled to={`/paths/${pathSlugParam || pathSlug}`}>
            <Box py={1}>
              <Image>
                <img
                  src={getPathImage(pathSlugParam || pathSlug)}
                  alt={pathSlugParam || pathSlug}
                />
              </Image>

              <PathName>
                <Typography fontWeight={500}>Path</Typography>
                <Typography color="grey.500">
                  {getPathName(pathSlugParam || pathSlug)}
                </Typography>
              </PathName>
            </Box>
          </LinkStyled>
        )}

        {isPathMode && (
          <LinkStyled to={`/paths/${pathSlugParam || pathSlug}`}>
            <ListItem disableGutters>
              <ListItemButton sx={{ borderRadius: '.5rem' }}>
                <ListItemIconStyled>
                  <TagRoundedIcon />
                </ListItemIconStyled>

                <ListItemTextStyled primary="Overview" disableTypography />
              </ListItemButton>
            </ListItem>
          </LinkStyled>
        )}

        {/* {!isPathMode && (
          <LinkStyled to="/dashboard">
            <ListItem disableGutters>
              <ListItemButton sx={{ borderRadius: '.5rem' }}>
                <ListItemIconStyled>
                  <DashboardIcon />
                </ListItemIconStyled>

                <ListItemTextStyled primary="Dashboard" disableTypography />
              </ListItemButton>
            </ListItem>
          </LinkStyled>
        )} */}
        <LinkStyled to="/dashboard">
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                <DashboardIcon />
              </ListItemIconStyled>

              <ListItemTextStyled primary="Dashboard" disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        <LinkStyled to="/solutions">
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                <EmojiObjectsRoundedIcon />
              </ListItemIconStyled>

              <ListItemTextStyled primary="Solutions" disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>

        <LinkStyled to="/forum">
          <ListItem disableGutters>
            <ListItemButton sx={{ borderRadius: '.5rem' }}>
              <ListItemIconStyled>
                <ForumRoundedIcon />
              </ListItemIconStyled>

              <ListItemTextStyled primary="Forum" disableTypography />
            </ListItemButton>
          </ListItem>
        </LinkStyled>
      </List>
    </Box>
  );
};
