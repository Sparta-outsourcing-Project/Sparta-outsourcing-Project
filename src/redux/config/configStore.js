import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from '../modules/loginSlice';
import { userReducer } from '../modules/userSlice';

const store = configureStore({
  reducer: { loginReducer, userReducer }
});

export default store;
