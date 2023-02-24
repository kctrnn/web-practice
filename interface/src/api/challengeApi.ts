import { Challenge, PathSlug } from 'models';
import axiosClient from './axiosClient';

const challengeApi = {
  getAll(pathSlug?: PathSlug): Promise<Challenge[]> {
    const url = '/challenges';
    return axiosClient.get(url, { params: { pathSlug } });
  },

  get(id: string): Promise<Challenge> {
    const url = `/challenges/${id}`;
    return axiosClient.get(url);
  },
};

export default challengeApi;
