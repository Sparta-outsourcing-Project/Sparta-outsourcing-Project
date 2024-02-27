import { doc, addDoc } from 'firebase/firestore/lite';
import db from './config';

// 확인필요
export const addUserInfo = async (uid, newUserInfo) => {
  try {
    await addDoc(doc(db, 'users', uid), newUserInfo);
  } catch (error) {
    console.error(error);
  }
};

// 참고
// export const updateUserInfoApi = async (userId, nickname) => {
//     try {
//       await updateDoc(doc(db, 'users', userId), { nickname });
//     } catch (error) {
//       console.error(error);
//     }
//   };
