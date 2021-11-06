import { Solution } from 'models';
import axiosClient from './axiosClient';

const solutionApi = {
  getAll(userId?: string) {
    const url = '/solutions';
    return axiosClient.get(url, { params: { userId } });
  },

  get(solutionId: string) {
    const url = `/solutions/${solutionId}`;
    return axiosClient.get(url);
  },

  add(data: Solution) {
    const url = '/solutions';
    return axiosClient.post(url, data);
  },
};

export default solutionApi;
