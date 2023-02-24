import authSaga from 'features/auth/authSaga';
import challengeSaga from 'features/challenge/challengeSaga';
import citySaga from 'features/city/citySaga';
import counterSaga from 'features/counter/counterSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import solutionSaga from 'features/solution/solutionSaga';
import studentSaga from 'features/student/studentSaga';
import userSaga from 'features/user/userSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    counterSaga(),
    authSaga(),
    studentSaga(),
    citySaga(),
    dashboardSaga(),
    challengeSaga(),
    userSaga(),
    solutionSaga(),
  ]);
}
