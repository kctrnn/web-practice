import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListParams, ListResponse, Student } from "models";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import {
  fetchStudentList,
  fetchStudentListFailed,
  fetchStudentListSuccess,
  setFilter,
  setFilterDebounce,
} from "./studentSlice";

function* handleFetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(
      studentApi.getAll,
      action.payload
    );
    yield put(fetchStudentListSuccess(response));
  } catch (error) {
    yield put(fetchStudentListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(setFilter(action.payload));
}

function* studentSaga() {
  yield takeLatest(fetchStudentList.type, handleFetchStudentList);

  yield debounce(500, setFilterDebounce.type, handleSearchDebounce);
}

export default studentSaga;
