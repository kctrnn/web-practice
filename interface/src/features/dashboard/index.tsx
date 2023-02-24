import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import { Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CompletedProjectList from './components/CompletedProjectList';
import DashboardOverview from './components/DashboardOverview';
import DashboardSkeleton from './components/DashboardSkeleton';
import OngoingProjectList from './components/OngoingProjectList';
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
  const history = useHistory();

  const ongoingProjectList = useAppSelector(selectOngoingProjectList);
  const completedProjectList = useAppSelector(selectCompletedProjectList);
  const loading = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const handleOngoingProjectClick = (id: string | undefined) => {
    if (id === undefined) return;
    history.push(`/challenges/${id}`);
  };

  const handleCompletedProjectClick = (id: string | undefined) => {
    if (id === undefined) return;
    history.push(`/solutions/${id}`);
  };

  return (
    <Box pt={2}>
      <Typography component="h1" variant="h5" fontWeight={500} mb={4}>
        Dashboard
      </Typography>

      {loading && <DashboardSkeleton />}

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

              <OngoingProjectList
                projectList={ongoingProjectList}
                onItemClick={handleOngoingProjectClick}
              />
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

              <CompletedProjectList
                projectList={completedProjectList}
                onItemClick={handleCompletedProjectClick}
              />
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
