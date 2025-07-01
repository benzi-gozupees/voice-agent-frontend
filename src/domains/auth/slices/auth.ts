import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type User = {
  id: number;
  email: string;
  company_name: string;
  contact_number: string;
  token: string;
  refresh_token: string;
  user_profile_image: string;
  country: string;
  role: string;
  status: string;
};

interface AuthState {
  token: string;
  refresh_token?: string;
  isAuthenticated: boolean;
  user: User | null;
  redirectURL?: string;
  destination?: string;
  role?: string;
}

const initialState: AuthState = {
  user: null,
  token: '',
  refresh_token: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{
        token: string;
        refresh_token: string;
        role: string;
        session_id?: string;
        id?: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.refresh_token = action.payload.refresh_token;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLogout: state => {
      state.token = '';
      state.refresh_token = '';
      state.user = null;
      state.isAuthenticated = false;
    },
    setRedirectURL: (state, action: PayloadAction<string>) => {
      state.redirectURL = action.payload;
    },
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<{ token: string }>) => {
  state.token = action.payload.token;
},

  },
});

export const {
  setLogin,
  setLogout,
  setUser,
  setRedirectURL,
  setDestination,
  setAccessToken
} = authSlice.actions;

export default authSlice.reducer;
