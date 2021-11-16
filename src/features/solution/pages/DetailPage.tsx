import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import solutionApi from 'api/solutionApi';
import { Solution } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
                <SolutionThumbnail solution={solution} />
                <SolutionShare />
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default DetailPage;
