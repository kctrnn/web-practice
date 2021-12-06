import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Button, Paper, Stack } from '@mui/material';
import { Box, styled } from '@mui/system';
import challengeApi from 'api/challengeApi';
import { useAppSelector } from 'app/hooks';
import { ImageResponsive } from 'components/Common';
import { TOKEN } from 'constants/index';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Challenge, Solution } from 'models';
import { useEffect, useState } from 'react';

const ButtonStyled = styled(Button)(() => ({
  textTransform: 'capitalize',

  '.MuiButton-startIcon > svg': {
    verticalAlign: 'middle',
    fontSize: '.75rem',
  },
}));

export interface SolutionThumbnailProps {
  solution: Solution;
  onVoteClick: (userId: string) => void;
  onFeedbackSubmit: (userId: string, message: string) => void;
}

function SolutionThumbnail({
  solution,
  onFeedbackSubmit,
  onVoteClick,
}: SolutionThumbnailProps) {
  const [challenge, setChallenge] = useState<Challenge>();
  const user = useAppSelector(selectCurrentUser);

  const isLoggedIn = Boolean(localStorage.getItem(TOKEN));
  const isMine = user._id === solution.userId;
  const isLiked = solution.votes.includes(user?._id || '');

  useEffect(() => {
    const fetchChallengeById = async () => {
      const { challengeId } = solution;
      const response = await challengeApi.get(challengeId);
      setChallenge(response);
    };

    fetchChallengeById();
  }, [solution]);
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box>
          <ImageResponsive src={challenge?.thumbnailImage} alt="" />
        </Box>

        {!isMine && (
          <ButtonStyled
            variant="contained"
            size="small"
            color={isLiked ? 'primary' : 'inherit'}
            disableElevation
            disabled={!isLoggedIn}
            fullWidth
            startIcon={<ThumbUpAltRoundedIcon />}
            onClick={() => onVoteClick(user._id || '')}
          >
            Vote
          </ButtonStyled>
        )}

        {isMine && (
          <Button
            fullWidth
            size="small"
            variant="contained"
            disableElevation
            color="primary"
            sx={{ textTransform: 'capitalize' }}
          >
            Edit
          </Button>
        )}

        {!isMine && (
          <ButtonStyled
            variant="contained"
            size="small"
            color="inherit"
            disableElevation
            disabled={!isLoggedIn}
            fullWidth
            startIcon={<ChatBubbleRoundedIcon />}
          >
            Feedback
          </ButtonStyled>
        )}
      </Stack>
    </Paper>
  );
}

export default SolutionThumbnail;
