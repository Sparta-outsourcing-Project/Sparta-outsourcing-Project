import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
import db from './config';
import { storage } from './config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    return userInfo.data();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// export const getUserInfo = async (uid) => {
//   try {
//     const userInfoObj = await getDoc(doc(db, 'users', uid));
//     const userInfo = userInfoObj.data;

//     const userImage = await getDownloadURL()
//     // return userInfo.data();
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// 회원정보 수정
// export const updateUserInfo = async (uid, newUserInfo) => {
//   //   const newUserInfo = {
//   //     nickname: newNickname,
//   //     intro: newIntro
//   //   };
//   const { nickname, intro } = newUserInfo;
//   await updateDoc(doc(db, 'users', uid), { nickname, intro });
// };

export const updateImage = async (uid, uploadedImage) => {
  const uploadedFile = await uploadBytes(ref(storage, `images/${uploadedImage.name}`), uploadedImage);

  const file_url = await getDownloadURL(uploadedFile.ref);
  // console.log('uploadedFile', uploadedFile, 'file_url', file_url);

  await updateDoc(doc(db, 'users', uid), { image: file_url });
};

export const updateUser = async (uid, newUserInfo, newImage) => {
  try {
    const { nickname, intro } = newUserInfo;
    const uploadedFile = await uploadBytes(ref(storage, `images/${newImage.name}`), newImage);
    const imageURL = await getDownloadURL(uploadedFile.ref);

    await updateDoc(doc(db, 'users', uid), { nickname, intro, image: imageURL });
  } catch (error) {
    console.error('error', error);
  }
};
