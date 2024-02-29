import styled from 'styled-components';
import YouTube from 'react-youtube';
import { BsXSquareFill } from 'react-icons/bs';
const VideoModal = ({ videoData, onClose }) => {
  const { videoId } = videoData;
  // 모달 내용 및 스타일링 작성
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>
          {videoData.channelTitle}{' '}
          <button onClick={onClose}>
            <BsXSquareFill />
          </button>
        </h2>
        <YouTube videoId={videoId} />
        {/* 추가적인 영상 정보 표시 등 */}
      </ModalContent>
      <ModalBackGround onClick={onClose} />
    </ModalOverlay>
  );
};
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 100000;
  /* text-align: center; */
  & h2 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    & button {
      background-color: transparent;
      border: none;
    }
  }
`;
export default VideoModal;
