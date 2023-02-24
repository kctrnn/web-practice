import { Chip, Divider, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Carousel } from 'components/Common';
import { Images } from 'constants/index';
import { Link } from 'react-router-dom';

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
  color: theme.palette.grey[800],

  marginTop: '1rem',
  marginBottom: '.5rem',
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.grey[600],
  fontFamily: `'Lato', sans-serif`,
  lineHeight: 1.5,
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
        <Box mb={2}>
          <Divider sx={{ borderColor: '#EAEEF3' }}>
            <Chip label="Challenge Paths" variant="outlined" color="primary" />
          </Divider>
        </Box>

        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
          <PathItem to="/paths/responsive-web-developer">
            <img src={Images.RESPONSIVE_PATH} alt="" />
            <Heading>Responsive Web Developer</Heading>
            <Description>
              Learn and Practice Responsive Web Development by building 8
              Websites with given designs
            </Description>
          </PathItem>

          <PathItem to="/paths/front-end-developer">
            <img src={Images.FRONTEND_PATH} alt="" />
            <Heading>Front-end Developer</Heading>
            <Description>
              Become Front-end Developer by building 8 real-life projects, you
              can use any Front-end frameworks
            </Description>
          </PathItem>

          <PathItem to="/paths/full-stack-developer">
            <img src={Images.FULLSTACK_PATH} alt="" />
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
