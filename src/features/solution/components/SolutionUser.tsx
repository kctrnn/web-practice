import { Avatar, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import { Solution, User } from 'models';
import { useEffect, useState } from 'react';

export interface SolutionUserProps {
  solution: Solution;
}

function SolutionUser({ solution }: SolutionUserProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userId = solution.userId;

    const fetchUserById = async () => {
      // const response = await userApi.get(userId)
      // setUser(response)
    };

    fetchUserById();
  }, [solution.userId]);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" spacing={2}>
        <Avatar
          variant="rounded"
          alt={user?.name}
          src={`https://avatars.githubusercontent.com/u/90959206?v=4`}
        />

        <Stack justifyContent="space-between">
          <Typography variant="subtitle2">Kim Chan</Typography>

          <Typography variant="body2" color="text.secondary" fontSize=".75rem">
            213 reputations
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default SolutionUser;
