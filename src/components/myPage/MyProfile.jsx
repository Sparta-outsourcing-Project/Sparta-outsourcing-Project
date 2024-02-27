import { useEffect, useState } from 'react';
import defaultImg from '../../assets/profile_defaultImage.png';
import {
  ProfileContent,
  ProfileSection,
  UserEmail,
  UserIntro,
  UserNickname,
  UserNicknameInput
} from '../../pages/MyPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, updateUserInfo } from '../../api/auth';
import { defaultUser, updateUserState } from '../../redux/modules/userSlice';
import styled from 'styled-components';

const MyProfile = () => {
  const uid = sessionStorage.getItem('uid');
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  // userInfo 샘플
  // {
  //   intro : '소개를 입력해주세요'
  //   favChannels: [];
  //   image: null;
  //   nickname: 'test';
  //   uid: 'vC2wON5Cy3eeSgJZBiP7qjeecsr2';
  //   userId: 'test@nbc.com';
  // }

  // 로그인된 user정보 fireStore에서 가져오기 + reducer 전달
  useEffect(() => {
    const getLoggedInUserInfo = async () => {
      const userInfo = await getUserInfo(uid);
      dispatch(defaultUser(userInfo));
    };
    getLoggedInUserInfo();
  }, [dispatch, uid]);

  // reducer에서 user정보 가져오기
  const userInfoState = useSelector((state) => state.userReducer);
  const { userId, nickname, image, favChannels, intro } = userInfoState;

  // 닉네임, 소개, 이미지 임시저장 🌈🌈 초기값으로 둔게 다 undefined (위에서 멀쩡히 잘 들어오는 값임)
  // -> 이거 해결되면 수정클릭시 input에 이전값 뜨는 이슈, 수정시 이미지파일 안뜨는 이슈 해결 가능!!
  const [newNickname, setNewNickname] = useState(nickname);
  const [newIntro, setNewIntro] = useState(intro);
  const [newImage, setNewImage] = useState(image);

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
      // 변경된 값 리듀서에 전달
      const updateUserInfoState = { nickname: newNickname, intro: newIntro, image: newImage };
      dispatch(updateUserState(updateUserInfoState));

      // useState 변경
      setNewImage(image);
      setNewNickname(nickname);
      setNewIntro(intro);

      // fireStore userInfo 업데이트
      const newUserInfo = {
        nickname: newNickname,
        intro: newIntro,
        // image: newImage
        image
      };
      await updateUserInfo(uid, newUserInfo);
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
          {isEdit ? <input type="text" value={newIntro} onChange={onNewIntro} /> : <UserIntro>{intro}</UserIntro>}
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
