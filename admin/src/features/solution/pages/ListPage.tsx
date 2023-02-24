import { Box, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import solutionApi from 'api/solutionApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ListParams, Solution } from 'models';
import { ChangeEvent, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import SolutionFilter from '../components/SolutionFilter';
import SolutionTable from '../components/SolutionTable';
import {
  fetchSolutionList,
  selectSolutionFilter,
  selectSolutionList,
  selectSolutionLoading,
  selectSolutionPagination,
  setFilter,
  setFilterDebounce,
} from '../solutionSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    position: 'relative',
  },

  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },

  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },

  loading: {
    position: 'absolute',
    width: '100%',
    top: theme.spacing(-1),
  },
}));

function MainPage() {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const solutionList = useAppSelector(selectSolutionList);
  const solutionLoading = useAppSelector(selectSolutionLoading);
  const solutionFilter = useAppSelector(selectSolutionFilter);
  const { _limit, _page, _totalRows } = useAppSelector(
    selectSolutionPagination
  );

  useEffect(() => {
    const action = fetchSolutionList(solutionFilter);
    dispatch(action);
  }, [dispatch, solutionFilter]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(
      setFilter({
        ...solutionFilter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(setFilterDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(setFilter(newFilter));
  };

  const handleEditClick = (solution: Solution) => {
    history.push(`${match.url}/${solution.id}`);
  };

  const handleRemoveClick = async (solution: Solution) => {
    try {
      await solutionApi.remove(solution.id || '');
      toast.success('Remove solution successfully!');

      dispatch(setFilter({ ...solutionFilter }));
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <Box className={classes.root}>
      {solutionLoading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleBox}>
        <Typography component="h1" variant="h5">
          Solutions
        </Typography>
      </Box>

      <SolutionFilter
        filter={solutionFilter}
        onSearchChange={handleSearchChange}
        onChange={handleFilterChange}
      />

      {!solutionLoading && (
        <SolutionTable
          list={solutionList}
          onEdit={handleEditClick}
          onRemove={handleRemoveClick}
        />
      )}

      <Box my={2} className={classes.pagination}>
        <Pagination
          count={Math.ceil(_totalRows / _limit)}
          variant="outlined"
          shape="rounded"
          page={_page}
          color="primary"
          disabled={solutionLoading}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default MainPage;
