import authSaga from 'features/auth/authSaga';
import challengeSaga from 'features/challenge/challengeSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import solutionSaga from 'features/solution/solutionSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), challengeSaga(), solutionSaga(), dashboardSaga()]);
}
