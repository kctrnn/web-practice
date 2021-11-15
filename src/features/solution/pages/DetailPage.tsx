import { CircularProgress, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import solutionApi from 'api/solutionApi';
import { Solution } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SolutionHeader from '../components/SolutionHeader';
import SolutionPreview from '../components/SolutionPreview';

const Loading = styled(Box)({
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function DetailPage() {
  const { solutionId } = useParams<{ solutionId: string }>();

  const [solution, setSolution] = useState<Solution>();
  const [loading, setLoading] = useState(true);

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
  }, [solutionId]);

  if (loading)
    return (
      <Loading>
        <CircularProgress />
      </Loading>
    );

  return (
    <Box pt={2}>
      {solution && <SolutionHeader solution={solution} />}

      {solution && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={9} lg={8}>
            <SolutionPreview solution={solution} />
          </Grid>

          <Grid item xs={12} md={3} lg={4}>
            RIGHT
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default DetailPage;
