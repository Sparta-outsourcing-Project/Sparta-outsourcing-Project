import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../modules/loginSlice';

const store = configureStore({
  reducer: { loginReducer }
});

export default store;
