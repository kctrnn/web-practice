import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { Admin } from 'models';
import { toast } from 'react-toastify';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import {
  login,
  loginFailed,
  LoginPayload,
  loginSuccess,
  logout,
} from './authSlice';

export interface LoginResponse {
  jwt: string;
  user: Admin;
}

// Fake login
function* handleFakeLogin(payload: LoginPayload) {
  yield delay(1000);

  if (payload.password === process.env.REACT_APP_PASSWORD) {
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      loginSuccess({
        id: '01',
        name: 'Admin',
      })
    );

    // Show toast success
    toast.success('🚀 Login successfully');

    // redirect to admin page
    yield put(push('/admin/dashboard'));
  } else {
    toast.error('⚠️ Failed to login');
    yield put(loginFailed());
  }
}

function* handleLogout() {
  yield delay(1000);
  localStorage.removeItem('access_token');

  toast.success('😢 Logout successfully');

  // redirect to login page
  yield put(push('/login'));
}

function* authSaga() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(handleFakeLogin, action.payload);
    } else {
      yield take(logout.type);
      yield call(handleLogout);
    }
  }
}

export default authSaga;
