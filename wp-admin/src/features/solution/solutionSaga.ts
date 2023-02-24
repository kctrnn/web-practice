import { PayloadAction } from '@reduxjs/toolkit';
import solutionApi from 'api/solutionApi';
import { ListParams, ListResponse, Solution } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSolutionList,
  fetchSolutionListFailed,
  fetchSolutionListSuccess,
  setFilter,
  setFilterDebounce,
} from './solutionSlice';

function* handleFetchSolutionList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Solution> = yield call(
      solutionApi.getAll,
      action.payload
    );

    yield put(fetchSolutionListSuccess(response));
  } catch (error) {
    yield put(fetchSolutionListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(setFilter(action.payload));
}

function* solutionSaga() {
  yield takeLatest(fetchSolutionList.type, handleFetchSolutionList);
  yield debounce(500, setFilterDebounce.type, handleSearchDebounce);
}

export default solutionSaga;
