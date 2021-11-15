import { Box, styled } from '@mui/system';
import { MarkdownViewer } from 'components/Common';
import { PathSlug } from 'models';
import Typewriter from 'typewriter-effect';
import { getPathDesc } from 'utils';

const Description = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid #bba9fb`,
  backgroundColor: 'rgba(80,47,196,0.03)',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TypewriterBox = styled(Box)(({ theme }) => ({
  flex: 1,
  paddingLeft: theme.spacing(2),

  fontSize: '1.5rem',
  fontFamily: `'Lobster', cursive`,
}));

function PathDescription({ pathSlug }: { pathSlug: PathSlug }) {
  return (
    <Description>
      <TypewriterBox>
        <Typewriter
          options={{
            strings: ['For those who want to'],
            autoStart: true,
            loop: true,
          }}
        />
      </TypewriterBox>

      <Box width="60%">
        <MarkdownViewer content={getPathDesc(pathSlug) as string} />
      </Box>
    </Description>
  );
}

export default PathDescription;
