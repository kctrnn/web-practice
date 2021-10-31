import TagRoundedIcon from '@mui/icons-material/TagRounded';
import { Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import challengeApi from 'api/challengeApi';
import { Challenge as ChallengeModel } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChallengeIntro from './components/ChallengeIntro';
import ChallengeStart from './components/ChallengeStart';

const SIDEBAR_WIDTH = 240;

const Loading = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0),
  right: theme.spacing(0),
  left: `-${SIDEBAR_WIDTH}px`,
}));

const Image = styled(Paper)(({ theme }) => ({
  minHeight: 590,
  marginBottom: theme.spacing(4),
  // borderColor: '#e5eaf0',
  borderColor: '#EAEEF3',
  overflow: 'hidden',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: '1.5rem',
  fontWeight: 500,

  svg: {
    verticalAlign: 'middle',
  },
}));

function Challenge() {
  const { challengeId } = useParams<{ challengeId: string }>();

  const [challenge, setChallenge] = useState<ChallengeModel>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await challengeApi.get(challengeId);
        setChallenge(response);
      } catch (error) {
        console.log('Fetch challenge failed', error);
      }

      setLoading(false);
    })();
  }, [challengeId]);

  return (
    <Box>
      {loading && <Loading />}

      {challenge && (
        <Name>
          <TagRoundedIcon /> {challenge.name}
        </Name>
      )}

      {challenge && (
        <Image variant='outlined'>
          <img src={challenge.thumbnailImage} alt='' />
        </Image>
      )}

      {challenge && (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <ChallengeIntro brief={challenge.brief} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <ChallengeStart />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Challenge;
