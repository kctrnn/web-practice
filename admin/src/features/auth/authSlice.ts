import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin } from 'models';

export interface AuthState {
  currentUser: Partial<Admin>;
  logging: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: {},
  isLoggedIn: false,
  logging: false,
};

export interface LoginPayload {
  password: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },

    loginSuccess(state, action: PayloadAction<Admin>) {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },

    loginFailed(state) {
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = {};
    },
  },
});

// Actions
export const { logout, login, loginSuccess, loginFailed } = authSlice.actions;

// Selector

// Reducer
export default authSlice.reducer;
