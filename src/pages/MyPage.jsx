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
import { Link } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();
  const [userUid, setUserUid] = useState('');
  const [favChannelInfos, setFavChannelInfos] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      setUserUid(sessionStorage.getItem('uid'));
    } else {
      alert('로그인해주세요 !');
      navigate('/');
    }
  }, []);

  const {
    data: favoriteChannelIds, // 즐겨찾기 채널 id들의 배열
    isLoading,
    error
  } = useQuery({
    queryKey: ['favoriteChannelIds', userUid],
    queryFn: () => fetchFavorites(userUid)
  });

  useEffect(() => {
    const fetchFavChannelInfos = async () => {
      const favChannelInfoArr = [];
      for (const favChannelId of favoriteChannelIds) {
        const favChannelInfo = await getChannelInfoById(favChannelId); // 해당채널ID 넣어 채널정보 얻기
        favChannelInfoArr.push(favChannelInfo); // 빈배열에 하나씩 담기
      }

      setFavChannelInfos(favChannelInfoArr);
    };
    fetchFavChannelInfos();
  }, [favoriteChannelIds]);
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
                <th />
              </tr>
            </thead>
            <tbody>
              {favChannelInfos.map(
                ({ channelTitle, thumbnailUrl, subscriberCount, averageViewCount, channelId }, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        {/* <Link to={`/list/1/${channel.channelId}`}> */}
                        <ThumbnailImg src={thumbnailUrl} width={100} />
                        {/* </Link> */}
                      </td>
                      <td>{channelTitle}</td>
                      <td>{subscriberCount}</td>
                      <td>{averageViewCount}</td>
                      <td>
                        {/* 내 즐겨찾기에서 삭제 시, 회색별로 바뀌고, 새로고침 시 목록에서 사라짐 */}
                        <ListFavoriteButton userUid={userUid} channelId={channelId} />
                      </td>
                    </tr>
                  );
                }
              )}
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

  & th {
    text-align: left;
    font-size: 0.9rem;
    padding: 1rem;
    vertical-align: middle;
  }

  & td {
    border-bottom: 1px solid #e4c1ad;
    padding: 1rem;
    vertical-align: middle;
  }
  /* & th:nth-child(1) {
    width: 100px;
  } */

  /* & th:nth-child(3) {
    margin-right: 10px;
  } */

  & td:nth-child(2) {
    width: 160px;
    & span {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      /* background-color: #febe98; */
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
