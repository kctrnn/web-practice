import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { selectDashboardStatistics } from '../dashboardSlice';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';

const StackRowDirection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
}));

const Reputation = styled(Typography)(({ theme }) => ({
  span: {
    fontSize: '1.8rem',
    color: theme.palette.text.primary,
  },
}));

function DashboardOverview() {
  const statistics = useAppSelector(selectDashboardStatistics);

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, borderColor: 'rgba(186, 104, 200, 0.5)' }}
    >
      <StackRowDirection mb={1}>
        <Heading>Statistics</Heading>
        <IconButton color="secondary">
          <ShowChartRoundedIcon />
        </IconButton>
      </StackRowDirection>

      <Reputation color="text.secondary" variant="body1" mb={2}>
        <span>213</span> reputations
      </Reputation>

      <StackRowDirection mb={1}>
        <Typography variant="body2" color="text.secondary">
          Votes
        </Typography>
        <Typography variant="body2">{statistics.totalVote}</Typography>
      </StackRowDirection>

      <StackRowDirection mb={1}>
        <Typography variant="body2" color="text.secondary">
          Solutions
        </Typography>
        <Typography variant="body2">{statistics.totalSolution}</Typography>
      </StackRowDirection>

      <StackRowDirection mb={1}>
        <Typography variant="body2" color="text.secondary">
          Badges
        </Typography>
        <Typography variant="body2">{statistics.totalBadge}</Typography>
      </StackRowDirection>
    </Paper>
  );
}

export default DashboardOverview;
