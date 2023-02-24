import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import userApi from 'api/userApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ListParams, User } from 'models';
import { ChangeEvent, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import {
  fetchUserList,
  selectUserFilter,
  selectUserList,
  selectUserLoading,
  selectUserPagination,
  setFilter,
  setFilterDebounce,
} from '../userSlice';

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

  const userList = useAppSelector(selectUserList);
  const userLoading = useAppSelector(selectUserLoading);
  const userFilter = useAppSelector(selectUserFilter);
  const { _limit, _page, _totalRows } = useAppSelector(selectUserPagination);

  useEffect(() => {
    const action = fetchUserList(userFilter);
    dispatch(action);
  }, [dispatch, userFilter]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(
      setFilter({
        ...userFilter,
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

  const handleEditClick = (user: User) => {
    history.push(`${match.url}/${user.id}`);
  };

  const handleRemoveClick = async (user: User) => {
    try {
      await userApi.remove(user.id || '');
      toast.success('Remove user successfully!');

      dispatch(setFilter({ ...userFilter }));
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <Box className={classes.root}>
      {userLoading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleBox}>
        <Typography component="h1" variant="h5">
          Users
        </Typography>

        <Button
          variant="contained"
          size="small"
          style={{ textTransform: 'capitalize' }}
          color="primary"
          component={Link}
          to={`${match.path}/add`}
        >
          Add new user
        </Button>
      </Box>

      <UserFilter
        filter={userFilter}
        onSearchChange={handleSearchChange}
        onChange={handleFilterChange}
      />

      {!userLoading && (
        <UserTable
          list={userList}
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
          disabled={userLoading}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default MainPage;
