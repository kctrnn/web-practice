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
  setOnGoingProjectList,
  setSolutionList,
  setStatistics,
} from './dashboardSlice';

function* fetchStatistics() {
  const { _id: userId } = JSON.parse(localStorage.getItem(USER) || '{}');

  const solutions: Solution[] = yield call(solutionApi.getAll, {
    userId,
  });

  const totalSolution = solutions.filter((x) => x.submitted).length;
  const totalUpVote = solutions.reduce(
    (total, solution) => total + solution.upvotes?.length || 0,
    0
  );

  const statistics: DashboardStatistics = {
    totalBadge: 3,
    totalSolution,
    totalUpVote,
  };

  yield put(setStatistics(statistics));
}

function* fetchProjectList() {
  const { _id: userId } = JSON.parse(localStorage.getItem(USER) || '{}');

  const solutions: Solution[] = yield call(solutionApi.getAll, {
    userId,
  });

  const callList = solutions.map((solution) =>
    call(challengeApi.get, solution.challengeId)
  );

  const challenges: Challenge[] = yield all(callList);
  const onGoingProjectList: Project[] = solutions
    .filter((x) => !x.submitted)
    .map((solution, idx) => ({
      ...challenges[idx],
      createdAt: solution.createdAt,
    }));

  const completedProjectList: Project[] = solutions
    .filter((x) => x.submitted)
    .map((solution, idx) => ({
      ...challenges[idx],
      upVoteLength: solution.upvotes?.length || 0,
      feedbackLength: solution.feedbacks?.length || 0,
    }));

  yield put(setOnGoingProjectList(onGoingProjectList));
  yield put(setSolutionList(completedProjectList));
}

function* handleFetchDashboardData() {
  console.log(111);
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
