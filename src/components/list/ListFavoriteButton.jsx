import React, { useEffect, useState } from 'react';
import nonFavImg from '../../assets/emptyStar.png';
import favImg from '../../assets/coloredStar.png';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import db from '../../api/config';
import styled from 'styled-components';

export const ListFavoriteButton = ({ userUid, channelId }) => {
  const [favorite, setFavorite] = useState(false);

  // 기존 즐겨찾기 데이터 가져와서 별표 뜨게하기
  useEffect(() => {
    const fetchUserFav = async (userUid) => {
      try {
        const userRef = doc(db, 'users', userUid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          if (userSnap.data().favChannels.includes(channelId)) {
            setFavorite(true);
          }
        }
      } catch (error) {
        console.log(`cannot fetch user's favorites from firestore : `, error);
      }
    };
    fetchUserFav(userUid);
  }, [doc, userUid]);

  // 사용자가 즐찾 누름 -> DB 갱신하기 (추가/삭제)
  const toggleFavoriteClick = async () => {
    if (!favorite) {
      // 추가
      try {
        await updateDoc(doc(db, 'users', userUid), {
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
        await updateDoc(doc(db, 'users', userUid), {
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
      <NonFavStar src={favorite ? favImg : nonFavImg} width={30} onClick={toggleFavoriteClick} />
    </div>
  );
};

const NonFavStar = styled.img`
  cursor: pointer;
`;
