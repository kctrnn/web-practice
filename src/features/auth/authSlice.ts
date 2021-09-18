import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LoginPayload, SignupPayload, User } from 'models';

export interface AuthState {
  currentUser: User | {};
  logging: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: {},
  logging: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },

    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },

    loginFailed(state) {
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = {};
    },

    signup(state, action: PayloadAction<SignupPayload>) {
      state.logging = true;
    },

    signupSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },

    signupFailed(state) {
      state.logging = false;
    },
  },
});

// Actions
export const {
  login,
  loginSuccess,
  loginFailed,
  logout,
  signup,
  signupSuccess,
  signupFailed,
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthLoading = (state: RootState) => state.auth.logging;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
