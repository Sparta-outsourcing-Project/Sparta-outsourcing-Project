import { useState } from 'react';
import defaultImg from '../../assets/profile_defaultImage.png';
import {
  ProfileContent,
  ProfileSection,
  UserEmail,
  UserIntro,
  UserNickname,
  UserNicknameInput
} from '../../pages/MyPage';
import { getUserInfo, updateUserInfo } from '../../api/auth';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../layout/Loading';
import Error from '../../pages/Error';

const MyProfileCopy2 = () => {
  const uid = sessionStorage.getItem('uid');
  const [isEdit, setIsEdit] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [newIntro, setNewIntro] = useState('');
  const [newImage, setNewImage] = useState('');
  const { isLoading, isError, data } = useQuery({
    queryKey: ['userInfo', uid],
    queryFn: async () => {
      const res = await getUserInfo(uid);
      setNewNickname(res.nickname);
      setNewIntro(res.intro);
      setNewImage(res.image);
      return res;
    }
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  const { userId, nickname, image, intro } = data;
  const onNewNickname = (e) => {
    setNewNickname(e.target.value);
  };
  const onNewIntro = (e) => {
    setNewIntro(e.target.value);
  };
  const onUpdateHandler = () => {
    setIsEdit((prev) => !prev);
  };
  const onCancel = () => {
    setIsEdit((prev) => !prev);
  };
  const onUpdateUserInfo = async () => {
    const isConfirmed = window.confirm('수정하시겠습니까?');
    if (isConfirmed) {
      const newUserInfo = {
        nickname: newNickname,
        intro: newIntro,
        image: newImage
      };
      try {
        await updateUserInfo(uid, newUserInfo);
        // 여기서 필요하면 query를 invalidate할 수 있음
      } catch (error) {
        console.error(error);
      }
      setIsEdit(false);
    }
  };
  return (
    <ProfileSection>
      <img src={image === null ? defaultImg : image} alt="defaultImg" width={200} />
      <ProfileContent>
        {isEdit ? (
          <UserNicknameInput type="text" value={newNickname} onChange={onNewNickname} />
        ) : (
          <UserNickname>{nickname}</UserNickname>
        )}
        <UserEmail>{userId}</UserEmail>
        {isEdit ? <Textarea value={newIntro} onChange={onNewIntro} /> : <UserIntro>{intro}</UserIntro>}
      </ProfileContent>
      {isEdit ? (
        <UpdateButton>
          <button onClick={onUpdateUserInfo}>수정완료</button>
          <button onClick={onCancel}>취소</button>
        </UpdateButton>
      ) : (
        <>
          <button onClick={onUpdateHandler}>수정하기</button>
        </>
      )}
    </ProfileSection>
  );
};
export default MyProfileCopy2;

export const UpdateButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  & > button {
    background-color: white;
    width: 8rem;
    height: 3rem;
    border: none;
    border-radius: 0.5rem;
  }
`;
export const Textarea = styled.textarea`
  font-size: 1.3rem;
  min-height: 70px;
`;
