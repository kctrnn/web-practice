import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const NotFound = () => {
  return (
    <Box
      minHeight='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Stack direction='row' alignItems='center'>
        <Typography
          variant='h5'
          component='h1'
          sx={{
            p: '.5rem 1.5rem .5rem 0',
            mr: '1.5rem',
            fontWeight: 500,
            borderRight: '1px solid rgba(0, 0, 0,.3)',
          }}
        >
          404
        </Typography>

        <Typography>This page could not be found.</Typography>
      </Stack>
    </Box>
  );
};
