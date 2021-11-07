export interface Solution {
  _id?: string;

  title: string;
  description: string;

  demoUrl: string;
  repoUrl: string;
  feedbackRequest: string;

  feedbacks: string[];
  votes: string[];

  challengeId: string;
  userId: string;

  createdAt: number;
  updatedAt: number;

  submitted: boolean;
  submittedAt: number;
}
