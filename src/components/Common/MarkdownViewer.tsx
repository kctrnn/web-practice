import { Box } from '@mui/system';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface MarkdownViewerProps {
  content: string;
}

const styles = {
  fontFamily: `'Lato', sans-serif`,
  fontWeight: 400,

  h4: { mb: 1.5 },
  ul: { pl: 2.5 },
  li: { mb: 1 },

  '& > p': { mb: 1.5 },

  strong: { fontWeight: 700 },

  code: {
    fontFamily: 'inherit',
    backgroundColor: '#ebedf0',
    borderRadius: '.4rem',
    padding: '.2rem .4rem',
    fontSize: '95%',
  },

  a: {
    fontFamily: 'inherit',
    color: 'info.main',
  },
};

export function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <Box sx={styles}>
      <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    </Box>
  );
}
