import { Solution } from 'models';
import axiosClient from './axiosClient';

export interface SolutionFilter {
  userId?: string;
}

const solutionApi = {
  getAll(params: SolutionFilter) {
    const url = '/solutions';
    return axiosClient.get(url, { params });
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
