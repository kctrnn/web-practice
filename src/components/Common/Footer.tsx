import GitHubIcon from '@mui/icons-material/GitHub';
import { Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <Grid container justifyContent='space-between' px={4} py={0.5}>
      <Grid item>
        <Stack direction='row' spacing={4}>
          <Link to='/'>© 2021 webpractice</Link>
          <Link to='/'>about us</Link>
        </Stack>
      </Grid>

      <Grid item textAlign='right'>
        <Link to='/'>
          <GitHubIcon />
        </Link>
      </Grid>
    </Grid>
  );
};
