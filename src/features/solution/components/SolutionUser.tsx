import { Avatar, Paper, Stack, Typography } from '@mui/material';
import userApi from 'api/userApi';
import { useAppSelector } from 'app/hooks';
import { totalReputation } from 'features/dashboard/dashboardSelector';
import { Solution, User } from 'models';
import { useEffect, useState } from 'react';

export interface SolutionUserProps {
  solution: Solution;
}

function SolutionUser({ solution }: SolutionUserProps) {
  const [user, setUser] = useState<User>();
  const totalRepu = useAppSelector(totalReputation);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await userApi.get(solution.userId);
      setUser(response);
    };

    fetchUser();
  }, [solution.userId]);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" spacing={2}>
        <Avatar variant="rounded" alt={user?.name} src={``} />

        <Stack justifyContent="space-between">
          <Typography variant="subtitle2">{user?.name || 'KC'}</Typography>

          <Typography variant="body2" color="text.secondary" fontSize=".75rem">
            {totalRepu} reputations
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default SolutionUser;
