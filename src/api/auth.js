import { doc, setDoc } from 'firebase/firestore/lite';
import db from './config';

// 회원가입시 userInfo fireStore에 저장
export const addDefaultUserInfo = async (uid, newUserInfo) => {
  try {
    await setDoc(doc(db, 'users', uid), newUserInfo);
  } catch (error) {
    console.error(error);
  }
};

// 구글 로그인시 userInfo fireStore에 저장
export const addGoogleUserInfo = async (uid, newUserInfo) => {
  try {
    await setDoc(doc(db, 'users', uid), newUserInfo);
  } catch (error) {
    console.error(error);
  }
};
