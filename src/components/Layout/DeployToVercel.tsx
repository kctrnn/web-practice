import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Image1 from 'assets/images/213.png';
import Image2 from 'assets/images/214.png';

const List = styled('ul')(({ theme }) => ({
  marginTop: '1rem',
  paddingLeft: '2rem',

  li: {
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.875rem',
    },

    b: { fontWeight: 600 },
  },
}));

const Image = styled(Box)(({ theme }) => ({
  marginTop: '1rem',

  img: {
    width: '80%',
    objectFit: 'cover',
  },
}));

export function DeployToVercel() {
  return (
    <Box p={4}>
      <Typography
        variant="h5"
        sx={{ span: { color: '#f7542e' }, fontWeight: 600, mb: 2 }}
      >
        Deploy to <span>Vercel</span>
      </Typography>

      <Divider />

      <Box mt={4}>
        <Typography variant="h6">1. Create a Vercel account</Typography>
        <List>
          <li>
            Visit{' '}
            <a
              href="https://vercel.com/signup"
              target="_blank"
              rel="noreferrer"
            >
              https://vercel.com/signup
            </a>
          </li>
          <li>
            Click <b>Continue with Github</b> button
          </li>
          <li>Follow the steps to create your account</li>
        </List>

        <Image>
          <img src={Image2} alt="" />
        </Image>

        <Typography variant="h6" mt={6}>
          2. Import project from Github
        </Typography>
        <Image>
          <img src={Image1} alt="" />
        </Image>

        <Typography variant="h6" mt={6}>
          3. Check auto deployment
        </Typography>
        <List>
          <li>Make some changes to your local</li>
          <li>Push to github</li>
          <li>Checkout your vercel to see if there is a new deployment</li>
        </List>

        <Typography>Enjoy! 🎉</Typography>
      </Box>
    </Box>
  );
}
