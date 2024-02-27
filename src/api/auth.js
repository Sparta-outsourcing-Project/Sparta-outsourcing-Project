import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
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

// 로그인한 userInfo fireStore에서 가져오기
export const getUserInfo = async (uid) => {
  try {
    const userInfo = await getDoc(doc(db, 'users', uid));
    if (userInfo.exists()) {
      return userInfo.data();
    }
    console.log('문서가 존재하지 않습니다.');
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
