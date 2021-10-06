import challengeApi from 'api/challengeApi';
import { Challenge } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchChallengeList,
  fetchChallengeListFailed,
  fetchChallengeListSuccess,
} from './challengeSlice';

function* handleFetchChallengeList() {
  try {
    const response: Array<Challenge> = yield call(challengeApi.getAll);
    yield put(fetchChallengeListSuccess(response));
  } catch (error) {
    yield put(fetchChallengeListFailed());
  }
}

function* challengeSaga() {
  yield takeLatest(fetchChallengeList.type, handleFetchChallengeList);
}

export default challengeSaga;
