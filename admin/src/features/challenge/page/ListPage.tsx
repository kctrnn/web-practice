import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import challengeApi from 'api/challengeApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Challenge, ListParams } from 'models';
import { ChangeEvent, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  fetchChallengeList,
  selectChallengeFilter,
  selectChallengeList,
  selectChallengeLoading,
  selectChallengePagination,
  setFilter,
  setFilterDebounce,
} from '../challengeSlice';
import ChallengeFilter from '../components/ChallengeFilter';
import ChallengeTable from '../components/ChallengeTable';

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

  const challengeList = useAppSelector(selectChallengeList);
  const challengeLoading = useAppSelector(selectChallengeLoading);
  const challengeFilter = useAppSelector(selectChallengeFilter);
  const { _limit, _page, _totalRows } = useAppSelector(
    selectChallengePagination
  );

  useEffect(() => {
    const action = fetchChallengeList(challengeFilter);
    dispatch(action);
  }, [dispatch, challengeFilter]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(
      setFilter({
        ...challengeFilter,
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

  const handleEditClick = (challenge: Challenge) => {
    history.push(`${match.url}/${challenge.id}`);
  };

  const handleRemoveClick = async (challenge: Challenge) => {
    try {
      await challengeApi.remove(challenge.id || '');
      toast.success('Remove challenge successfully!');

      dispatch(setFilter({ ...challengeFilter }));
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <Box className={classes.root}>
      {challengeLoading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleBox}>
        <Typography component="h1" variant="h5">
          Challenges
        </Typography>

        <Button
          variant="contained"
          size="small"
          style={{ textTransform: 'capitalize' }}
          color="primary"
          component={Link}
          to={`${match.path}/add`}
        >
          Add new challenge
        </Button>
      </Box>

      <ChallengeFilter
        filter={challengeFilter}
        onSearchChange={handleSearchChange}
        onChange={handleFilterChange}
      />

      {!challengeLoading && (
        <ChallengeTable
          list={challengeList}
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
          disabled={challengeLoading}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default MainPage;
