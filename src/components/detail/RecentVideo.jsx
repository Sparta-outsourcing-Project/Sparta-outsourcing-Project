import styled from 'styled-components';

function RecentVideo({ video }) {
  return (
    <RecentVideoContainer>
      <ThumbnailImage src={video.thumbnailUrl} alt={video.title} />
    </RecentVideoContainer>
  );
}

export default RecentVideo;

const RecentVideoContainer = styled.div`
  width: calc(100% / 3);
`;

const ThumbnailImage = styled.image`
  width: 100%;
  height: 180px;
`;
