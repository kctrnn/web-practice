import { Grid, LinearProgress, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  fetchChallengeList,
  selectChallengeList,
  selectChallengeLoading,
} from 'features/challenge/challengeSlice';
import { Challenge, PathSlug } from 'models';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PathCard from './components/PathCard';

const SIDEBAR_WIDTH = 240;

const Wrapper = styled(Box)(({ theme }) => ({
  // position: 'relative',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
}));

const Loading = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0),
  right: theme.spacing(0),
  left: `-${SIDEBAR_WIDTH}px`,
}));

function Path() {
  const { pathSlug } = useParams<{ pathSlug: PathSlug }>();
  const dispatch = useAppDispatch();

  const challengeList: Challenge[] = useAppSelector(selectChallengeList);
  const loading = useAppSelector(selectChallengeLoading);

  useEffect(() => {
    dispatch(fetchChallengeList(pathSlug));
  }, [pathSlug, dispatch]);

  return (
    <Wrapper>
      {loading && <Loading />}

      <Typography variant='h5' component='div' mb={4}>
        Challenges
      </Typography>

      <Grid container spacing={4}>
        {challengeList.length > 0 &&
          challengeList.map((challenge) => (
            <Grid item xs={12} md={6} lg={4} key={challenge.id}>
              <PathCard challenge={challenge} />
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
}
export default Path;
