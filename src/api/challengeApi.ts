import { Challenge, ParamList } from 'models';
import axiosClient from './axiosClient';

const challengeApi = {
  getAll(params: ParamList): Promise<Array<Challenge>> {
    const url = '/challenges';
    return axiosClient.get(url, { params });
  },

  get(id: string): Promise<Challenge> {
    const url = `/challenges${id}`;
    return axiosClient.get(url);
  },
};

export default challengeApi;
