import { call, delay, fork, put, race, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import userApi, { AuthResponse } from 'api/userApi';
import { push } from 'connected-react-router';
import { TOKEN, USER } from 'constants/index';
import { LoginPayload, SignupPayload, User } from 'models';
import { toast } from 'react-toastify';
import {
  login,
  loginFailed,
  loginSuccess,
  logout,
  signup,
  signupFailed,
  signupSuccess,
} from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    const { accessToken }: AuthResponse = yield call(userApi.login, payload);
    localStorage.setItem(TOKEN, accessToken);

    const user: User = yield call(userApi.getMe);
    localStorage.setItem(USER, JSON.stringify(user));
    yield put(loginSuccess(user));

    // Show toast success
    toast.success('Login successfully', {
      icon: '🚀',
    });

    // redirect to home page
    yield put(push('/'));
  } catch (error: any) {
    yield put(loginFailed());
    toast.error(
      error.response.data?.message ||
        error.response.data?.error ||
        'Failed to login'
    );
  }
}

function* handleRegister(payload: SignupPayload) {
  try {
    const { accessToken }: AuthResponse = yield call(userApi.signup, payload);
    localStorage.setItem(TOKEN, accessToken);

    const user: User = yield call(userApi.getMe);
    localStorage.setItem(USER, JSON.stringify(user));
    yield put(signupSuccess(user));

    // Show toast success
    toast.success('Register successfully', {
      icon: '🎉',
    });

    // redirect to home page
    yield put(push('/'));
  } catch (error: any) {
    yield put(signupFailed());
    toast.error(
      error.response.data?.message ||
        error.response.data?.error ||
        'Failed to register'
    );
  }
}

function* handleLogout() {
  yield delay(1000);
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER);

  // Show toast success
  toast.success('Logout successfully', {
    icon: '😢',
  });

  // redirect to login page
  yield put(push('/login'));
}

function* watchAuthFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem(TOKEN));

    if (!isLoggedIn) {
      const result: [
        PayloadAction<LoginPayload>,
        PayloadAction<SignupPayload>
      ] = yield race([take(login.type), take(signup.type)]);

      const [loginAction, signupAction] = result;

      if (loginAction) {
        yield fork(handleLogin, loginAction.payload);
      } else {
        yield fork(handleRegister, signupAction.payload);
      }
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchAuthFlow);
}
