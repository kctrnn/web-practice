import { LinearProgress } from '@mui/material';
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

const Wrapper = styled(Box)(() => ({
  position: 'relative',
}));

const Loading = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(-2),
  right: theme.spacing(-2),
  left: theme.spacing(-2),
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

      <ul>
        {challengeList.length > 0 &&
          challengeList.map((challenge) => (
            <li key={challenge.id}>{challenge.name}</li>
          ))}
      </ul>
    </Wrapper>
  );
}
export default Path;
