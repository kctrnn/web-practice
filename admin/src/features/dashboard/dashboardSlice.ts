import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Challenge, User } from 'models';

export interface ChallengeByPath {
  pathName: string;
  list: Challenge[];
}

export interface UserWithSolution {
  user: User;
  totalSolution: number;
}

export interface DashboardState {
  loading: boolean;
  challengeByPathList: ChallengeByPath[];
  topUserWithSolution: UserWithSolution[];
}

const initialState: DashboardState = {
  loading: false,
  challengeByPathList: [],
  topUserWithSolution: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,

  reducers: {
    fetchDashboardData: (state) => {
      state.loading = true;
    },

    fetchDashboardDataSuccess: (state) => {
      state.loading = false;
    },

    fetchDashboardDataFailed: (state) => {
      state.loading = false;
    },

    setChallengeByPathList: (
      state,
      action: PayloadAction<ChallengeByPath[]>
    ) => {
      state.challengeByPathList = action.payload;
    },

    setTopUserWithSolution: (
      state,
      action: PayloadAction<UserWithSolution[]>
    ) => {
      state.topUserWithSolution = action.payload;
    },
  },
});

// actions
export const {
  fetchDashboardData,
  fetchDashboardDataFailed,
  fetchDashboardDataSuccess,
  setChallengeByPathList,
  setTopUserWithSolution,
} = dashboardSlice.actions;

// selectors
export const selectChallengeByPathList = (state: RootState) =>
  state.dashboard.challengeByPathList;
export const selectTopUserWithSolution = (state: RootState) =>
  state.dashboard.topUserWithSolution;

// reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
