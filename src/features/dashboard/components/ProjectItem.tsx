import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { Stack, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export interface ProjectItemProps {
  title: string;
  imgUrl: string;
  time?: string;
  votes?: number;
  feedbacks?: number;
}

const Item = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(3),
  color: theme.palette.text.secondary,
  fontSize: '.875rem',

  svg: {
    verticalAlign: 'middle',
    fontSize: '.875rem',
  },
}));

function ProjectItem({
  title,
  time,
  imgUrl,
  votes,
  feedbacks,
}: ProjectItemProps) {
  return (
    <Box>
      <Stack direction="row" spacing={3}>
        <img src={imgUrl} alt="" width={90} />

        <Stack justifyContent="space-between">
          <Typography variant="body1" fontWeight={500}>
            {title}
          </Typography>

          {time && (
            <Typography variant="body2" color="text.secondary">
              {time}
            </Typography>
          )}

          {!time && (
            <Stack direction="row">
              <Item>
                <ThumbUpAltRoundedIcon /> {votes}
              </Item>

              <Item>
                <ChatBubbleRoundedIcon /> {feedbacks}
              </Item>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default ProjectItem;
