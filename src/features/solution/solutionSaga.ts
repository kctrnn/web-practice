import { PayloadAction } from '@reduxjs/toolkit';
import solutionApi, { SolutionFilter } from 'api/solutionApi';
import { Solution } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSolutionList,
  fetchSolutionListFailed,
  fetchSolutionListSuccess,
} from './solutionSlice';

function* handleFetchSolutionList(action: PayloadAction<SolutionFilter>) {
  try {
    const response: Array<Solution> = yield call(
      solutionApi.getAll,
      action.payload
    );

    yield put(fetchSolutionListSuccess(response));
  } catch (error) {
    yield put(fetchSolutionListFailed());
  }
}

function* solutionSaga() {
  yield takeLatest(fetchSolutionList.type, handleFetchSolutionList);
}

export default solutionSaga;
