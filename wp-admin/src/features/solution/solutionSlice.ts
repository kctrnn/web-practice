import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationResponse, Solution } from 'models';

export interface SolutionState {
  list: Solution[];
  loading: boolean;
  pagination: PaginationResponse;
  filter: ListParams;
}

const initialState: SolutionState = {
  list: [],
  pagination: {
    _limit: 10,
    _page: 1,
    _totalRows: 10,
  },

  filter: {
    _page: 1,
    _limit: 10,
  },

  loading: false,
};

const solutionSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    fetchSolutionList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },

    fetchSolutionListSuccess(
      state,
      action: PayloadAction<ListResponse<Solution>>
    ) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    fetchSolutionListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    setFilterDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

// actions
export const {
  fetchSolutionList,
  fetchSolutionListSuccess,
  fetchSolutionListFailed,
  setFilter,
  setFilterDebounce,
} = solutionSlice.actions;

// selectors
export const selectSolutionList = (state: RootState) => state.solution.list;
export const selectSolutionLoading = (state: RootState) =>
  state.solution.loading;
export const selectSolutionFilter = (state: RootState) => state.solution.filter;
export const selectSolutionPagination = (state: RootState) =>
  state.solution.pagination;

// reducer
const solutionReducer = solutionSlice.reducer;
export default solutionReducer;
