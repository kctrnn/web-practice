import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

function SolutionShare() {
  return (
    <Paper variant="outlined" sx={{ px: 2, py: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2">Share</Typography>

        <Box>
          {/* <IconButton>
            <TwitterIcon />
          </IconButton> */}

          <IconButton>
            <LinkedInIcon />
          </IconButton>

          <IconButton>
            <ContentCopyRoundedIcon />
          </IconButton>
        </Box>
      </Stack>
    </Paper>
  );
}

export default SolutionShare;
