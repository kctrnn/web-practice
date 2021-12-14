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
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const isLoggedIn = Boolean(localStorage.getItem(TOKEN));
  const currentUser = useAppSelector(selectCurrentUser);
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

    // backgroundColor: theme.palette.primary.main,
  }));

  const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize: '.75rem',
    fontWeight: 500,
    fontFamily: `'Raleway', sans-serif`,
    color: theme.palette.text.secondary,
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

  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: '8px',
    marginBottom: '.5rem',
    padding: '.5rem .75rem',
    color: theme.palette.text.primary,
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

  const Name = styled(Typography)(() => ({
    fontSize: '.75rem',
    textTransform: 'capitalize',
    fontWeight: 600,
    margin: '0 .5rem',
    userSelect: 'none',
  }));

  return (
    <>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack>
            <Logo to="/">Web Practice</Logo>
            <SubTitle>Learning by doing</SubTitle>
          </Stack>

          {!isLoggedIn && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ pr: { sm: 1, md: 3, lg: 5 } }}
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
              color="inherit"
              size="small"
              disableElevation
              sx={{ borderColor: '#EAEEF3', mr: { sm: 1, md: 3, lg: 5 } }}
              onClick={handleOpenMenu}
            >
              <StyledAvatar
                variant="rounded"
                src={currentUser?.avatarUrl}
                alt=""
              />

              <Name>{currentUser?.name}</Name>

              {Boolean(anchorEl) ? (
                <KeyboardArrowUpRoundedIcon />
              ) : (
                <KeyboardArrowDownRoundedIcon />
              )}
            </Button>
          )}
        </Toolbar>
      </AppBar>

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
        <Link to="/dashboard">
          <StyledMenuItem>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>

            <StyledListItemText primary="My Dashboard" />
          </StyledMenuItem>
        </Link>

        <Link to="/profile">
          <StyledMenuItem>
            <ListItemIcon>
              <SettingsRoundedIcon fontSize="small" />
            </ListItemIcon>

            <StyledListItemText primary="Setting" />
          </StyledMenuItem>
        </Link>

        <Divider />

        <StyledMenuItem onClick={handleLogoutClick} sx={{ color: '#EB5757' }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <ExitToAppRoundedIcon fontSize="small" />
          </ListItemIcon>

          <StyledListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
};
