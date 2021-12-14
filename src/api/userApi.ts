import { LoginPayload, SignupPayload, User } from 'models';
import axiosClient from './axiosClient';

export interface AuthResponse {
  accessToken: string;
}

const userApi = {
  login(data: LoginPayload): Promise<AuthResponse> {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },

  signup(data: SignupPayload): Promise<AuthResponse> {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },

  getMe(): Promise<User> {
    const url = '/profile';
    return axiosClient.get(url);
  },

  get(id: string): Promise<User> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  update(id: string, data: User): Promise<any> {
    const url = `/users/${id}`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
