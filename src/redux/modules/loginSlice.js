import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    }
  }
});

export const loginReducer = loginSlice.reducer;
export const { login } = loginSlice.actions;
