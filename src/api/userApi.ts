import { LoginPayload, SignupPayload, User } from 'models';

export interface AuthResponse {
  jwt: string;
  user: User;
}

const userApi = {
  login(data: LoginPayload): Promise<AuthResponse> {
    // const url = '/auth/login';
    // return axiosClient.post(url, data);

    // fake response because APIs is not ready
    const fakeData: AuthResponse = {
      jwt: 'fake_token',
      user: {
        id: 'fakeId213',
        username: 'jason',
        name: 'Jason Legend',
        email: data.email,
        avatarUrl: '',
        githubUrl: '',
      },
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeData);
      }, 2000);
    });
  },

  signup(data: SignupPayload): Promise<AuthResponse> {
    // const url = '/auth/register';
    // return axiosClient.post(url, data);

    // fake response because APIs is not ready
    const fakeData: AuthResponse = {
      jwt: 'fake_token',
      user: {
        id: 'fakeId213',
        username: data.username,
        email: data.email,
        name: data.name,
        avatarUrl: '',
        githubUrl: '',
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
