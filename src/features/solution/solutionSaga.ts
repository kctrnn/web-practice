import { PayloadAction } from '@reduxjs/toolkit';
import challengeApi from 'api/challengeApi';
import solutionApi, { SolutionFilter } from 'api/solutionApi';
import { Challenge, Solution } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSolutionList,
  fetchSolutionListFailed,
  fetchSolutionListSuccess,
} from './solutionSlice';

function* handleFetchSolutionList(action: PayloadAction<SolutionFilter>) {
  try {
    const filter = action.payload;
    const response: Array<Solution> = yield call(solutionApi.getAll, filter);

    if (!filter.pathSlug) {
      yield put(fetchSolutionListSuccess(response));
    } else {
      const callList = response.map((solution) =>
        call(challengeApi.get, solution.challengeId)
      );

      const challenges: Challenge[] = yield all(callList);

      const filterSolutionList = response.filter((solution) => {
        const challenge = challenges.find(
          (challenge) => challenge._id === solution.challengeId
        );
        return challenge?.pathSlug === filter.pathSlug;
      });

      yield put(fetchSolutionListSuccess(filterSolutionList));
    }
  } catch (error) {
    yield put(fetchSolutionListFailed());
  }
}

function* solutionSaga() {
  yield takeLatest(fetchSolutionList.type, handleFetchSolutionList);
}

export default solutionSaga;
