import { PayloadAction } from '@reduxjs/toolkit';
import challengeApi from 'api/challengeApi';
import { Challenge, PathSlug } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchChallengeList,
  fetchChallengeListFailed,
  fetchChallengeListSuccess,
} from './challengeSlice';

function* handleFetchChallengeList(action: PayloadAction<PathSlug>) {
  try {
    const response: Array<Challenge> = yield call(
      challengeApi.getAll,
      action.payload
    );

    yield put(fetchChallengeListSuccess(response));
  } catch (error) {
    yield put(fetchChallengeListFailed());
  }
}

function* challengeSaga() {
  yield takeLatest(fetchChallengeList.type, handleFetchChallengeList);
}

export default challengeSaga;
