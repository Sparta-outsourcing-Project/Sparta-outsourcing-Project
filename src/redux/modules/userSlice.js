import { createSlice } from '@reduxjs/toolkit';
import defaultImg from '../../assets/profile_defaultImage.png';

const initialState = {};
// userInfo 샘플
// {
//   intro : '소개를 입력해주세요'
//   favChannels: [];
//   image: null;
//   nickname: 'test';
//   uid: 'vC2wON5Cy3eeSgJZBiP7qjeecsr2';
//   userId: 'test@nbc.com';
// }

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    defaultUser: (state, action) => {
      return action.payload;
    },
    updateNickname: (state, action) => {
      return { ...state, nickname: action.payload };
    },
    updateIntro: (state, action) => {
      return { ...state, intro: action.payload };
    },
    updateUserState: (state, action) => {
      const { nickname, intro, image } = action.payload;
      const newImage = image || defaultImg;
      return { ...state, nickname, intro, image: newImage };
    }
  }
});

export const userReducer = UserSlice.reducer;
export const { defaultUser, updateNickname, updateIntro, updateUserState } = UserSlice.actions;
