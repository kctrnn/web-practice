import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import challengeApi from 'api/challengeApi';
import solutionApi from 'api/solutionApi';
import { USER } from 'constants/index';
import { Challenge, Project, Solution } from 'models';
import {
  DashboardStatistics,
  fetchDashboardData,
  fetchDashboardDataFailed,
  fetchDashboardDataSuccess,
  setOngoingProjectList,
  setCompletedProjectList,
  setStatistics,
} from './dashboardSlice';

function* fetchStatistics() {
  const { _id: userId } = JSON.parse(localStorage.getItem(USER) || '{}');

  const solutions: Solution[] = yield call(solutionApi.getAll, {
    userId,
  });

  const totalSolution = solutions.filter((x) => x.submitted).length;
  const totalVote = solutions.reduce(
    (total, solution) => total + solution.votes.length,
    0
  );

  const statistics: DashboardStatistics = {
    totalBadge: 3,
    totalSolution,
    totalVote,
  };

  yield put(setStatistics(statistics));
}

function* fetchProjectList() {
  const { _id: userId } = JSON.parse(localStorage.getItem(USER) || '{}');
  const solutions: Solution[] = yield call(solutionApi.getAll, { userId });

  const callList = solutions.map((solution) =>
    call(challengeApi.get, solution.challengeId)
  );

  const challenges: Challenge[] = yield all(callList);

  const ongoingProjectList: Project[] = solutions
    .filter((x) => !x.submitted)
    .map((solution) => {
      const idx = challenges.findIndex((x) => x._id === solution.challengeId);
      return {
        ...challenges[idx],
        createdAt: solution.createdAt,
      };
    });

  const completedProjectList: Project[] = solutions
    .filter((x) => x.submitted)
    .map((solution) => {
      const idx = challenges.findIndex((x) => x._id === solution.challengeId);
      return {
        ...challenges[idx],
        voteLength: solution.votes.length,
        feedbackLength: solution.feedbacks.length,
      };
    });

  yield put(setOngoingProjectList(ongoingProjectList));
  yield put(setCompletedProjectList(completedProjectList));
}

function* handleFetchDashboardData() {
  try {
    yield all([call(fetchStatistics), call(fetchProjectList)]);

    yield put(fetchDashboardDataSuccess());
  } catch (error) {
    console.log(error);
    yield put(fetchDashboardDataFailed());
  }
}

function* dashboardSaga() {
  yield takeLatest(fetchDashboardData.type, handleFetchDashboardData);
}

export default dashboardSaga;
