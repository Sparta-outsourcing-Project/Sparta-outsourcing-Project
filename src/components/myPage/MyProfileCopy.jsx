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

const MyProfileCopy = () => {
  const uid = sessionStorage.getItem('uid');
  const [isEdit, setIsEdit] = useState(false);

  const [newNickname, setNewNickname] = useState('');
  const [newIntro, setNewIntro] = useState('');
  const [newImage, setNewImage] = useState('');

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userInfo', uid],
    queryFn: () => getUserInfo(uid)
  });
  console.log('useQuery 확인', data, isLoading, isError);

  const mutation = useMutation((newUserInfo) => updateUserInfo(uid, newUserInfo), {
    onSuccess: () => queryClient.invalidateQueries(['userInfo'], uid)
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const { userId, nickname, image, intro } = data;
  console.log(data);

  // const { userId, nickname, image, intro } = data ?? {
  //   userId: '',
  //   nickname: '',
  //   image: null,
  //   favChannels: [],
  //   intro: ''
  // };
  // console.log(data);

  setNewNickname(nickname);
  setNewIntro(intro);
  setNewImage(image);

  // 닉네임, 소개, 이미지 임시저장
  // const [newNickname, setNewNickname] = useState(nickname);
  // const [newIntro, setNewIntro] = useState(intro);
  // const [newImage, setNewImage] = useState(image);

  // query로 fireStore의 userInfo 가져오기
  // const { isLoading, isError, error, data } = useQuery({
  //   queryKey: ['userInfo', uid],
  //   queryFn: () => getUserInfo(uid)
  // });
  // console.log(isLoading, isError, data);

  // const { userId, nickname, image, favChannels, intro } = data;
  // console.log(data);

  // query로 newUserInfo update, invalidate(optimistic UI) 하기
  // const queryClient = useQueryClient();
  // const mutation = useMutation((newUserInfo) => updateUserInfo(uid, newUserInfo), {
  //   onSuccess: () => queryClient.invalidateQueries(['userInfo'], uid)
  // });

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
        // image
      };

      // mutation (수정된 정보 query로 전달하기)
      try {
        await mutation.mutateAsync(newUserInfo);
      } catch (error) {
        console.error(error);
      }
      // mutation.mutate(newUserInfo);

      setIsEdit(false);
    }
  };

  // if (isLoading) return <Loading />;
  // if (isError) return console.log(error.message);
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

export default MyProfileCopy;

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
