import React, { useEffect, useState } from 'react';
import MyProfile from './MyProfile';
import { useNavigate } from 'react-router-dom';
import { fetchFavorites } from '../../api/favorites';
import { getChannelInfoById, getMostChannelInfo } from '../../api/dataApi';
import Loading from '../layout/Loading';
import Error from '../../pages/Error';
import { ListFavoriteButton } from '../list/ListFavoriteButton';
import { useQuery } from '@tanstack/react-query';
import * as St from './styles/MyPageStyle';

export default function MyPageSection() {
  const navigate = useNavigate();
  const [userUid, setUserUid] = useState('');
  const [favChannelInfos, setFavChannelInfos] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      setUserUid(sessionStorage.getItem('uid'));
    } else {
      navigate('/'); // alert창에서 변경
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
        const channelCustomUrl = await getMostChannelInfo(favChannelId); // 해당채널ID 넣어 채널커스텀url 얻기
        favChannelInfo.channelCustomUrl = channelCustomUrl; // info 객체에 커스텀url 추가
        favChannelInfoArr.push(favChannelInfo); // 빈배열에 하나씩 담기
      }

      setFavChannelInfos(favChannelInfoArr);
    };
    fetchFavChannelInfos();
  }, [favoriteChannelIds]);

  const handleChannelClick = (channelCustomUrl) => {
    const channelUrl = `https://www.youtube.com/${channelCustomUrl}`;
    window.open(channelUrl, '_blank');
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <St.MypageSection>
      <MyProfile />
      <St.FavoriteSection>
        <St.FavTitle>⭐ 내 즐겨찾기</St.FavTitle>
        <St.FavList>
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
              (
                { channelTitle, thumbnailUrl, subscriberCount, averageViewCount, channelId, channelCustomUrl },
                index
              ) => {
                return (
                  <tr key={channelId}>
                    <td>{index + 1}</td>
                    <St.ThumbnailTd>
                      {/* <Link to={`/list/1/${channel.channelId}`}> 해당 채널 상세페이지 링크 연결 - '키워드'가 끼어 어려움 */}
                      <St.ThumbnailImg
                        src={thumbnailUrl}
                        width={100}
                        onClick={() => handleChannelClick(channelCustomUrl)}
                      />
                    </St.ThumbnailTd>
                    <St.TitleTd onClick={() => handleChannelClick(channelCustomUrl)}>{channelTitle}</St.TitleTd>
                    <td>{subscriberCount}</td>
                    <td>{averageViewCount}</td>
                    <td>
                      {/* 내 즐겨찾기에서 삭제 시, 회색별로 바뀌고, 새로고침 시 목록에서 사라짐 */}
                      <ListFavoriteButton userUid={userUid} channelId={channelId} page="mypage" />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </St.FavList>
      </St.FavoriteSection>
    </St.MypageSection>
  );
}
