import { Grid, Skeleton } from '@mui/material';

function DashboardSkeleton() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ mb: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ mb: 1 }}
        />
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ mb: 1 }}
        />
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Grid>
    </Grid>
  );
}

export default DashboardSkeleton;
