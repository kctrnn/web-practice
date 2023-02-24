import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Challenge, PathSlug } from 'models';

export interface ChallengeState {
  list: Challenge[];
  loading: boolean;
}

const initialState: ChallengeState = {
  list: [],
  loading: false,
};

const challengeSlice = createSlice({
  initialState,
  name: 'challenge',

  reducers: {
    fetchChallengeList(state, action: PayloadAction<PathSlug>) {
      state.loading = true;
    },

    fetchChallengeListSuccess(state, action: PayloadAction<Array<Challenge>>) {
      state.loading = false;
      state.list = action.payload;
    },

    fetchChallengeListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const {
  fetchChallengeList,
  fetchChallengeListSuccess,
  fetchChallengeListFailed,
} = challengeSlice.actions;

// Selectors
export const selectChallengeList = (state: RootState) => state.challenge.list;
export const selectChallengeLoading = (state: RootState) =>
  state.challenge.loading;

// Reducer
const challengeReducer = challengeSlice.reducer;
export default challengeReducer;
