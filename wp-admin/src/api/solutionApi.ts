import { ListParams, ListResponse, Solution } from 'models';
import axiosClient from './axiosClient';

const solutionApi = {
  getAll(params?: ListParams): Promise<ListResponse<Solution>> {
    const url = '/solutions';
    return axiosClient.get(url, { params });
  },

  get(id: string): Promise<Solution> {
    const url = `/solutions/${id}`;
    return axiosClient.get(url);
  },

  add(data: Solution): Promise<Solution> {
    const url = '/solutions';
    return axiosClient.post(url, data);
  },

  update(id: string, data: Partial<Solution>): Promise<Solution> {
    const url = `/solutions/${id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/solutions/${id}`;
    return axiosClient.delete(url);
  },
};

export default solutionApi;
