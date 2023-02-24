import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { ChangeEvent, useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
  fetchStudentList,
  setFilter,
  setFilterDebounce,
} from '../studentSlice';

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

  const studentList = useAppSelector((state) => state.student.list);
  const loading = useAppSelector((state) => state.student.loading);
  const filter = useAppSelector((state) => state.student.filter);
  const { _limit, _page, _totalRows } = useAppSelector(
    (state) => state.student.pagination
  );

  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    const action = fetchStudentList(filter);
    dispatch(action);
  }, [dispatch, filter]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    dispatch(
      setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: Partial<ListParams>) => {
    dispatch(setFilterDebounce(newFilter));
  };

  const handleCityChange = (newFilter: Partial<ListParams>) => {
    dispatch(setFilter(newFilter));
  };

  const handleEditClick = (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  const handleRemoveClick = async (student: Student) => {
    try {
      await studentApi.remove(student.id || '');

      toast.success('💔 Remove student successfully!');

      // Trigger to re-fetch student list with current filter
      dispatch(setFilter({ ...filter }));
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleBox}>
        <Typography component="h1" variant="h5">
          Students
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`${match.path}/add`}
        >
          Add new student
        </Button>
      </Box>

      <StudentFilters
        filter={filter}
        cityList={cityList}
        onSearchChange={handleSearchChange}
        onChange={handleCityChange}
      />

      {!loading && (
        <StudentTable
          studentList={studentList}
          cityMap={cityMap}
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
          disabled={loading}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}

export default MainPage;
