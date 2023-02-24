import { PayloadAction } from '@reduxjs/toolkit';
import challengeApi from 'api/challengeApi';
import { Challenge, ListParams, ListResponse } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import {
  fetchChallengeList,
  fetchChallengeListFailed,
  fetchChallengeListSuccess,
  setFilter,
  setFilterDebounce,
} from './challengeSlice';

function* handleFetchChallengeList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Challenge> = yield call(
      challengeApi.getAll,
      action.payload
    );

    yield put(fetchChallengeListSuccess(response));
  } catch (error) {
    yield put(fetchChallengeListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(setFilter(action.payload));
}

function* challengeSaga() {
  yield takeLatest(fetchChallengeList.type, handleFetchChallengeList);
  yield debounce(500, setFilterDebounce.type, handleSearchDebounce);
}

export default challengeSaga;
