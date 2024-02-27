import React from 'react';
import styled from 'styled-components';

const VideoModal = ({ videoData, onClose }) => {
  // 모달 내용 및 스타일링 작성
  return (
    <ModalOverlay>
      <ModalContent>
        {/* 모달 내용 */}
        <h2>{videoData.channelTitle}</h2>
        {/* 추가적인 영상 정보 표시 등 */}
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px; /* 모달의 너비 조절 */
  text-align: center;
`;
export default VideoModal;
