import challengeApi from 'api/challengeApi';
import solutionApi from 'api/solutionApi';
import userApi from 'api/userApi';
import { Challenge, Solution, User } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  ChallengeByPath,
  fetchDashboardData,
  fetchDashboardDataFailed,
  fetchDashboardDataSuccess,
  setChallengeByPathList,
  setTopUserWithSolution,
  UserWithSolution,
} from './dashboardSlice';

function* fetchChallengeByPath() {
  const [
    responsiveChallengeList,
    frontendChallengeList,
    fullstackChallengeList,
  ]: Array<Challenge[]> = yield all([
    call(challengeApi.getAll, { pathSlug: 'responsive-web-developer' }),
    call(challengeApi.getAll, { pathSlug: 'front-end-developer' }),
    call(challengeApi.getAll, { pathSlug: 'full-stack-developer' }),
  ]);

  const challengeByPathList: ChallengeByPath[] = [
    { pathName: 'Responsive web developer', list: responsiveChallengeList },
    { pathName: 'Frontend developer', list: frontendChallengeList },
    { pathName: 'Fullstack developer', list: fullstackChallengeList },
  ];

  yield put(setChallengeByPathList(challengeByPathList));
}

function* topUserBySolution() {
  const solutionList: Solution[] = yield call(solutionApi.getAll);
  const userIdList = solutionList.map((solution) => solution.userId);

  let countedUserId = userIdList.reduce(function (list: any, userId) {
    if (userId in list) {
      list[userId]++;
    } else {
      list[userId] = 1;
    }

    return list;
  }, {});

  const countedUserIdList = Object.keys(countedUserId);
  const callList = countedUserIdList.map((userId) => call(userApi.get, userId));
  const userList: User[] = yield all(callList);

  const data: UserWithSolution[] = userList.map((user) => ({
    user,
    totalSolution: countedUserId[user.id || ''],
  }));

  yield put(setTopUserWithSolution(data));
}

function* handleFetchDashboardData() {
  try {
    yield all([call(fetchChallengeByPath), call(topUserBySolution)]);

    yield put(fetchDashboardDataSuccess());
  } catch (error) {
    yield put(fetchDashboardDataFailed());
  }
}

function* dashboardSaga() {
  yield takeLatest(fetchDashboardData.type, handleFetchDashboardData);
}

export default dashboardSaga;
