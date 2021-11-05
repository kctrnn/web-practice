import { AccountCircle } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { TOKEN } from 'constants/index';
import { logout, selectCurrentUser } from 'features/auth/authSlice';
import { User } from 'models';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const isLoggedIn = Boolean(localStorage.getItem(TOKEN));
  const currentUser = useAppSelector(selectCurrentUser) as User;
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  const Logo = styled(Link)(({ theme }) => ({
    fontSize: '1.2rem',
    fontWeight: 700,
    fontFamily: `'Raleway', sans-serif`,
    color: theme.palette.text.primary,
  }));

  const ButtonText = styled(Typography)(() => ({
    fontSize: '0.875rem',
  }));

  const StyledMenu = styled(Menu)(({ theme }) => ({
    '.MuiMenu-paper': {
      border: '1px solid #d3d4d5',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      borderRadius: '12px',
      padding: theme.spacing(0, 1),
      marginTop: '1rem',
    },
  }));

  const StyledMenuItem = styled(MenuItem)(() => ({
    borderRadius: '8px',
    marginBottom: '.5rem',
    padding: '.5rem .75rem',

    '&:last-child': {
      color: '#EB5757',
    },
  }));

  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
  }));

  const StyledListItemText = styled(ListItemText)(() => ({
    '& > span': {
      fontSize: '.875rem',
    },
  }));

  return (
    <>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Logo to="/">Web Practice</Logo>

          {!isLoggedIn && (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                pr: {
                  sm: 1,
                  md: 3,
                  lg: 5,
                },
              }}
            >
              <Link to="/login">
                <Button>
                  <ButtonText>Sign in</ButtonText>
                </Button>
              </Link>

              <Link to="/register">
                <Button variant="contained" disableElevation>
                  <ButtonText>Sign up</ButtonText>
                </Button>
              </Link>
            </Stack>
          )}

          {isLoggedIn && (
            <Button
              variant="outlined"
              disableElevation
              onClick={handleOpenMenu}
              color="inherit"
              sx={{
                borderColor: '#EAEEF3',
                mr: {
                  sm: 1,
                  md: 3,
                  lg: 5,
                },
              }}
            >
              <StyledAvatar
                variant="rounded"
                src={currentUser?.avatarUrl}
                alt=""
              />

              <Typography
                component="h4"
                sx={{
                  fontSize: '.875rem',
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  mx: '.5rem',
                  userSelect: 'none',
                }}
              >
                {currentUser?.name}
              </Typography>

              {Boolean(anchorEl) ? (
                <KeyboardArrowUpRoundedIcon />
              ) : (
                <KeyboardArrowDownRoundedIcon />
              )}
            </Button>
          )}

          <StyledMenu
            keepMounted
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>

              <StyledListItemText primary="My Dashboard" />
            </StyledMenuItem>

            <StyledMenuItem>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>

              <StyledListItemText primary="My Portfolio" />
            </StyledMenuItem>

            <StyledMenuItem>
              <ListItemIcon>
                <SettingsRoundedIcon fontSize="small" />
              </ListItemIcon>

              <StyledListItemText primary="Setting" />
            </StyledMenuItem>

            <Divider />

            <StyledMenuItem onClick={handleLogoutClick}>
              <ListItemIcon sx={{ color: '#EB5757' }}>
                <ExitToAppRoundedIcon fontSize="small" color="inherit" />
              </ListItemIcon>

              <StyledListItemText primary="Logout" />
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </AppBar>
    </>
  );
};
