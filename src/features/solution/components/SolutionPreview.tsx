import { Button, Paper, Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Solution } from 'models';

export interface SolutionPreviewProps {
  solution: Solution;
}

const Preview = styled(Box)(() => ({
  width: '100%',
  height: 720,
  overflow: 'hidden',
  borderRadius: '.25rem',
  backgroundColor: '#fff',

  iframe: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    border: 'none',
  },
}));

function SolutionPreview({ solution }: SolutionPreviewProps) {
  return (
    <Paper variant="outlined">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ py: 2, px: { xs: 2, md: 4 } }}
      >
        <Typography variant="h6" sx={{ fontFamily: `'Lobster', cursive` }}>
          Preview
        </Typography>

        <Stack direction="row" spacing={2}>
          <a href={solution.demoUrl} target="_blank" rel="noreferrer">
            <Button
              size="small"
              variant="contained"
              disableElevation
              color="warning"
            >
              Demo
            </Button>
          </a>

          <a
            href={solution.repoUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'inherit' }}
          >
            <Button
              size="small"
              variant="contained"
              disableElevation
              color="inherit"
            >
              Code
            </Button>
          </a>
        </Stack>
      </Stack>

      <Preview>
        <iframe src={solution.demoUrl} title={solution.title}></iframe>
      </Preview>
    </Paper>
  );
}

export default SolutionPreview;
