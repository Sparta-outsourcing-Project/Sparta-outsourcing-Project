import React, { useState } from 'react';
import nonFavImg from '../../assets/emptyStar.png';
import favImg from '../../assets/coloredStar.png';
import { arrayRemove, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore/lite';
import db from '../../api/config';
import styled from 'styled-components';

// 이미지 부자연스럽게 바뀌는거 해결?

export const ListFavoriteButton = ({ userUid, channelId }) => {
  const [favorite, setFavorite] = useState(false);

  // 사용자가 즐찾 누름 -> DB 갱신  post/delete
  const toggleFavoriteClick = async () => {
    if (!favorite) {
      // 추가
      // 문서 안 favChannels 필드 - value 배열에 해당 채널ID 추가
      try {
        await updateDoc(doc(db, 'userInfo', userUid), {
          favChannels: arrayUnion(channelId)
        });
        setFavorite(true);
      } catch (error) {
        alert('즐겨찾기 추가가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error('cannot add favorite : ', error);
      }
    } else {
      // 삭제(해제)
      try {
        await updateDoc(doc(db, 'userInfo', userUid), {
          favChannels: arrayRemove(channelId)
        });
        setFavorite(false);
      } catch (error) {
        alert('즐겨찾기 삭제가 제대로 되지 않았어요. 다시 시도해주세요 !');
        console.error('cannot remove favorite : ', error);
      }
    }
  };

  return (
    <div>
      {/* 즐겨찾기 (별) 눌렀을 때 (toggle - 즐겨찾기 추가/해제) */}
      <NonFavStar src={favorite ? favImg : nonFavImg} width={favorite ? 30 : 50} onClick={toggleFavoriteClick} />
    </div>
  );
};

const NonFavStar = styled.img`
  cursor: pointer;
`;
