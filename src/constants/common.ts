import Step1 from '../assets/images/step1.svg';
import Step2 from '../assets/images/step2.svg';
import Step3 from '../assets/images/step3.svg';

export const TOKEN = 'access_token';
export const USER = 'user';

export const CAROUSEL_LIST = [
  {
    imgUrl: Step1,
    heading: 'Step 1: Choose a challenge',
    description:
      'Choose a challenge, read the description carefully. Paths help you navigate, and you can earn a badge after completing all challenges in the path',
  },
  {
    imgUrl: Step2,
    heading: 'Step 2: Work by yourself or with a team',
    description:
      'All challenges can be completed by one person, but teamwork is important at workplaces. If the challenge is too big for you, ask a friend to join',
  },
  {
    imgUrl: Step3,
    heading: 'Step 3: Submit solution and give feedback',
    description:
      'When you complete the challenge, submit your solution. You can also check if there is an existing solution and give them some feedback',
  },
];

export const CHALLENGE_INTRO =
  'Once you completed, submit your solutions by providing **URLs for both GitHub repository and live app** on any hosting platform ([5 Free Hosting Platform](https://dev.to/nghiemthu/top-5-free-hosting-sites-with-instructions-10h)) and explain briefly what you have done.\n\nAs long as you fulfill all the user stories, you can give your personal touches by adding transition, using your own images, changing colors,...\n\nRemember to put your name on the footer to prevent other from submitting your solutions.\n\nYou can check others’ solutions and give them feedbacks.';
