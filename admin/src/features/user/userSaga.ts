import { PayloadAction } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import { ListParams, ListResponse, User } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUserList,
  fetchUserListFailed,
  fetchUserListSuccess,
  setFilter,
  setFilterDebounce,
} from './userSlice';

function* handleFetchUserList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<User> = yield call(
      userApi.getAll,
      action.payload
    );

    yield put(fetchUserListSuccess(response));
  } catch (error) {
    yield put(fetchUserListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(setFilter(action.payload));
}

function* userSaga() {
  yield takeLatest(fetchUserList.type, handleFetchUserList);
  yield debounce(500, setFilterDebounce.type, handleSearchDebounce);
}

export default userSaga;
