import { Box, Chip, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import solutionApi from 'api/solutionApi';
import { Solution } from 'models';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SolutionForm from '../components/SolutionForm';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
  },

  titleBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  back: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(4),

    textDecoration: 'none',
    color: theme.palette.primary.dark,
  },

  form: {
    marginTop: theme.spacing(2),
    maxWidth: '500px',
  },

  solutionId: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),

    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

function AddEditPage() {
  const classes = useStyles();
  const history = useHistory();
  const { solutionId } = useParams<{ solutionId: string }>();

  const isEdit = Boolean(solutionId);
  const [solution, setSolution] = useState<Solution>();

  useEffect(() => {
    if (!solutionId) return;

    (async () => {
      try {
        const response = await solutionApi.get(solutionId);
        setSolution(response);
      } catch (error) {
        console.log('Failed to fetch solution detail', error);
      }
    })();
  }, [solutionId]);

  const initialValues: Solution = {
    title: '',
    demoUrl: '',
    repoUrl: '',
    challengeId: '',
    userId: '',
    ...solution,
  } as Solution;

  const handleSolutionFormSubmit = async (formValues: Solution) => {
    if (isEdit) {
      await solutionApi.update(solution?.id || '', formValues);
    } else {
      toast.info('This feature is not ready yet');
      // await solutionApi.add(formValues);
    }

    // Show toast success
    toast.success('🚀 Save solution successfully');

    // Redirect to solution main page
    history.push('/admin/solutions');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titleBox}>
        <Typography variant="h5">
          {isEdit ? 'Solution details' : 'Add new solution'}
        </Typography>

        <Typography
          variant="subtitle2"
          component={Link}
          to="/admin/solutions"
          className={classes.back}
        >
          <ChevronLeft /> Back to solution list
        </Typography>
      </Box>

      {solution && (
        <Box className={classes.solutionId}>
          <Chip label="Solution ID" size="small" />
          <Typography variant="body2">{solution.id}</Typography>
        </Box>
      )}

      {(solution || !isEdit) && (
        <Box className={classes.form}>
          <SolutionForm
            initialValues={initialValues}
            onSubmit={handleSolutionFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}

export default AddEditPage;
