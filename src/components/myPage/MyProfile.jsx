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

const MyProfile = () => {
  const uid = sessionStorage.getItem('uid');
  const [isEdit, setIsEdit] = useState(false);

  // 닉네임, 소개, 이미지 임시저장
  const [newNickname, setNewNickname] = useState('');
  const [newIntro, setNewIntro] = useState('');
  const [newImage, setNewImage] = useState('');

  const queryClient = useQueryClient();

  // query로 newUserInfo update, invalidate(optimistic UI) 하기

  // mutation 방식 1.
  const mutation = useMutation({
    mutationFn: (newUserInfo) => updateUserInfo(uid, newUserInfo),
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
    }
  });

  // mutation 방식 2.
  // const { mutate: updateMutation } = useMutation({
  //   mutationFn: (newUserInfo) => updateUserInfo(uid, newUserInfo),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['userInfo']);
  //   }
  // });

  // query로 fireStore의 userInfo 가져오기
  const { isLoading, isError, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await getUserInfo(uid);
      setNewNickname(res.nickname);
      setNewIntro(res.intro);
      setNewImage(res.image);
      return res;
    }
  });
  console.log(isLoading, isError, data);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  const { userId, nickname, image, intro } = data;

  // 닉네임 입력
  const onNewNickname = (e) => {
    setNewNickname(e.target.value);
  };

  // 소개 입력
  const onNewIntro = (e) => {
    setNewIntro(e.target.value);
  };

  // '수정하기' 클릭
  const onUpdateHandler = () => {
    setIsEdit((prev) => !prev);
  };

  // '취소' 클릭 - 기존 값으로 복구
  const onCancel = () => {
    setIsEdit((prev) => !prev);
    setNewImage(image);
    setNewNickname(nickname);
    setNewIntro(intro);
  };

  // '수정완료' 클릭
  const onUpdateUserInfo = async () => {
    const isConfirmed = window.confirm('수정하시겠습니까?');
    if (isConfirmed) {
      const newUserInfo = {
        nickname: newNickname,
        intro: newIntro,
        image: newImage
      };

      // mutation (수정된 정보 query로 전달하기)
      // 방식 1.
      mutation.mutate(newUserInfo);

      // 방식 2.
      // updateMutation(newUserInfo);

      setIsEdit(false);
    }
  };

  return (
    <>
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
    </>
  );
};

export default MyProfile;

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
