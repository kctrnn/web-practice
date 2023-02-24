import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const LinkStyled = styled(NavLink)(({ theme }) => ({
  color: '#777',
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color 200ms ease-in-out',

  '&:hover, &.active': {
    color: '#333',
  },
}));

export const Footer = () => {
  return (
    <Box sx={{ padding: '.5rem 2rem' }}>
      <Typography component="span" mr={4} color="#777" fontSize="0.875rem">
        © 2021 web practice
      </Typography>

      <LinkStyled to="/about-us">about us</LinkStyled>
    </Box>
  );
};
