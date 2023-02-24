import { Box } from '@mui/system';
import { Feedback } from 'models';

export interface SolutionFeedbackListProps {
  feedbackList: Feedback[];
}

export default function SolutionFeedbackList({
  feedbackList,
}: SolutionFeedbackListProps) {
  return <Box>FEEDBACK LIST</Box>;
}
