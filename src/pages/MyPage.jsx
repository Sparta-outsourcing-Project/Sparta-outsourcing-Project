import styled from 'styled-components';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MyProfile from '../components/myPage/MyProfile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import nonFavImg from '../assets/emptyStar.png';
import { ListFavoriteButton } from '../components/list/ListFavoriteButton';

export default function MyPage() {
  const navigate = useNavigate();
  const [userUid, setUserUid] = useState('');

  const channel = { channelId: '9DKSOsLR7Vk' }; // 임시

  useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      setUserUid(sessionStorage.getItem('uid'));
    } else {
      alert('로그인해주세요 !');
      navigate('/');
    }
  }, []);

  return (
    <Wrap>
      <Header />
      <MypageSection>
        <MyProfile />
        <FavoriteSection>
          <FavTitle>내 즐겨찾기</FavTitle>
          <FavList>
            <thead>
              <tr>
                <th />
                <th />
                <th />
                <th>구독자</th>
                <th>영상 조회수</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {/* <FavItemBox> */}
              <tr>
                <td>1</td>
                <img
                  src="https://yt3.ggpht.com/aQEJkF7eAIDeEEqfUQ9rn3XmSfQDtmG_Qzfx6wteFS5dv5JbKyH1paAu-CGCB8COdhr_vHdz=s800-c-k-c0x00ffffff-no-rj"
                  width={100}
                />
                <td>유튜브채널명</td>
                <td>구독자수</td>
                <td>평균 조회수</td>
                <td>
                  <ListFavoriteButton userUid={userUid} channelId={channel.channelId} />
                </td>
              </tr>
              {/* </FavItemBox> */}
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

  & > label > img,
  img {
    margin-top: 2rem;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
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

  & > input {
    width: 100%;
    height: 40px;
  }
`;

export const UserNickname = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const UserNicknameInput = styled.input`
  font-size: 1.3rem;
`;

export const UserEmail = styled.p`
  /* font-size: 1rem; */
  color: #706d6d;
`;

export const UserIntro = styled.p`
  font-size: 1.2rem;
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
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
  font-size: 17px;
  & > thead > tr {
    background-color: antiquewhite;
  }

  & th,
  & td {
    text-align: left;
    border-bottom: 1px solid #febe98;
    padding: 1rem;
    vertical-align: middle;
  }
  & th:nth-child(1) {
    width: 100px;
  }

  & td:nth-child(2) {
    width: 160px;
    & span {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #febe98;
      margin-right: 1rem;
      overflow: hidden;
    }
  }
`;

// export const FavList = styled.table`
//   /* background-color: #dfdfc3; */
//   width: 100%;
//   & thead,
//   & tbody {
//     background-color: aqua;
//     width: 100%;
//   }
//   & tr {
//     background-color: #d48b61;
//     width: 100%;
//     height: 2rem;
//   }
//   & th:nth-child(1) {
//     width: 50px;
//     background-color: aliceblue;
//   }

//   /* & tr, */
//   & tr,
//   & td {
//     text-align: center;
//     border-bottom: 1px solid #febe98;
//     padding: 1rem;
//     vertical-align: middle;
//     width: 100%;
//   }
//   /* & th:nth-child(1) {
//     width: 100px;
//     /* width: 100%; */

//   & td:nth-child(2) {
//     /* width: 160px; */
//     /* & span {
//       display: block;
//       width: 100px;
//       height: 100px;
//       border-radius: 50%;
//       background-color: tomato;
//       margin-right: 1rem;
//       overflow: hidden;
//     } */
//     /* & span img {
//       width: 100%;
//     } */
//   }
//   & td {
//     height: 130px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
//   & > tbody {
//     /* width6 70rem; */
//     width: 255%;
//     min-height: 400px;
//     display: flex;
//     justify-content: center;
//   }
// `;

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

const NonFavStar = styled.img`
  cursor: pointer;
`;
