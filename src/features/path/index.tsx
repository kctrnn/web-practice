import {
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  fetchChallengeList,
  selectChallengeList,
  selectChallengeLoading,
} from 'features/challenge/challengeSlice';
import { Challenge, PathSlug } from 'models';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import Typewriter from 'typewriter-effect';
import { getPathDesc, getPathIntro, getPathName, getPathRule } from 'utils';
import PathCard from './components/PathCard';
import PathProgress from './components/PathProgress';

const SIDEBAR_WIDTH = 240;

const Wrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
}));

const Loading = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0),
  right: theme.spacing(0),
  left: `-${SIDEBAR_WIDTH}px`,
}));

const Description = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid #bba9fb`,
  borderRadius: theme.shape.borderRadius,

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  backgroundColor: 'rgba(80,47,196,0.03)',
}));

const TypewriterBox = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingLeft: theme.spacing(2),
  fontSize: '1.5rem',
  fontFamily: `'Lobster', cursive`,
}));

const Rule = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  border: `1px solid #ffda4d`,
  borderRadius: theme.shape.borderRadius,

  backgroundColor: 'rgba(232, 172, 0, 0.03)',
}));

const Intro = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  fontFamily: `'Lato', sans-serif`,
  fontSize: '1.125rem',
  fontWeight: 400,

  ul: {
    paddingLeft: '1.25rem',
  },

  li: {
    marginBottom: '.5rem',
  },

  strong: {
    fontWeight: 700,
  },
}));

function Path() {
  const { pathSlug } = useParams<{ pathSlug: PathSlug }>();
  const dispatch = useAppDispatch();

  const challengeList: Challenge[] = useAppSelector(selectChallengeList);
  const loading = useAppSelector(selectChallengeLoading);

  useEffect(() => {
    dispatch(fetchChallengeList(pathSlug));
  }, [pathSlug, dispatch]);

  return (
    <Wrapper>
      {loading && <Loading />}

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} lg={8}>
          <Intro variant='outlined'>
            <Typography component='h1' variant='h5' fontWeight='500'>
              {getPathName(pathSlug)}
            </Typography>

            <Typography
              my={2}
              fontFamily={`'Lato', sans-serif`}
              fontSize='1.125rem'
              color='grey.700'
            >
              {getPathIntro(pathSlug)}
            </Typography>

            <Description>
              <TypewriterBox>
                <Typewriter
                  options={{
                    strings: ['For those who want to'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </TypewriterBox>

              <Box width='60%'>
                <ReactMarkdown
                  children={getPathDesc(pathSlug)}
                  remarkPlugins={[remarkGfm]}
                />
              </Box>
            </Description>

            <Rule>
              <ReactMarkdown
                children={getPathRule(pathSlug)}
                remarkPlugins={[remarkGfm]}
              />
            </Rule>
          </Intro>
        </Grid>

        <Grid item xs={12} lg={4}>
          <PathProgress slug={pathSlug} challengeCount={challengeList.length} />
        </Grid>
      </Grid>

      <Box mb={3}>
        <Divider>
          <Chip label='Projects' variant='outlined' color='primary' />
        </Divider>
      </Box>

      <Grid container spacing={4}>
        {challengeList.length > 0 &&
          challengeList.map((challenge) => (
            <Grid item xs={12} md={6} lg={4} key={challenge.id}>
              <PathCard challenge={challenge} />
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
}

export default Path;
