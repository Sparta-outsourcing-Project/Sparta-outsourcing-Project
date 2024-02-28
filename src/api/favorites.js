import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import db from './config';

// 즐겨찾기 목록 DB에서 가져오기
export const fetchIsFavorite = async (userUid) => {
  if (!userUid) return '';
  try {
    const userRef = doc(db, 'users', userUid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().favChannels;
    }
    return '';
  } catch (error) {
    console.log(`cannot fetch user's favorites from firestore : `, error);
  }
};

// 즐겨찾기 추가
export const addFavoriteChannel = async (userUid, channelId) => {
  try {
    await updateDoc(doc(db, 'users', userUid), {
      favChannels: arrayUnion(channelId)
    });
  } catch (error) {
    console.error('cannot add favorite to firestore: ', error);
  }
};

// 즐겨찾기 삭제
export const removeFavoriteChannel = async (userUid, channelId) => {
  try {
    await updateDoc(doc(db, 'users', userUid), {
      favChannels: arrayRemove(channelId)
    });
  } catch (error) {
    console.error('cannot remove favorite from firestore: ', error);
  }
};
