import { Challenge, ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';

const challengeApi = {
  getAll(params: ListParams): Promise<ListResponse<Challenge>> {
    const url = '/challenges';
    return axiosClient.get(url, { params });
  },

  get(id: string): Promise<Challenge> {
    const url = `/challenges/${id}`;
    return axiosClient.get(url);
  },

  add(data: Challenge): Promise<Challenge> {
    const url = '/challenges';
    return axiosClient.post(url, data);
  },

  update(id: string, data: Partial<Challenge>): Promise<Challenge> {
    const url = `/challenges/${id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/challenges/${id}`;
    return axiosClient.delete(url);
  },
};

export default challengeApi;
