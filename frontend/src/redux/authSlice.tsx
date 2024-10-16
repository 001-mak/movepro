import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UserData {
  first_name: string;
  last_name: string;
  email_id: string;
  phone_no: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  user_role: string; // Add other fields as needed
}

interface AuthState {
  accessToken: string | null;
  userData: UserData | null; // Store entire userData object
}

const loadAuthState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return { accessToken: null, userData: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { accessToken: null, userData: null };
  }
};

const saveAuthState = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch {
    // Ignore write errors
  }
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; userData: UserData }> // Change object to UserData
    ) => {
      state.accessToken = action.payload.accessToken;
      state.userData = action.payload.userData; // Store entire userData
      saveAuthState(state);
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.userData = null; // Clear userData
      saveAuthState(state);
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUserData = (state: RootState) => state.auth.userData; // Selector for userData

export default authSlice.reducer;
