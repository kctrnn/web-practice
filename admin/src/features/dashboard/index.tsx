import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import GroupIcon from '@material-ui/icons/Group';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  fetchChallengeList,
  selectChallengeFilter,
  selectChallengePagination,
} from 'features/challenge/challengeSlice';
import {
  fetchSolutionList,
  selectSolutionFilter,
  selectSolutionPagination,
} from 'features/solution/solutionSlice';
import {
  fetchUserList,
  selectUserFilter,
  selectUserPagination,
} from 'features/user/userSlice';
import { useEffect } from 'react';
import ChallengeRankingList from './components/ChallengeRankingList';
import StatisticItem from './components/StatisticItem';
import TopUserList from './components/TopUserList';
import {
  fetchDashboardData,
  selectChallengeByPathList,
  selectTopUserWithSolution,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: '21rem',
    position: 'relative',
  },

  loading: {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(-1),
  },
}));

function Dashboard() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.dashboard.loading);
  const challengeByPathList = useAppSelector(selectChallengeByPathList);
  const topUserWithSolution = useAppSelector(selectTopUserWithSolution);

  const { _totalRows: challengeLength } = useAppSelector(
    selectChallengePagination
  );
  const { _totalRows: solutionLength } = useAppSelector(
    selectSolutionPagination
  );
  const { _totalRows: userLength } = useAppSelector(selectUserPagination);

  const challengeFilter = useAppSelector(selectChallengeFilter);
  const solutionFilter = useAppSelector(selectSolutionFilter);
  const userFilter = useAppSelector(selectUserFilter);

  useEffect(() => {
    dispatch(fetchChallengeList(challengeFilter));
    dispatch(fetchSolutionList(solutionFilter));
    dispatch(fetchUserList(userFilter));
  }, [dispatch, challengeFilter, solutionFilter, userFilter]);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      {/* Statistics section*/}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatisticItem
            icon={<BlurLinearIcon fontSize="large" color="primary" />}
            label="total challenge"
            value={challengeLength}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatisticItem
            icon={<AccountTreeIcon fontSize="large" color="primary" />}
            label="total solution"
            value={solutionLength}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatisticItem
            icon={<GroupIcon fontSize="large" color="primary" />}
            label="total user"
            value={userLength}
          />
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h5" style={{ fontSize: '1.25rem' }}>
          ↗️ Top users
        </Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TopUserList
                title="Top user by solution"
                userList={topUserWithSolution}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* All students rankings */}
      <Box mt={5}>
        <Typography variant="h5" style={{ fontSize: '1.25rem' }}>
          ↗️ Challenge by path
        </Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {challengeByPathList.map(({ pathName, list }) => (
              <Grid item xs={12} md={4} key={pathName}>
                <ChallengeRankingList title={pathName} challengeList={list} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
