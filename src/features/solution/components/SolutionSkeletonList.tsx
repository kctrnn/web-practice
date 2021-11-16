import { Grid, Skeleton, Stack } from '@mui/material';

function SolutionSkeletonList({ length }: { length: number }) {
  return (
    <Grid container spacing={4}>
      {Array.from(new Array(length)).map((x, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
          <Skeleton width="60%" />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            sx={{ my: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={120}
            sx={{ mb: 1 }}
          />

          <Stack direction="row" spacing={2}>
            <Skeleton variant="rectangular" width="100%" height={30} />
            <Skeleton variant="rectangular" width="100%" height={30} />
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

export default SolutionSkeletonList;
