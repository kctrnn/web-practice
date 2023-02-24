import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
  list: City[];
  loading: boolean;
}

const initialState: CityState = {
  list: [],
  loading: false,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },

    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },

    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const { fetchCityList, fetchCityListFailed, fetchCityListSuccess } =
  citySlice.actions;

// Selectors
export const selectCityList = (state: RootState) => state.city.list;

// cityMap = {
//     ha: { code: 'ha', name: 'Hoi An'}
//     hcm: { code: 'hcm', name: 'Ho Chi Minh'}
// }
// cityMap['ha'].name

export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => {
    const cityOption = {
      label: city.name,
      value: city.code,
    };

    return cityOption;
  })
);

// Reducer
export default citySlice.reducer;
