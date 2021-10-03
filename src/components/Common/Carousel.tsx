import { Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { CAROUSEL_LIST } from 'constants/index';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const Item = styled(Box)(() => ({
  height: '12rem',
  borderRadius: '.5rem',
}));

const Image = styled(Box)(() => ({
  flexBasis: '40%',

  '& > img': {
    height: '100%',
    width: '100%',
    objectFit: 'cover',

    borderTopRightRadius: '.5rem',
    borderBottomRightRadius: '.5rem',
  },
}));

const Content = styled(Box)(() => ({
  padding: '2rem 1.5rem',
  flex: 1,

  borderTopLeftRadius: '.5rem',
  borderBottomLeftRadius: '.5rem',
  border: '1px solid #c9d0da',

  '& > h3': {
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },

  '& > p': {
    color: '#555',
    maxWidth: '65%',
    fontSize: '.875rem',
    lineHeight: 1.6,
  },
}));

export const Carousel = () => {
  const settings = {
    dots: true,
    speed: 1000,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {CAROUSEL_LIST.map((item, index) => (
        <Item key={index}>
          <Stack
            direction='row'
            maxHeight='100%'
            justifyContent='space-between'
          >
            <Content>
              <Typography variant='h6' component='h3'>
                {item.heading}
              </Typography>
              <Typography>{item.description}</Typography>
            </Content>

            <Image>
              <img src={item.imgUrl} alt='' />
            </Image>
          </Stack>
        </Item>
      ))}
    </Slider>
  );
};
