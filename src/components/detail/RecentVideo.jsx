import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUpLoadPlayListId, getUpLoadPlayLists } from '../../api/dataApi';
import { getDetailDataApi } from '../../api/dataApi';

function RecentVideo({ channelId }) {
  const [recentVideos, setRecentVideos] = useState([]);
  const [playListId, setPlayListId] = useState('');
  const [videoDetailInfo, setVideoDetailInfo] = useState([]);

  // playListId 가져오기
  useEffect(() => {
    const fetchPlayListId = async () => {
      try {
        const getPlayListId = await getUpLoadPlayListId(channelId);

        setPlayListId(getPlayListId);
      } catch (error) {
        console.error('Failed to fetch playlistId', error.message);
      }
    };
    fetchPlayListId();
  }, [channelId]);

  // playListId로 최근 동영상 가져오기
  useEffect(() => {
    const fetchChannelRecentVideos = async () => {
      try {
        const videos = await getUpLoadPlayLists(playListId);
        const recentVideoList = videos.items;
        // console.log(recentVideoList);
        setRecentVideos(recentVideoList);
      } catch (error) {
        console.error('Failed to fetch recent video info:', error.message);
      }
    };
    fetchChannelRecentVideos();
  }, [playListId]);

  // videoId로 해당 Video의 조회수, 댓글수, 좋아요수 가져오기

  useEffect(() => {
    const fetchVideoStatisticInfo = async () => {
      try {
        const videoIds = recentVideos.map((video) => video.snippet.resourceId.videoId);
        // console.log(videoIds);
        const videoDetailsPromise = videoIds.map((videoId) => getDetailDataApi(videoId));
        const videoDetails = await Promise.all(videoDetailsPromise);
        // console.log(videoDetails);
        setVideoDetailInfo(videoDetails);
        // console.log(videoDetailInfo);
      } catch (error) {
        console.error('Failed to fetch Video Detail Info', error.message);
      }
    };
    fetchVideoStatisticInfo();
  }, [recentVideos]);

  const finalVideoDetailInfo = videoDetailInfo.reduce(function (acc, curr) {
    return acc.concat(curr);
  }, []);
  //   console.log(finalVideoDetailInfo);

  // 영상 썸네일 이미지 클릭시, 해당 영상 링크로 이동
  const linkToVideoBtnClickHandler = (videoId) => {
    const youtubeURL = `https://www.youtube.com/shorts/${videoId}`;
    window.open(youtubeURL, '_blank');
  };

  return (
    <RecentVideoContainer>
      {finalVideoDetailInfo.map((video) => {
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
                    <TextStyle>👁️ {video.statistics.viewCount}</TextStyle>
                    <TextStyle>👍 {video.statistics.likeCount}</TextStyle>
                    <TextStyle>💬 {video.statistics.commentCount}</TextStyle>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
`;

const ThumbnailImageWrap = styled.div`
  height: 180px;
  width: calc(100% - 3rem);
  height: 180px;
  & > img {
    border-radius: 1rem;
    width: 100%;
    height: 100%;
  }
  cursor: pointer;
`;
const VideoTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
