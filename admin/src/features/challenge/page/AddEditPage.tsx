import { Box, Chip, makeStyles, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import challengeApi from 'api/challengeApi';
import { Challenge } from 'models';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChallengeForm from '../components/ChallengeForm';

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

  challengeId: {
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
  const { challengeId } = useParams<{ challengeId: string }>();

  const isEdit = Boolean(challengeId);
  const [challenge, setChallenge] = useState<Challenge>();

  useEffect(() => {
    if (!challengeId) return;

    (async () => {
      try {
        const response = await challengeApi.get(challengeId);
        setChallenge(response);
      } catch (error) {
        console.log('Failed to fetch challenge detail', error);
      }
    })();
  }, [challengeId]);

  const initialValues: Challenge = {
    name: '',
    description: '',
    level: '0',
    pathSlug: '',
    ...challenge,
  } as Challenge;

  const handleChallengeFormSubmit = async (formValues: Challenge) => {
    if (isEdit) {
      await challengeApi.update(challenge?.id || '', formValues);
    } else {
      const data: Challenge = {
        ...formValues,
        brief: '',
        designId: '',
        thumbnailImage: '',
        resourceId: '',
        order: 0,
        tags: [],
      };
      await challengeApi.add(data);
    }

    // Show toast success
    toast.success('🚀 Save challenge successfully');

    // Redirect to challenge main page
    history.push('/admin/challenges');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titleBox}>
        <Typography variant="h5">
          {isEdit ? 'Challenge details' : 'Add new challenge'}
        </Typography>

        <Typography
          variant="subtitle2"
          component={Link}
          to="/admin/challenges"
          className={classes.back}
        >
          <ChevronLeft /> Back to challenge list
        </Typography>
      </Box>

      {challenge && (
        <Box className={classes.challengeId}>
          <Chip label="Challenge ID" size="small" />
          <Typography variant="body2">{challenge.id}</Typography>
        </Box>
      )}

      {(challenge || !isEdit) && (
        <Box className={classes.form}>
          <ChallengeForm
            initialValues={initialValues}
            onSubmit={handleChallengeFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}

export default AddEditPage;
