import { useState } from 'react';
import defaultImg from '../../assets/profile_defaultImage.png';
import { getUserInfo, updateUser } from '../../api/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../layout/Loading';
import Error from '../../pages/Error';
import * as St from './styles/MyPageStyle';

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

  if (isLoading || mutation.isPending) {
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
      <St.ProfileSection>
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
        <St.ProfileContent>
          {isEdit ? (
            <St.UserNicknameInput type="text" value={newNickname} onChange={onNewNickname} />
          ) : (
            <St.UserNickname>{nickname}</St.UserNickname>
          )}

          <St.UserEmail>{userId}</St.UserEmail>
          {isEdit ? <St.Textarea value={newIntro} onChange={onNewIntro} /> : <St.UserIntro>{intro}</St.UserIntro>}
        </St.ProfileContent>
        {isEdit ? (
          <St.UpdateButton>
            <button onClick={onUpdateUserInfo}>수정완료</button>
            <button onClick={onCancel}>취소</button>
          </St.UpdateButton>
        ) : (
          <>
            <button onClick={onUpdateHandler}>수정하기</button>
          </>
        )}
      </St.ProfileSection>
    </>
  );
};

export default MyProfile;
