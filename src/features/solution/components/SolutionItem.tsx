import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Avatar, Button, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import challengeApi from 'api/challengeApi';
import userApi from 'api/userApi';
import { useAppSelector } from 'app/hooks';
import { ImageResponsive } from 'components/Common';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { selectCurrentUser } from 'features/auth/authSlice';
import { Challenge, Solution, User } from 'models';
import { ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

dayjs.extend(relativeTime);

export interface SolutionItemProps {
  solution: Solution;
}

export interface ButtonStyledProps {
  children: ReactNode;
  isLiked: boolean;
  startIcon?: ReactNode;
}

const ButtonStyled = ({ children, startIcon, isLiked }: ButtonStyledProps) => {
  return (
    <Button
      fullWidth
      variant="contained"
      size="small"
      color={isLiked ? 'primary' : 'inherit'}
      disableElevation
      startIcon={startIcon}
      sx={{
        pointerEvents: 'none',
        textTransform: 'capitalize',
        '.MuiButton-startIcon > svg': {
          verticalAlign: 'middle',
          fontSize: '.75rem',
        },
      }}
    >
      {children}
    </Button>
  );
};

function SolutionItem({ solution }: SolutionItemProps) {
  const history = useHistory();

  const [challenge, setChallenge] = useState<Challenge>();
  const [user, setUser] = useState<User>();

  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const fetchChallenge = async () => {
      const response = await challengeApi.get(solution.challengeId);
      setChallenge(response);
    };

    fetchChallenge();
  }, [solution.challengeId]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await userApi.get(solution.userId);
      setUser(response);
    };

    fetchUser();
  }, [solution.userId]);

  const handleClick = () => {
    history.push(`/solutions/${solution._id}`);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography
        fontSize="1.125rem"
        fontWeight={500}
        sx={{ mb: 4, ':hover': { cursor: 'pointer' } }}
        onClick={handleClick}
      >
        {solution.title}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Avatar variant="rounded" alt={user?.name} src={``} />

        <Stack justifyContent="space-between">
          <Typography variant="subtitle2">{user?.name}</Typography>

          <Typography color="text.secondary" fontSize=".75rem">
            {dayjs(solution.submittedAt).fromNow()}
          </Typography>
        </Stack>
      </Stack>

      <Box
        sx={{ my: 4, ':hover': { cursor: 'pointer' } }}
        onClick={handleClick}
      >
        <ImageResponsive src={challenge?.thumbnailImage} alt="" />
      </Box>

      <Stack direction="row" spacing={2}>
        <ButtonStyled
          isLiked={solution.votes.includes(currentUser?._id || '')}
          startIcon={<ThumbUpAltRoundedIcon />}
        >
          {solution.votes.length}
        </ButtonStyled>

        <ButtonStyled isLiked={false} startIcon={<ChatBubbleRoundedIcon />}>
          {solution.feedbacks.length}
        </ButtonStyled>
      </Stack>
    </Paper>
  );
}

export default SolutionItem;
