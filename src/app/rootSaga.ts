import authSaga from 'features/auth/authSaga';
import challengeSaga from 'features/challenge/challengeSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), challengeSaga()]);
}
