export interface Solution {
  id?: string;

  title: string;
  description: string;

  demoUrl: string;
  repoUrl: string;
  feedbackRequest: string;

  feedbacks: Feedback[];
  votes: string[];

  challengeId: string;
  userId: string;

  createdAt: number;
  updatedAt: number;

  submitted: boolean;
  submittedAt: number;
}

export interface Feedback {
  userId: string;
  message: string;
}
