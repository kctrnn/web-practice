import { Grid, Paper, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export interface SolutionInfoProps {
  challengeImage: string;
  challengeName: string;
}

const Image = styled(Box)({
  height: '100%',

  '& > img': {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '.25rem',
  },
});

const List = styled('ul')({
  fontFamily: `'Lato', sans-serif`,
  listStyle: 'none',
  '& > li': { marginBottom: '.5rem' },
});

function SolutionInfo({ challengeImage, challengeName }: SolutionInfoProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5} lg={4}>
          <Image>
            <img src={challengeImage} alt="" />
          </Image>
        </Grid>

        <Grid item xs={12} md={7} lg={8}>
          <Box>
            <Typography variant="h6" mb={2}>
              {challengeName}
            </Typography>

            <List>
              <li>🤙🏻 Make sure you fulfill all the user stories</li>
              <li>🤙🏻 Includes both demo URL and repository URL</li>
              <li>🤙🏻 Try to explain your approach briefly</li>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SolutionInfo;
