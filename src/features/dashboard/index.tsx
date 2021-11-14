import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DashboardOverview from './components/DashboardOverview';
import ProjectItem from './components/ProjectItem';
import {
  fetchDashboardData,
  selectCompletedProjectList,
  selectDashboardLoading,
  selectOngoingProjectList,
} from './dashboardSlice';

dayjs.extend(relativeTime);

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
  const history = useHistory();

  const ongoingProjectList = useAppSelector(selectOngoingProjectList);
  const completedProjectList = useAppSelector(selectCompletedProjectList);
  const loading = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleItemClick = (id: string | undefined) => {
    if (id === undefined) return;
    history.push(`/challenges/${id}`);
  };

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
                  <DonutLargeRoundedIcon />
                </IconButton>
              </StackRowDirection>

              <List>
                {ongoingProjectList.map((project) => (
                  <ListItem
                    disableGutters
                    key={project._id}
                    onClick={() => handleItemClick(project._id)}
                  >
                    <ListItemButton sx={{ borderRadius: '.25rem' }}>
                      <ProjectItem
                        imgUrl={project.thumbnailImage}
                        title={project.name}
                        time={dayjs(project.createdAt).fromNow()}
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
                  <DoneAllRoundedIcon />
                </IconButton>
              </StackRowDirection>

              {completedProjectList.map((project) => (
                <ListItem disableGutters key={project._id}>
                  <ListItemButton sx={{ borderRadius: '.25rem' }}>
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
