import { Avatar, Stack, Typography } from '@mui/material';
import userApi from 'api/userApi';
import { Feedback, User } from 'models';
import { useEffect, useState } from 'react';

export interface SolutionFeedbackItemProps {
  feedback: Feedback;
}

function SolutionFeedbackItem({ feedback }: SolutionFeedbackItemProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const response = await userApi.get(feedback.userId);
      setUser(response);
    })();
  }, [feedback.userId]);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar variant="rounded" alt={user?.name} src={user?.avatarUrl} />

      <Stack justifyContent="space-between">
        <Typography variant="subtitle2">{user?.name}</Typography>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontSize=".75rem"
        >
          {feedback.message}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default SolutionFeedbackItem;
