import GitHubIcon from '@mui/icons-material/GitHub';
import { Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
      px={4}
      py={1}
    >
      <Grid item>
        <Stack direction='row' alignItems='center' spacing={4}>
          <Typography component='span' color='grey'>
            © 2021 webpractice
          </Typography>

          <Link to='/'>
            <Typography
              component='span'
              sx={{
                color: 'grey',
                ':hover': { color: 'GrayText' },
              }}
            >
              about us
            </Typography>
          </Link>
        </Stack>
      </Grid>

      <Grid item textAlign='right'>
        <Link to='/'>
          <Typography
            component='span'
            sx={{
              color: 'grey',
              ':hover': { color: 'GrayText' },
            }}
          >
            <GitHubIcon />
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};
