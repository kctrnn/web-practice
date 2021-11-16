import { Button, Chip, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Solution } from 'models';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export interface SolutionHeaderProps {
  solution: Solution;
}

function SolutionHeader({ solution }: SolutionHeaderProps) {
  return (
    <Box sx={{ mb: 4, pr: { xs: 2, md: 4 } }}>
      <Typography component="h1" variant="h5" fontWeight={500} mb={2}>
        {solution?.title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Chip label="submitted" clickable size="small" color="default" />

        <Typography variant="body2" color="text.secondary">
          {dayjs(solution.submittedAt).fromNow()}
        </Typography>
      </Stack>
    </Box>
  );
}

export default SolutionHeader;
