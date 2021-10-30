import {
  Box,
  Button,
  LinearProgress,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { PathSlug } from 'models';
import { getPathImage } from 'utils';

const Image = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',

  '& > img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export interface PathProgressProps {
  slug: PathSlug;
  challengeCount: number;
}

function PathProgress({ slug, challengeCount }: PathProgressProps) {
  const challengeCompleted = 4;
  const isGetBadge = challengeCompleted === challengeCount;

  return (
    <Paper variant='outlined' sx={{ p: 2 }}>
      <Image>
        <img src={getPathImage(slug)} alt={slug} />
      </Image>

      <Box my={2}>
        <Typography variant='subtitle2' mb={2}>
          Progress
        </Typography>

        <Typography
          fontSize='.75rem'
          color='grey.500'
          mb={1}
        >{`${challengeCompleted} / ${challengeCount} completed`}</Typography>

        <LinearProgress
          variant='determinate'
          value={(challengeCompleted / challengeCount) * 100}
        />
      </Box>

      <Button variant='outlined' fullWidth disabled={!isGetBadge} color='info'>
        Apply for badge
      </Button>
    </Paper>
  );
}

export default PathProgress;
