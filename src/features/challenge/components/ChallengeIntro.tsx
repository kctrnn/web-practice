import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { MarkdownViewer } from 'components/Common';
import { CHALLENGE_INTRO } from 'constants/index';

export interface ChallengeIntroProps {
  brief: string;
}

function ChallengeIntro({ brief }: ChallengeIntroProps) {
  return (
    <Box fontSize="1.125rem">
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderColor: '#bba9fb',
          backgroundColor: 'rgba(80, 47, 196, 0.03)',
        }}
      >
        <MarkdownViewer content={brief} />
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mt: 4,
          borderColor: '#ffda4d',
          backgroundColor: 'rgba(232, 172, 0, 0.03)',
        }}
      >
        <MarkdownViewer content={CHALLENGE_INTRO} />
      </Paper>
    </Box>
  );
}

export default ChallengeIntro;
