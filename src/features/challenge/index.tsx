import TagRoundedIcon from '@mui/icons-material/TagRounded';
import { Grid, Paper, Skeleton, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import challengeApi from 'api/challengeApi';
import solutionApi from 'api/solutionApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Modal } from 'components/Common';
import { selectCurrentUser } from 'features/auth/authSlice';
import {
  fetchSolutionList,
  selectSolutionList,
} from 'features/solution/solutionSlice';
import { Challenge as ChallengeModel } from 'models';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeError from './components/ChallengeError';
import ChallengeIntro from './components/ChallengeIntro';
import ChallengeStart from './components/ChallengeStart';
import ChallengeSuccess from './components/ChallengeSuccess';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const { challengeId } = useParams<{ challengeId: string }>();

  const solutionList = useAppSelector(selectSolutionList);
  const { _id: userId } = useAppSelector(selectCurrentUser);

  const [challenge, setChallenge] = useState<ChallengeModel>();
  const [loading, setLoading] = useState(true);

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchSolutionList({ userId }));
  }, [dispatch, userId]);

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
  }, [challengeId, solutionList]);

  const currentSolution = useMemo(() => {
    return solutionList.find((x) => x.challengeId === challengeId);
  }, [challengeId, solutionList]);

  const totalInProgressSolution = useMemo(() => {
    return solutionList.filter((x) => !x.submitted).length;
  }, [solutionList]);

  const isNew = !currentSolution;
  const isSubmitted = Boolean(currentSolution?.submitted);

  const handleStartDownload = async (event: any) => {
    if (totalInProgressSolution >= 5) {
      event.preventDefault();
      setShowError(true);
      return;
    }

    setShowSuccess(true);

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

        feedbacks: [],
        votes: [],
      });
    }

    dispatch(fetchSolutionList({ userId }));
  };

  const handleSubmitClick = () => {
    history.push(`/solutions/${currentSolution?._id}/submit`);
  };

  return (
    <Box>
      <Modal open={showError} onClose={() => setShowError(false)}>
        <ChallengeError />
      </Modal>

      <Modal open={showSuccess} onClose={() => setShowSuccess(false)}>
        <ChallengeSuccess onClose={() => setShowSuccess(false)} />
      </Modal>

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
              onSubmitClick={handleSubmitClick}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Challenge;
