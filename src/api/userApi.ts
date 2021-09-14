import { User } from 'models';
import axiosClient from './axiosClient';

const userApi = {
  login(data: User) {
    // const url = '/auth/login';
    // return axiosClient.post(url, data);

    // fake response because APIs is not ready
    const fakeData = {
      jwt: 'fake_token',
      user: {
        userId: 'fakeId213',
        username: 'jason',
        name: 'Jason Legend',
        email: data.email,
      },
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeData);
      }, 2000);
    });
  },

  signup(data: User) {
    // const url = '/auth/register';
    // return axiosClient.post(url, data);

    // fake response because APIs is not ready
    const fakeData = {
      jwt: 'fake_token',
      user: {
        userId: 'fakeId213',
        username: data.username,
        email: data.email,
        name: data.name,
      },
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeData);
      }, 2000);
    });
  },
};

export default userApi;
