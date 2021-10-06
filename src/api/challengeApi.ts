import { Challenge } from 'models';
import { FAKE_CHALLENGE_LIST } from './fake-data';

const challengeApi = {
  getAll(): Promise<Array<Challenge>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(FAKE_CHALLENGE_LIST);
      }, 2000);
    });
  },

  get(id: string) {},
};

export default challengeApi;
