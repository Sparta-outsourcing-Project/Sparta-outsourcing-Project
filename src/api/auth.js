import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
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
    // console.log(userInfo.data());
    return userInfo.data();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 회원정보 수정
export const updateUserInfo = async (uid, newUserInfo) => {
  //   const newUserInfo = {
  //     nickname: newNickname,
  //     intro: newIntro,
  //     image: newImage
  //   };
  const { nickname, intro, image } = newUserInfo;
  await updateDoc(doc(db, 'users', uid), { nickname, intro, image });
};
