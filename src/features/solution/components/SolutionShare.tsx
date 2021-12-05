import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLocation } from 'react-router';

const HOST = 'https://webpractice-c1se21.vercel.app';

function SolutionShare() {
  const location = useLocation();

  return (
    <Paper variant="outlined" sx={{ px: 2, py: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2">Share</Typography>

        <Box>
          {/* <IconButton>
            <TwitterIcon />
          </IconButton> */}

          {/* <IconButton>
            <LinkedInIcon />
          </IconButton> */}

          <CopyToClipboard text={HOST.concat(location.pathname)}>
            <IconButton>
              <ContentCopyRoundedIcon />
            </IconButton>
          </CopyToClipboard>
        </Box>
      </Stack>
    </Paper>
  );
}

export default SolutionShare;
