import styled from 'styled-components';

function RecentVideo({ finalVideoDetailInfo }) {
  // 최근 6개 영상만 사용하기
  const recent6Videos = finalVideoDetailInfo?.slice(0, 6);

  // 영상 썸네일 이미지 클릭시, 해당 영상 링크로 이동
  const linkToVideoBtnClickHandler = (videoId) => {
    const youtubeURL = `https://www.youtube.com/shorts/${videoId}`;
    window.open(youtubeURL, '_blank');
  };

  return (
    <RecentVideoContainer>
      {recent6Videos?.map((video) => {
        const localizedDate = new Date(video.snippet.publishedAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        return (
          <>
            <VideoItem key={video.id}>
              <ThumbnailImageWrap>
                <img
                  onClick={() => {
                    linkToVideoBtnClickHandler(video.id);
                  }}
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                />
              </ThumbnailImageWrap>

              <VideoTextWrap>
                <VideoTitle>{video.snippet.title}</VideoTitle>
                <VideoInfoContainer>
                  <VideoDate>{localizedDate}</VideoDate>
                  <SpanContainer>
                    <TextStyle>👁️ {parseInt(video.statistics.viewCount).toLocaleString()}</TextStyle>
                    <TextStyle>👍 {parseInt(video.statistics.likeCount).toLocaleString()}</TextStyle>
                    <TextStyle>💬 {parseInt(video.statistics.commentCount).toLocaleString()}</TextStyle>
                  </SpanContainer>
                </VideoInfoContainer>
              </VideoTextWrap>
            </VideoItem>
          </>
        );
      })}
    </RecentVideoContainer>
  );
}

export default RecentVideo;

const RecentVideoContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  width: 1280px;
`;

const VideoItem = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ThumbnailImageWrap = styled.div`
  width: calc(100% - 3rem);
  height: 200px;
  border-radius: 1rem;
  overflow: hidden;
  & > img {
    width: 100%;
    /* height: 100%; */
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  & :hover {
    cursor: pointer;
    /* transform: scale(1.1);
    transition: 0.3s; */
  }
`;

const VideoTextWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1.5rem;
`;
const VideoTitle = styled.p`
  font-size: larger;
  font-weight: 600;
  line-height: 1.5;
  padding: 2rem 0.5rem;
`;
const VideoInfoContainer = styled.div`
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0.5rem;
`;
const VideoDate = styled.span`
  padding: 5px 0;
`;

const SpanContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 250px;
  padding: 5px 0;
`;

const TextStyle = styled.span`
  line-height: 1.5;
`;
