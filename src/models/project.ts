import { Challenge } from 'models';

export interface Project extends Challenge {
  createdAt?: number;
  voteLength?: number;
  feedbackLength?: number;
}
