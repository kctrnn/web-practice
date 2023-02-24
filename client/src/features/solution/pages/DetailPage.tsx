import {
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import solutionApi from 'api/solutionApi';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Solution } from 'models';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SolutionFeedbackForm from '../components/SolutionFeedbackForm';
import SolutionFeedbackItem from '../components/SolutionFeedbackItem';
import SolutionHeader from '../components/SolutionHeader';
import SolutionPreview from '../components/SolutionPreview';
import SolutionShare from '../components/SolutionShare';
import SolutionThumbnail from '../components/SolutionThumbnail';
import SolutionUser from '../components/SolutionUser';

const Loading = styled(Box)({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function DetailPage() {
  const { solutionId } = useParams<{ solutionId: string }>();
  const { _id: userId } = useSelector(selectCurrentUser);

  const [solution, setSolution] = useState<Solution>();
  const [loading, setLoading] = useState(true);
  const [feedbackMode, setFeedbackMode] = useState(false);

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        const response = await solutionApi.get(solutionId);
        setSolution(response);
      } catch (error) {
        console.log('Fetch solution failed', error);
      }

      setLoading(false);
    };

    fetchSolution();
  }, [solutionId, loading]);

  const handleVoteClick = async (userId: string) => {
    if (!solution?._id) return;

    const isRemoveVote = solution.votes.includes(userId);
    const newSolution = { ...solution };

    if (isRemoveVote) {
      const newVotes = newSolution.votes.filter((id) => id !== userId);
      newSolution.votes = [...newVotes];
    } else {
      newSolution.votes = [...newSolution.votes, userId];
    }

    try {
      setLoading(true);
      await solutionApi.update(solution?._id, newSolution);
      setLoading(false);
    } catch (error) {
      console.log('Failed to vote: ', error);
    }
  };

  const handleFeedbackSubmit = async ({ message }: { message: string }) => {
    if (!solution?._id || !userId) return;

    const newSolution: Solution = {
      ...solution,
      feedbacks: [...solution?.feedbacks, { userId, message }],
    };

    try {
      setLoading(true);
      await solutionApi.update(solution?._id, newSolution);

      setFeedbackMode(false);
      setLoading(false);
    } catch (error) {
      console.log('Failed to feedback: ', error);
    }
  };

  if (loading)
    return (
      <Loading>
        <CircularProgress />
      </Loading>
    );

  return (
    <Box pt={2}>
      {solution && (
        <>
          <SolutionHeader solution={solution} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={8} lg={9}>
              <SolutionPreview solution={solution} />
            </Grid>

            <Grid item xs={12} md={4} lg={3} sx={{ order: { xs: -1, md: 0 } }}>
              <Stack spacing={2}>
                <SolutionUser solution={solution} />
                <SolutionThumbnail
                  solution={solution}
                  feedbackMode={feedbackMode}
                  onVoteClick={handleVoteClick}
                  onFeedbackClick={() => setFeedbackMode((x) => !x)}
                />
                <SolutionShare />

                {feedbackMode && (
                  <SolutionFeedbackForm onSubmit={handleFeedbackSubmit} />
                )}
              </Stack>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper variant="outlined" sx={{ p: 2, mt: 4 }}>
                <Typography variant="h6" mb={2}>
                  Feedbacks
                </Typography>

                <Stack spacing={4}>
                  {solution.feedbacks.map((feedback, idx) => (
                    <SolutionFeedbackItem key={idx} feedback={feedback} />
                  ))}
                </Stack>

                {solution.feedbacks.length === 0 && (
                  <Typography color="text.secondary" variant="body1">
                    No feedback found yet
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3} />
          </Grid>
        </>
      )}
    </Box>
  );
}

export default DetailPage;
