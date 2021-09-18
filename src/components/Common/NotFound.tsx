import { Alert, Stack, Typography } from '@mui/material';

export const NotFound = () => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      spacing={4}
    >
      <Typography component='h1' variant='h3'>
        OOOPS...
      </Typography>

      <Alert severity='warning'>
        The page you are looking for does not exist or has been removed.
      </Alert>
    </Stack>
  );
};
