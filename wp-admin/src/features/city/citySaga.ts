import cityApi from "api/cityApi";
import { City, ListResponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCityList,
  fetchCityListFailed,
  fetchCityListSuccess,
} from "./citySlice";

function* handleFetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(fetchCityListSuccess(response));
  } catch (error) {
    yield put(fetchCityListFailed());
  }
}

function* citySaga() {
  yield takeLatest(fetchCityList.type, handleFetchCityList);
}

export default citySaga;
