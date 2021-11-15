import { Chip, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import {
  fetchChallengeList,
  selectChallengeList,
  selectChallengeLoading,
} from 'features/challenge/challengeSlice';
import {
  fetchSolutionList,
  selectSolutionList,
} from 'features/solution/solutionSlice';
import { PathSlug } from 'models';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PathCard from './components/PathCard';
import PathIntro from './components/PathIntro';
import PathProgress from './components/PathProgress';
import PathSkeleton from './components/PathSkeleton';

function Path() {
  const { pathSlug } = useParams<{ pathSlug: PathSlug }>();
  const dispatch = useAppDispatch();

  const challengeList = useAppSelector(selectChallengeList);
  const solutionList = useAppSelector(selectSolutionList);
  const loading = useAppSelector(selectChallengeLoading);
  const { _id: userId } = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchChallengeList(pathSlug));
  }, [pathSlug, dispatch]);

  useEffect(() => {
    dispatch(fetchSolutionList({ userId }));
  }, [dispatch, userId]);

  const challengeCompleted = useMemo(() => {
    const challengeIdList = challengeList.map((x) => x._id);
    const solutionByPath = solutionList.filter(
      (x) => x.submitted && challengeIdList.includes(x.challengeId)
    );

    return solutionByPath.length;
  }, [challengeList, solutionList]);

  return (
    <Box sx={{ pb: 2, pt: { xs: 0, sm: 2 } }}>
      <Grid
        container
        spacing={4}
        sx={{ mb: 4, display: { xs: 'none', sm: 'flex' } }}
      >
        <Grid item xs={12} lg={8}>
          <PathIntro pathSlug={pathSlug} />
        </Grid>

        <Grid item xs={12} lg={4}>
          <PathProgress
            slug={pathSlug}
            challengeCount={challengeList.length}
            challengeCompleted={challengeCompleted}
          />
        </Grid>
      </Grid>

      <Box mb={3}>
        <Divider>
          <Chip label="Projects" variant="outlined" color="primary" />
        </Divider>
      </Box>

      {loading && <PathSkeleton length={8} />}

      {!loading && (
        <Grid container spacing={4}>
          {challengeList.map((challenge) => (
            <Grid item xs={12} md={6} lg={4} key={challenge._id}>
              <PathCard challenge={challenge} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Path;
