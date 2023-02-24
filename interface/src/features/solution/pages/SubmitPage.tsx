import { Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import challengeApi from 'api/challengeApi';
import solutionApi from 'api/solutionApi';
import { Challenge, Solution } from 'models';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSubmitInfo } from 'utils';
import SolutionInfo from '../components/SolutionInfo';
import SubmitForm from '../components/SubmitForm';
import SubmitInfo from '../components/SubmitInfo';

function SubmitPage() {
  const history = useHistory();
  const { solutionId } = useParams<{ solutionId: string }>();
  const [currentInput, setCurrentInput] = useState<string>('title');

  const [solution, setSolution] = useState<Solution>();
  const [challenge, setChallenge] = useState<Challenge>();

  useEffect(() => {
    const fetchSolutionById = async () => {
      const response = await solutionApi.get(solutionId);
      setSolution(response);
    };

    fetchSolutionById();
  }, [solutionId]);

  useEffect(() => {
    if (!solution) return;

    const fetchChallengeById = async () => {
      const response = await challengeApi.get(solution.challengeId);
      setChallenge(response);
    };

    fetchChallengeById();
  }, [solution]);

  const handleInputClick = (inputName: string) => {
    setCurrentInput(inputName);
  };

  const handleSubmitFormSubmit = async (data: Partial<Solution>) => {
    const solutionValues: Solution = {
      ...solution,
      ...(data as Solution),
      submitted: true,
      submittedAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {
      solution?._id &&
        (await solutionApi.update(solution?._id, solutionValues));

      history.push(`/solutions/${solutionValues._id}`);
      toast.success('Yup', { icon: '🚀' });
    } catch (error) {
      console.log('Failed to submit solution: ', error);
    }
  };

  return (
    <Box pt={2}>
      <Typography component="h1" variant="h5" fontWeight={500} mb={4}>
        Submit solution
      </Typography>

      {challenge && (
        <SolutionInfo
          challengeName={challenge?.name}
          challengeImage={challenge?.thumbnailImage}
        />
      )}

      {!challenge && (
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={5} lg={4}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid>

          <Grid item xs={12} md={7} lg={8}>
            <Skeleton width="50%" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={7} lg={8}>
          <SubmitForm
            onSubmit={handleSubmitFormSubmit}
            onInputClick={handleInputClick}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          lg={4}
          sx={{ mt: 2, order: { xs: -1, md: 0 } }}
        >
          <SubmitInfo content={getSubmitInfo(currentInput) as string} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default SubmitPage;
