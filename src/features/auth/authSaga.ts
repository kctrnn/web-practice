import { call, delay, fork, put, race, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import userApi, { AuthResponse } from 'api/userApi';
import { LoginPayload, SignupPayload } from 'models';
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
    const { jwt, user }: AuthResponse = yield call(userApi.login, payload);

    localStorage.setItem('access_token', jwt);
    yield put(loginSuccess(user));

    // redirect to
  } catch (error) {
    yield put(loginFailed());
  }
}

function* handleRegister(payload: SignupPayload) {
  try {
    const { jwt, user }: AuthResponse = yield call(userApi.signup, payload);

    localStorage.setItem('access_token', jwt);
    yield put(signupSuccess(user));

    // redirect to
  } catch (error) {
    yield put(signupFailed());
  }
}

function* handleLogout() {
  yield delay(1000);
  localStorage.removeItem('access_token');

  // redirect to
}

function* watchAuthFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

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
