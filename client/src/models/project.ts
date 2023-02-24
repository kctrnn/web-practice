import { Challenge } from 'models';

export interface Project extends Challenge {
  solutionId?: string;
  createdAt?: number;

  voteLength?: number;
  feedbackLength?: number;
}
