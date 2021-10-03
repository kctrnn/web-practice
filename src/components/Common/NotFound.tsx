import { Alert, Stack, Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      spacing={4}
    >
      <Alert severity='error'>
        <Typography component='h1' variant='h3'>
          404 NOT FOUND
        </Typography>
      </Alert>

      <Typography>
        The page you are looking for does not exist or has been removed.
      </Typography>
    </Stack>
  );
};
