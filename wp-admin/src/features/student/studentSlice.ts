import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, PaginationResponse, Student } from 'models';

export interface StudentState {
  list: Student[];
  pagination: PaginationResponse;
  filter: Partial<ListParams>;
  loading: boolean;
}

const initialState: StudentState = {
  list: [],
  pagination: {
    _limit: 15,
    _page: 1,
    _totalRows: 15,
  },

  filter: {
    _page: 1,
    _limit: 15,
  },

  loading: false,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    // dispatch(fetchStudentList(filter))
    fetchStudentList(state, action: PayloadAction<Partial<ListParams>>) {
      state.loading = true;
    },

    fetchStudentListSuccess(
      state,
      action: PayloadAction<ListResponse<Student>>
    ) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },

    fetchStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<Partial<ListParams>>) {
      state.filter = action.payload;
    },

    setFilterDebounce(state, action: PayloadAction<Partial<ListParams>>) {},
  },
});

// Actions
export const {
  fetchStudentList,
  fetchStudentListSuccess,
  fetchStudentListFailed,
  setFilter,
  setFilterDebounce,
} = studentSlice.actions;

// Reducer
export default studentSlice.reducer;
