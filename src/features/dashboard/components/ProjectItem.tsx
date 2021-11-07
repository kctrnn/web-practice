import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

export interface ProjectItemProps {
  title: string;
  time: string;
  imgUrl: string;
}

function ProjectItem({ title, time, imgUrl }: ProjectItemProps) {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <img src={imgUrl} alt="" width={90} />

        <Stack justifyContent="space-between">
          <Typography variant="body1" fontWeight={500}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {time}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ProjectItem;
