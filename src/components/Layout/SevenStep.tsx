import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const List = styled('ul')(({ theme }) => ({
  paddingLeft: '1.5rem',

  li: {
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.875rem',
    },
  },
}));

export function SevenStep() {
  return (
    <Box sx={{ maxWidth: '50rem', m: '0 auto', pt: 4 }}>
      <Box>
        <Typography
          sx={{ span: { color: '#f7542e' } }}
          fontSize="1.5rem"
          fontWeight={700}
          mb={1}
        >
          Welcome to <span>Web Practice</span>
        </Typography>

        <Typography mb={4} sx={{ fontSize: { xs: '.875rem', sm: '1rem' } }}>
          Here are 7 general steps to complete the challenge
        </Typography>
      </Box>

      <List>
        <li>
          <b>Step 1:</b> Create a new repository on github
        </li>
        <li>
          <b>Step 2:</b> Copy resources, README.md to your repository
        </li>
        <li>
          <b>Step 3:</b> Login to Figma to checkout font, color, spacing,..
        </li>
        <li>
          <b>Step 4:</b> Complete all user stories
        </li>
        <li>
          <b>Step 5:</b> Update README.md
        </li>
        <li>
          <b>Step 6:</b> Deploy your app and submit your solution
        </li>
        <li>
          <b>Step 7:</b> Share your solution on Twitter and other platforms to
          ask for feedback
        </li>
      </List>
    </Box>
  );
}
