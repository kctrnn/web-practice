import { Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import {
  fetchSolutionList,
  selectSolutionFilter,
  selectSolutionList,
  selectSolutionLoading,
  setFilter,
} from '../solutionSlice';
import SolutionItem from '../components/SolutionItem';
import SolutionFilter from '../components/SolutionFilter';
import { SolutionFilter as SolutionFilterModel } from 'api/solutionApi';
import SolutionSkeletonList from '../components/SolutionSkeletonList';

function ListPage() {
  const dispatch = useAppDispatch();

  const solutionList = useAppSelector(selectSolutionList);
  const solutionFilter = useAppSelector(selectSolutionFilter);
  const loading = useAppSelector(selectSolutionLoading);

  useEffect(() => {
    dispatch(
      setFilter({
        pathSlug: 'responsive-web-developer',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSolutionList(solutionFilter));
  }, [dispatch, solutionFilter]);

  const handleFilterChange = (newFilter: SolutionFilterModel) => {
    console.log(newFilter);

    dispatch(
      setFilter({
        ...solutionFilter,
        ...newFilter,
      })
    );
  };

  return (
    <Box pt={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography component="h1" variant="h5" fontWeight={500} mb={4}>
          Solutions
        </Typography>

        <SolutionFilter
          filter={solutionFilter}
          onFilterChange={handleFilterChange}
        />
      </Stack>

      {loading && <SolutionSkeletonList length={6} />}

      {!loading && (
        <Grid container spacing={4}>
          {solutionList.map((solution) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={solution._id}>
              <SolutionItem solution={solution} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ListPage;
