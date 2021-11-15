import { Paper } from '@mui/material';
import { MarkdownViewer } from 'components/Common';

const styles = {
  p: 2,
  borderLeft: '4px solid #f77c5f',
};

export interface SubmitInfoProps {
  content: string;
}

function SubmitInfo({ content }: SubmitInfoProps) {
  return (
    <Paper variant="outlined" sx={styles}>
      <MarkdownViewer content={content} />
    </Paper>
  );
}

export default SubmitInfo;
