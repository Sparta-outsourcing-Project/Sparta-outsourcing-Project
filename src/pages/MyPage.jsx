import styled from 'styled-components';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import defaultImg from '../assets/profile_defaultImage.png';
import { getUserInfo } from '../api/auth';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const uid = sessionStorage.getItem('uid');
  const [userInfo, setUserInfo] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [newIntro, setNewIntro] = useState('');
  const [newImage, setNewImage] = useState('');

  // userInfo 샘플
  // {
  //   favChannels: [];
  //   image: null;
  //   nickname: 'test';
  //   uid: 'vC2wON5Cy3eeSgJZBiP7qjeecsr2';
  //   userId: 'test@nbc.com';
  // }

  // 로그인된 user정보 fireStore에서 가져오기
  useEffect(() => {
    const getLoggedInUserInfo = async () => {
      const res = await getUserInfo(uid);
      setUserInfo(res);
    };
    getLoggedInUserInfo();
  }, [uid]);
  const { userId, nickname, image, favChannels, intro } = userInfo;

  // 회원정보 수정 handler
  const onEditUserInfo = () => {
    if (!isEdit) {
      setIsEdit(true);
    } else {
      const isConfirmed = window.confirm('수정하시겠습니까?');
      isConfirmed && setIsEdit(false);
    }
  };

  return (
    <Wrap>
      <Header />
      <MypageSection>
        <ProfileSection>
          <img src={image === null ? defaultImg : image} alt="defaultImg" width={200} />
          <ProfileContent>
            <UserNickname>{nickname}</UserNickname>
            <UserEmail>{userId}</UserEmail>
            <UserIntro>{intro}</UserIntro>
          </ProfileContent>
          <button onClick={onEditUserInfo}>{isEdit ? '수정완료' : '수정하기'}</button>
        </ProfileSection>
        <FavoriteSection>
          <FavTitle>내 즐겨찾기</FavTitle>
          <FavList>
            <thead>
              <tr>
                <th />
                <th colSpan={2}></th>
                <th>구독자</th>
                <th>영상 조회수</th>
              </tr>
            </thead>
            <tbody>
              <FavItemBox>
                <td>1</td>
                <img src="https://yt3.ggpht.com/aQEJkF7eAIDeEEqfUQ9rn3XmSfQDtmG_Qzfx6wteFS5dv5JbKyH1paAu-CGCB8COdhr_vHdz=s800-c-k-c0x00ffffff-no-rj" />
                <td>유튜브채널명</td>
                <td>구독자수</td>
                <td>평균 조회수</td>
              </FavItemBox>
            </tbody>
          </FavList>
        </FavoriteSection>
      </MypageSection>
      <Footer />
    </Wrap>
  );
}

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MypageSection = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  /* background-color: antiquewhite; */
`;

export const ProfileSection = styled.section`
  background-color: #febe98;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  margin: 3rem;
  gap: 3rem;
  width: 23%;
  box-shadow: 0px 0px 10px 0px #febe98;
  border-radius: 1rem;

  & > img {
    margin-top: 2rem;
  }
  & > button {
    background-color: white;
    width: 10rem;
    height: 3rem;
    border: none;
    border-radius: 0.5rem;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
`;

export const UserNickname = styled.p`
  font-size: 1.3rem;
`;

export const UserEmail = styled.p`
  /* font-size: 1rem; */
  color: #706d6d;
`;

export const UserIntro = styled.p`
  /* font-size: 1.2rem; */
`;

export const FavoriteSection = styled.section`
  /* background-color: lightblue; */
  width: 70%;
  margin: 3rem;
  padding: 1.5rem;
  box-shadow: 0px 0px 3px 0px #febe98;
  border-radius: 1rem;
`;

export const FavList = styled.table`
  /* background-color: #dfdfc3; */
  width: 100%;
  & th,
  & td {
    text-align: left;
    border-bottom: 1px solid #febe98;
    padding: 1rem;
    vertical-align: middle;
  }
  & th:nth-child(1) {
    width: 100px;
    /* width: 100%; */
  }

  & td:nth-child(2) {
    /* width: 160px; */
    /* & span {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: tomato;
      margin-right: 1rem;
      overflow: hidden;
    } */
    /* & span img {
      width: 100%;
    } */
  }
  & > tbody {
    width: 100%;
    /* height: 150px; */
    background-color: aliceblue;
  }
`;

export const FavTitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const FavItemBox = styled.tr`
  width: 1000px;
  display: flex;
  flex-direction: row;
  /* background-color: lightsalmon; */
  & > img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;
