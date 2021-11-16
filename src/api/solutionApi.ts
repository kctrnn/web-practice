import { PathSlug, Solution } from 'models';
import axiosClient from './axiosClient';

export interface SolutionFilter {
  userId?: string;
  pathSlug?: PathSlug;
}

const solutionApi = {
  getAll(params: SolutionFilter): Promise<Solution[]> {
    const url = '/solutions';
    return axiosClient.get(url, { params });
  },

  get(solutionId: string): Promise<Solution> {
    const url = `/solutions/${solutionId}`;
    return axiosClient.get(url);
  },

  add(data: Solution): Promise<any> {
    const url = '/solutions';
    return axiosClient.post(url, data);
  },
};

export default solutionApi;
