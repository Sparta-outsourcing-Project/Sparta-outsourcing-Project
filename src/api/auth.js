import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';
import db from './config';
import { storage } from './config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const addDefaultUserInfo = async (uid, newUserInfo) => {
  try {
    await setDoc(doc(db, 'users', uid), newUserInfo);
  } catch (error) {
    console.error(error);
  }
};

// export const addGoogleUserInfo = async (uid, newUserInfo) => {
//   try {
//     await setDoc(doc(db, 'users', uid), newUserInfo);
//   } catch (error) {
//     console.error(error);
//   }
// };
export const addGoogleUserInfo = async (uid, newUserInfo) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      await setDoc(doc(db, 'users', uid), newUserInfo);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserInfo = async (uid) => {
  try {
    const userInfo = await getDoc(doc(db, 'users', uid));
    return userInfo.data();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateImage = async (uid, uploadedImage) => {
  const uploadedFile = await uploadBytes(ref(storage, `images/${uploadedImage.name}`), uploadedImage);
  const file_url = await getDownloadURL(uploadedFile.ref);
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
