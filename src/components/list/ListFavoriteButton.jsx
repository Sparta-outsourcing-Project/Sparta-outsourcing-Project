import React, { useEffect, useState } from 'react';
import nonFavImg from '../../assets/emptyStar.png';
import favImg from '../../assets/coloredStar.png';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { addFavoriteChannel, fetchFavorites, removeFavoriteChannel } from '../../api/favorites';
import Loading from '../layout/Loading';
import Error from '../../pages/Error';

export const ListFavoriteButton = ({ userUid, channelId, page }) => {
  const [favorite, setFavorite] = useState(false);

  // 기존 즐겨찾기 데이터 가져와서 별표 뜨게하기 => RQ
  const {
    data: favoriteChannels,
    isLoading,
    error
  } = useQuery({
    queryKey: ['favoriteChannels', userUid, favorite],
    queryFn: () => fetchFavorites(userUid)
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
      if (page === 'mypage') {
        // 마이페이지에서 삭제 시 컨펌 창 띄우고 '확인' 시 새로고침까지
        if (window.confirm('해당 채널을 내 즐겨찾기 목록에서 정말 삭제하실건가요?')) {
          try {
            await removeFavoriteChannel(userUid, channelId);
            setFavorite(false);
            window.location.reload(); // 새로고침해 해당 채널 삭제된 목록으로 갱신
          } catch (error) {
            alert('즐겨찾기 삭제가 제대로 되지 않았어요. 다시 시도해주세요 !');
          }
        } else {
          // 삭제 취소
          return;
        }
      } else {
        // 마이페이지가 아닌 경우 (리스트 페이지)
        try {
          await removeFavoriteChannel(userUid, channelId);
          setFavorite(false);
        } catch (error) {
          alert('즐겨찾기 삭제가 제대로 되지 않았어요. 다시 시도해주세요 !');
        }
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
