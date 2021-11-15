import { Paper, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { MarkdownViewer } from 'components/Common';
import { PathSlug } from 'models';
import { getPathIntro, getPathName, getPathRule } from 'utils';
import PathDescription from './PathDescription';

const Rule = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,

  border: `1px solid #ffda4d`,
  backgroundColor: 'rgba(232, 172, 0, 0.03)',
}));

function PathIntro({ pathSlug }: { pathSlug: PathSlug }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography component="h1" variant="h5" fontWeight={500}>
        {getPathName(pathSlug)}
      </Typography>

      <Typography
        mt={2}
        mb={4}
        fontFamily={`'Lato', sans-serif`}
        fontSize="1.125rem"
        color="text.secondary"
      >
        {getPathIntro(pathSlug)}
      </Typography>

      <PathDescription pathSlug={pathSlug} />

      <Rule>
        <MarkdownViewer content={getPathRule(pathSlug) as string} />
      </Rule>
    </Paper>
  );
}

export default PathIntro;
