import { ListParams, ListResponse, User } from 'models';
import axiosClient from './axiosClient';

const userApi = {
  getAll(params: ListParams): Promise<ListResponse<User>> {
    const url = '/users';
    return axiosClient.get(url, { params });
  },

  get(id: string): Promise<User> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  add(data: User): Promise<User> {
    const url = '/users';
    return axiosClient.post(url, data);
  },

  update(id: string, data: Partial<User>): Promise<User> {
    const url = `/users/${id}`;
    return axiosClient.patch(url, data);
  },

  remove(id: string): Promise<any> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
