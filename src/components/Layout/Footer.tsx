import GitHubIcon from '@mui/icons-material/GitHub';
import { Link, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

const Container = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '.25rem 2rem',
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  color: '#777',
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color 200ms ease-in-out',

  '&:hover': {
    color: '#555',
  },
}));

export const Footer = () => {
  return (
    <Container>
      <Box>
        <Typography component='span' mr={4} color='#777' fontSize='0.875rem'>
          © 2021 web practice
        </Typography>

        <LinkStyled
          href='https://github.com/C1SE-21/web-practice'
          target='_blank'
        >
          about us
        </LinkStyled>
      </Box>

      <Box>
        <LinkStyled
          href='https://github.com/C1SE-21/web-practice'
          target='_blank'
        >
          <GitHubIcon />
        </LinkStyled>
      </Box>
    </Container>
  );
};
