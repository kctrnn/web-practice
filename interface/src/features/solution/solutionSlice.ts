import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SolutionFilter } from 'api/solutionApi';
import { RootState } from 'app/store';
import { Solution } from 'models';

export interface SolutionState {
  list: Solution[];
  filter: SolutionFilter;
  loading: boolean;
}

const initialState: SolutionState = {
  list: [],
  filter: {},
  loading: false,
};

const solutionSlice = createSlice({
  name: 'solution',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<SolutionFilter>) {
      state.filter = action.payload;
    },

    fetchSolutionList(state, action: PayloadAction<SolutionFilter>) {
      state.loading = true;
    },

    fetchSolutionListSuccess(state, action: PayloadAction<Solution[]>) {
      state.loading = false;
      state.list = action.payload;
    },

    fetchSolutionListFailed(state) {
      state.loading = false;
    },
  },
});

// actions
export const {
  fetchSolutionList,
  fetchSolutionListSuccess,
  fetchSolutionListFailed,
  setFilter,
} = solutionSlice.actions;

// selectors
export const selectSolutionList = (state: RootState) => state.solution.list;
export const selectSolutionLoading = (state: RootState) =>
  state.solution.loading;
export const selectSolutionFilter = (state: RootState) => state.solution.filter;

// reducer
const solutionReducer = solutionSlice.reducer;
export default solutionReducer;
