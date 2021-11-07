import { Challenge } from 'models';

export interface Project extends Challenge {
  createdAt?: number;
  upVoteLength?: number;
  feedbackLength?: number;
}
