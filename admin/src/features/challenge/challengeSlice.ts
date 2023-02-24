import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  Challenge,
  ListParams,
  ListResponse,
  PaginationResponse,
} from 'models';

export interface ChallengeState {
  list: Challenge[];
  loading: boolean;
  pagination: PaginationResponse;
  filter: ListParams;
}

const initialState: ChallengeState = {
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

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    fetchChallengeList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },

    fetchChallengeListSuccess(
      state,
      action: PayloadAction<ListResponse<Challenge>>
    ) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    fetchChallengeListFailed(state) {
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
  fetchChallengeList,
  fetchChallengeListSuccess,
  fetchChallengeListFailed,
  setFilter,
  setFilterDebounce,
} = challengeSlice.actions;

// selectors
export const selectChallengeList = (state: RootState) => state.challenge.list;
export const selectChallengeLoading = (state: RootState) =>
  state.challenge.loading;
export const selectChallengeFilter = (state: RootState) =>
  state.challenge.filter;
export const selectChallengePagination = (state: RootState) =>
  state.challenge.pagination;

// reducer
const challengeReducer = challengeSlice.reducer;
export default challengeReducer;
