import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMostPopularVideosInChannel } from '../../api/dataApi';

function RecentVideo({ channelId }) {
  const [recentVideos, setRecentVideos] = useState([]);
  // 최근 동영상 정보 불러오기
  useEffect(() => {
    const fetchChannelRecentVideos = async () => {
      try {
        const videos = await getMostPopularVideosInChannel(channelId);
        console.log(videos);
        setRecentVideos(videos);
      } catch (error) {
        console.error('Failed to fetch recent video info:', error.message);
      }
    };
    fetchChannelRecentVideos();
  }, [channelId]);
  return (
    <RecentVideoContainer>
      {recentVideos.map((video) => {
        <ThumbnailImage key={video.id} src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />;
      })}
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
