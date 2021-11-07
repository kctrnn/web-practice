import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import ProjectItem from './components/ProjectItem';
import {
  fetchDashboardData,
  selectDashboardLoading,
  selectOnGoingProjectList,
} from './dashboardSlice';

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(2),

  '& > svg': {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
}));

function Dashboard() {
  const dispatch = useAppDispatch();
  const onGoingProjectList = useAppSelector(selectOnGoingProjectList);
  const loading = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <Box>
      <Typography component="h1" variant="h5" fontWeight={500} mb={4}>
        Dashboard
      </Typography>

      {loading && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Skeleton variant="text" width="50%" sx={{ mb: 2 }} />
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
            <Skeleton variant="text" width="50%" sx={{ mb: 2 }} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={50}
              sx={{ mb: 1 }}
            />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Skeleton variant="text" width="50%" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={100} />
          </Grid>
        </Grid>
      )}

      {!loading && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Heading>
                <HourglassEmptyRoundedIcon fontSize="small" /> Ongoing
                challenges
              </Heading>

              <List>
                {onGoingProjectList.map((project) => (
                  <ListItem disableGutters key={project._id}>
                    <ListItemButton>
                      <ProjectItem
                        imgUrl={project.thumbnailImage}
                        title={project.name}
                        time="3 mons ago"
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Heading>
                <DoneRoundedIcon fontSize="small" /> Completed challenges
              </Heading>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Heading>
                <ShowChartRoundedIcon fontSize="small" /> Statistics
              </Heading>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;
