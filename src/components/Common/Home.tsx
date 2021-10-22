import { Chip, Divider, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { Carousel } from './index';

const Container = styled(Box)(() => ({
  height: '100%',
  // paddingRight: '1rem',
}));

const PathBox = styled(Box)(({ theme }) => ({
  paddingTop: '2rem',

  [theme.breakpoints.down('sm')]: {
    paddingTop: 0,
  },
}));

const PathItem = styled(Link)(({ theme }) => ({
  display: 'block',
  width: 'calc(100% / 3 - 1rem)',
  padding: '1rem',

  borderRadius: '.5rem',
  border: '1px solid #EAEEF3',

  cursor: 'pointer',
  transition: 'all 200ms ease-in-out',

  [theme.breakpoints.down('lg')]: {
    width: 'calc(50% - 1rem)',
    marginBottom: theme.spacing(4),
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },

  '&:hover': {
    transform: 'translateY(-0.25rem)',
    border: '1px solid #c9d0da',
  },

  '& > img': {
    height: '10rem',
    width: '100%',
    borderRadius: 'inherit',
    objectFit: 'cover',
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: theme.palette.text.primary,

  marginTop: '1rem',
  marginBottom: '.5rem',
}));

const Description = styled(Typography)(() => ({
  fontSize: '.875rem',
  color: '#555',
}));

const CarouselBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const Home = () => {
  return (
    <Container>
      {/* Carousel */}
      <CarouselBox>
        <Carousel />
      </CarouselBox>

      {/* Challenge paths */}
      <PathBox>
        <Typography variant='h6' component='h2' mb={2}></Typography>

        <Box mb={2}>
          <Divider>
            <Chip label='Challenge Paths' variant='outlined' color='primary' />
          </Divider>
        </Box>

        <Stack direction='row' justifyContent='space-between' flexWrap='wrap'>
          <PathItem to='/paths/responsive-web-developer'>
            <img
              src='https://images.unsplash.com/photo-1615455057735-1d108a411194?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
              alt=''
            />
            <Heading>Responsive Web Developer</Heading>
            <Description>
              Learn and Practice Responsive Web Development by building 8
              Websites with given designs
            </Description>
          </PathItem>

          <PathItem to='/paths/front-end-developer'>
            <img
              src='https://images.unsplash.com/photo-1633230329829-a52df5940e69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
              alt=''
            />
            <Heading>Front-end Developer</Heading>
            <Description>
              Become Front-end Developer by building 8 real-life projects, you
              can use any Front-end frameworks
            </Description>
          </PathItem>

          <PathItem to='/paths/full-stack-developer'>
            <img
              src='https://images.unsplash.com/photo-1633204412021-21bb58ad6180?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
              alt=''
            />
            <Heading>Full-stack Developer</Heading>
            <Description>
              Become a Full-stack developer by building 8 advanced full-stack
              web applications
            </Description>
          </PathItem>
        </Stack>
      </PathBox>
    </Container>
  );
};
