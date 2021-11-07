import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Project } from 'models';

export interface DashboardStatistics {
  totalVote: number;
  totalSolution: number;
  totalBadge: number;
}

export interface DashboardState {
  loading: boolean;
  onGoingProjectList: Project[];
  solutionList: Project[];

  statistics: DashboardStatistics;
}

const initialState: DashboardState = {
  loading: false,
  onGoingProjectList: [],
  solutionList: [],

  statistics: {
    totalVote: 0,
    totalSolution: 0,
    totalBadge: 0,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardData(state) {
      state.loading = true;
    },

    fetchDashboardDataSuccess(state) {
      state.loading = false;
    },

    fetchDashboardDataFailed(state) {
      state.loading = false;
    },

    setStatistics: (state, action: PayloadAction<DashboardStatistics>) => {
      state.statistics = action.payload;
    },

    setOnGoingProjectList(state, action: PayloadAction<Project[]>) {
      state.onGoingProjectList = action.payload;
    },

    setSolutionList(state, action: PayloadAction<Project[]>) {
      state.solutionList = action.payload;
    },
  },
});

// actions
export const {
  fetchDashboardData,
  fetchDashboardDataFailed,
  fetchDashboardDataSuccess,
  setOnGoingProjectList,
  setSolutionList,
  setStatistics,
} = dashboardSlice.actions;

// selectors
export const selectOnGoingProjectList = (state: RootState) =>
  state.dashboard.onGoingProjectList;
export const selectSolutionList = (state: RootState) =>
  state.dashboard.solutionList;
export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) =>
  state.dashboard.statistics;

// reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
