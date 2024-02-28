import React, { useEffect, useState } from 'react';
import nonFavImg from '../../assets/emptyStar.png';
import favImg from '../../assets/coloredStar.png';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { addFavoriteChannel, fetchIsFavorite, removeFavoriteChannel } from '../../api/favorites';
import Loading from '../layout/Loading';
import Error from '../../pages/Error';

export const ListFavoriteButton = ({ userUid, channelId }) => {
  const [favorite, setFavorite] = useState(false);

  // 기존 즐겨찾기 데이터 가져와서 별표 뜨게하기 => RQ
  const {
    data: favoriteChannels,
    isLoading,
    error
  } = useQuery({
    queryKey: ['favoriteChannels', userUid, favorite],
    queryFn: () => fetchIsFavorite(userUid)
  });

  useEffect(() => {
    favoriteChannels?.includes(channelId) ? setFavorite(true) : setFavorite(false);
  }, [favoriteChannels, favorite]);

  const toggleFavoriteClick = async () => {
    if (!favorite) {
      // 추가
      try {
        await addFavoriteChannel(userUid, channelId);
        setFavorite(true);
      } catch (error) {
        alert('즐겨찾기 추가가 제대로 되지 않았어요. 다시 시도해주세요 !');
      }
    } else {
      // 삭제(해제)
      try {
        await removeFavoriteChannel(userUid, channelId);
        setFavorite(false);
      } catch (error) {
        alert('즐겨찾기 삭제가 제대로 되지 않았어요. 다시 시도해주세요 !');
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <div>
      {/* 즐겨찾기 (별) 눌렀을 때 (toggle - 즐겨찾기 추가/해제) */}
      <NonFavStar src={favorite ? favImg : nonFavImg} width={30} onClick={toggleFavoriteClick} />
    </div>
  );
};

const NonFavStar = styled.img`
  cursor: pointer;
`;
