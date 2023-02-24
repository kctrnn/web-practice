import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationResponse, User } from 'models';

export interface UserState {
  list: User[];
  loading: boolean;
  pagination: PaginationResponse;
  filter: ListParams;
}

const initialState: UserState = {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },

    fetchUserListSuccess(state, action: PayloadAction<ListResponse<User>>) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    fetchUserListFailed(state) {
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
  fetchUserList,
  fetchUserListSuccess,
  fetchUserListFailed,
  setFilter,
  setFilterDebounce,
} = userSlice.actions;

// selectors
export const selectUserList = (state: RootState) => state.user.list;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserFilter = (state: RootState) => state.user.filter;
export const selectUserPagination = (state: RootState) => state.user.pagination;

// reducer
const userReducer = userSlice.reducer;
export default userReducer;
