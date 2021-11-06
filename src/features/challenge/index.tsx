import TagRoundedIcon from '@mui/icons-material/TagRounded';
import { Grid, Paper, Skeleton, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import challengeApi from 'api/challengeApi';
import solutionApi from 'api/solutionApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import {
  fetchSolutionList,
  selectSolutionList,
} from 'features/solution/solutionSlice';
import { Challenge as ChallengeModel } from 'models';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeIntro from './components/ChallengeIntro';
import ChallengeStart from './components/ChallengeStart';

const Image = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  // borderColor: '#e5eaf0',
  borderColor: '#EAEEF3',
  overflow: 'hidden',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '1.5rem',
  fontWeight: 500,

  svg: {
    verticalAlign: 'middle',
  },
}));

function Challenge() {
  const dispatch = useAppDispatch();
  const solutionList = useAppSelector(selectSolutionList);
  const { _id: userId } = useAppSelector(selectCurrentUser);

  const { challengeId } = useParams<{ challengeId: string }>();
  const [challenge, setChallenge] = useState<ChallengeModel>();
  const [loading, setLoading] = useState<boolean>(true);

  const currentSolution = useMemo(() => {
    return solutionList.find((x) => x.challengeId === challengeId);
  }, [challengeId, solutionList]);

  const isNew = !currentSolution;
  const isSubmitted = Boolean(currentSolution?.submitted);

  useEffect(() => {
    (async () => {
      try {
        const response = await challengeApi.get(challengeId);
        setChallenge(response);
      } catch (error) {
        console.log('Fetch challenge failed', error);
      }

      setLoading(false);
    })();
  }, [challengeId]);

  useEffect(() => {
    dispatch(
      fetchSolutionList({
        userId,
      })
    );
  }, [dispatch, userId]);

  const handleStartDownload = async () => {
    if (userId && challengeId) {
      await solutionApi.add({
        userId,
        challengeId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        submitted: false,

        title: '',
        description: '',
        repoUrl: '',
        demoUrl: '',
        feedbackRequest: '',
        submittedAt: 0,
      });
    }
  };

  return (
    <Box>
      {loading && (
        <Box>
          <Skeleton width="50%" />
          <Skeleton />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={500}
            sx={{ mt: 2 }}
          />
        </Box>
      )}

      {challenge && (
        <Name>
          <TagRoundedIcon /> {challenge.name}
        </Name>
      )}

      {challenge && (
        <Image variant="outlined">
          <img src={challenge.thumbnailImage} alt="" />
        </Image>
      )}

      {challenge && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <ChallengeIntro brief={challenge.brief} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <ChallengeStart
              designId={challenge.designId}
              resourceId={challenge.resourceId}
              isNew={isNew}
              isSubmitted={isSubmitted}
              onStartDownload={handleStartDownload}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Challenge;
