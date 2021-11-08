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
  ongoingProjectList: Project[];
  completedProjectList: Project[];

  statistics: DashboardStatistics;
}

const initialState: DashboardState = {
  loading: false,
  ongoingProjectList: [],
  completedProjectList: [],

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

    setOngoingProjectList(state, action: PayloadAction<Project[]>) {
      state.ongoingProjectList = action.payload;
    },

    setCompletedProjectList(state, action: PayloadAction<Project[]>) {
      state.completedProjectList = action.payload;
    },
  },
});

// actions
export const {
  fetchDashboardData,
  fetchDashboardDataFailed,
  fetchDashboardDataSuccess,
  setOngoingProjectList,
  setCompletedProjectList,
  setStatistics,
} = dashboardSlice.actions;

// selectors
export const selectOngoingProjectList = (state: RootState) =>
  state.dashboard.ongoingProjectList;
export const selectCompletedProjectList = (state: RootState) =>
  state.dashboard.completedProjectList;
export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) =>
  state.dashboard.statistics;

// reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
