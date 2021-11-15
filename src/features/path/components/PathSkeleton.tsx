import { Grid, Skeleton } from '@mui/material';

function PathSkeleton({ length }: { length: number }) {
  return (
    <Grid container spacing={4}>
      {Array.from(new Array(length)).map((_, idx) => (
        <Grid item xs={12} md={6} lg={4} key={idx}>
          <Skeleton variant="rectangular" height={200} width="100%" />
          <Skeleton width="50%" />
          <Skeleton />
          <Skeleton />
        </Grid>
      ))}
    </Grid>
  );
}

export default PathSkeleton;
