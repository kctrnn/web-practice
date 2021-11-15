import { Box } from '@mui/system';
import solutionApi from 'api/solutionApi';
import { Solution } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

  return <Box>{JSON.stringify(solution)}</Box>;
}

export default DetailPage;
