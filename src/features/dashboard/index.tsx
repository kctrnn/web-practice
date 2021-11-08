import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import DashboardOverview from './components/DashboardOverview';
import ProjectItem from './components/ProjectItem';
import {
  fetchDashboardData,
  selectCompletedProjectList,
  selectDashboardLoading,
  selectOngoingProjectList,
} from './dashboardSlice';

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

const StackRowDirection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

function Dashboard() {
  const dispatch = useAppDispatch();
  const ongoingProjectList = useAppSelector(selectOngoingProjectList);
  const completedProjectList = useAppSelector(selectCompletedProjectList);
  const loading = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <Box pt={2}>
      <Typography component="h1" variant="h5" fontWeight={500} mb={4}>
        Dashboard
      </Typography>

      {loading && (
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
      )}

      {!loading && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              variant="outlined"
              sx={{ p: 2, borderColor: 'rgba(255, 152, 0, 0.5)' }}
            >
              <StackRowDirection mb={1}>
                <Heading>Ongoing challenges</Heading>
                <IconButton color="warning">
                  <HourglassEmptyRoundedIcon />
                </IconButton>
              </StackRowDirection>

              <List>
                {ongoingProjectList.map((project) => (
                  <ListItem disableGutters key={project._id}>
                    <ListItemButton sx={{ borderRadius: '.25rem' }}>
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
            <Paper
              variant="outlined"
              sx={{ p: 2, borderColor: 'rgba(76, 175, 80, 0.5)' }}
            >
              <StackRowDirection mb={1}>
                <Heading>Completed challenges</Heading>
                <IconButton color="success">
                  <DoneRoundedIcon />
                </IconButton>
              </StackRowDirection>

              {completedProjectList.map((project) => (
                <ListItem disableGutters key={project._id}>
                  <ListItemButton>
                    <ProjectItem
                      imgUrl={project.thumbnailImage}
                      title={project.name}
                      votes={project.voteLength}
                      feedbacks={project.feedbackLength}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DashboardOverview />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;
