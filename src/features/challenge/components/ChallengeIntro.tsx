import { Paper } from '@mui/material';
import { Box, styled } from '@mui/system';
import { CHALLENGE_INTRO } from 'constants/index';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Wrapper = styled(Box)(({ theme }) => ({
  fontFamily: `'Lato', sans-serif`,
  fontSize: '1.125rem',
  fontWeight: 400,

  ul: {
    paddingLeft: '1.25rem',
  },

  li: {
    marginBottom: '.5rem',
  },

  p: {
    marginBottom: '.75rem',
  },

  strong: {
    fontWeight: 700,
  },

  code: {
    fontFamily: `'Lato', sans-serif`,
  },

  a: {
    fontFamily: `'Lato', sans-serif`,
    color: theme.palette.info.main,
  },
}));

export interface ChallengeIntroProps {
  brief: string;
}

function ChallengeIntro({ brief }: ChallengeIntroProps) {
  return (
    <Wrapper>
      <Paper
        variant='outlined'
        sx={{
          p: 2,
          borderColor: '#bba9fb',
          bgcolor: 'rgba(80, 47, 196, 0.03)',
        }}
      >
        <ReactMarkdown children={brief} remarkPlugins={[remarkGfm]} />
      </Paper>

      <Paper
        variant='outlined'
        sx={{
          p: 2,
          mt: 4,
          borderColor: '#ffda4d',
          bgcolor: 'rgba(232, 172, 0, 0.03)',
        }}
      >
        <ReactMarkdown children={CHALLENGE_INTRO} remarkPlugins={[remarkGfm]} />
      </Paper>
    </Wrapper>
  );
}

export default ChallengeIntro;
