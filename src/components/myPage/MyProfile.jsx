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
import { getUserInfo, updateUser } from '../../api/auth';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../layout/Loading';
import Error from '../../pages/Error';

const MyProfile = () => {
  const uid = sessionStorage.getItem('uid');
  const [isEdit, setIsEdit] = useState(false);

  const [newNickname, setNewNickname] = useState('');
  const [newIntro, setNewIntro] = useState('');
  const [newImage, setNewImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const { uid, newUserInfo, newImage } = data;
      await updateUser(uid, newUserInfo, newImage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
    }
  });

  const { isLoading, isError, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await getUserInfo(uid);
      setNewNickname(res.nickname);
      setNewIntro(res.intro);
      setNewImage(res.image);
      setPreviewImage(res.image);
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
    setNewImage(image);
  };

  const onImageHandler = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setNewImage(file);
  };

  const onUpdateUserInfo = async () => {
    const isConfirmed = window.confirm('수정하시겠습니까?');
    if (isConfirmed) {
      const newUserInfo = {
        nickname: newNickname,
        intro: newIntro
      };

      mutation.mutate({ uid, newUserInfo, newImage });

      setIsEdit(false);
    }
  };

  return (
    <>
      <ProfileSection>
        {isEdit ? (
          <>
            <label htmlFor="fileInput">
              <img src={previewImage === null ? defaultImg : previewImage} alt="defaultImg" />
              <p>(이미지 크기 : 최대 4MB)</p>
            </label>
            <input
              id="fileInput"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={onImageHandler}
              style={{ display: 'none', width: '200px' }}
            />
          </>
        ) : (
          <>
            <img src={image === null ? defaultImg : image} alt="defaultImg" />
          </>
        )}
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

export const EditingImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 30px;
`;
