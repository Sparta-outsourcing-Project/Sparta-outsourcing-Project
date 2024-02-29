import styled from 'styled-components';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MyProfile from '../components/myPage/MyProfile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import nonFavImg from '../assets/emptyStar.png';
import { ListFavoriteButton } from '../components/list/ListFavoriteButton';
import { fetchFavorites } from '../api/favorites';
import { useQuery } from '@tanstack/react-query';
import { useChannelDetailInfo } from '../hooks/useChannelDetailInfo';
import { getChannelInfoById } from '../api/dataApi';
import Loading from '../components/layout/Loading';

export default function MyPage() {
  const navigate = useNavigate();
  const [userUid, setUserUid] = useState('');
  const [favChannelInfos, setFavChannelInfos] = useState([]);

  const channel = { channelId: '9DKSOsLR7Vk' }; // 임시

  useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      setUserUid(sessionStorage.getItem('uid'));
    } else {
      alert('로그인해주세요 !');
      navigate('/');
    }
  }, []);

  const {
    data: favoriteChannels, // 즐겨찾기 채널 id들의 배열
    isLoading,
    error
  } = useQuery({
    queryKey: ['favoriteChannels', userUid],
    queryFn: () => fetchFavorites(userUid)
  });

  useEffect(() => {
    const fetchFavChannelInfos = async () => {
      const favChannelInfoArr = [];
      for (const favChannelId of favoriteChannels) {
        const favChannelInfo = await getChannelInfoById(favChannelId);
        favChannelInfoArr.push(favChannelInfo);
        setFavChannelInfos([...favChannelInfos, favChannelInfo]);
      }
      setFavChannelInfos((prevFavChannelInfos) => prevFavChannelInfos.concat(favChannelInfoArr));
    };
    fetchFavChannelInfos();
  }, [favoriteChannels]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
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
              {/* {favChannelInfos.map(({ thumbnailUrl, channelTitle, subscriberCount, viewCount }, index) => {
                <td>{channelTitle}</td>;
              })} */}
              <tr>
                <td>1</td>
                <td>
                  <ThumbnailImg
                    src="https://yt3.ggpht.com/aQEJkF7eAIDeEEqfUQ9rn3XmSfQDtmG_Qzfx6wteFS5dv5JbKyH1paAu-CGCB8COdhr_vHdz=s800-c-k-c0x00ffffff-no-rj"
                    width={100}
                  />
                </td>
                <td>유튜버명</td>
                <td>구독자수</td>
                <td>조회수</td>
                <td>
                  <ListFavoriteButton userUid={userUid} channelId={channel.channelId} />
                </td>
              </tr>
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
`;

export const ProfileSection = styled.section`
  background-color: #ffd8c1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  margin: 3rem;
  gap: 3rem;
  width: 23%;
  box-shadow: 0px 0px 10px 0px #f7d7c4;
  border-radius: 1rem;

  & > label > img,
  img {
    margin-top: 2rem;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  & > label > p {
    color: white;
    text-align: center;
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
  text-align: center;

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
  width: 70%;
  margin: 3rem;
  padding: 1.5rem;
  box-shadow: 0px 0px 3px 0px #e5ab89;
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
    border-bottom: 1px solid #e4c1ad;
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

export const FavTitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const FavItemBox = styled.tr`
  width: 1000px;
  display: flex;
  flex-direction: row;
  & > img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
`;

const ThumbnailImg = styled.img`
  border-radius: 50%;
`;
