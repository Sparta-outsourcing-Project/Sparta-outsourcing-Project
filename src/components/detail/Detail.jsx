import styled from 'styled-components';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMostPopularThumbnails, readByChannelId, readMostPopularVideos } from '../../api/dataApi';
import RecentVideo from './RecentVideo';

export default function Detail() {
  const { id } = useParams();
  const [channelInfo, setChannelInfo] = useState(null);
  const [recentVideos, setRecentVideos] = useState([]);

  // channel 정보 가져오기
  useEffect(() => {
    const fetchChannelInfo = async () => {
      try {
        const data = await readByChannelId(id);
        console.log('channel Info', data);
        setChannelInfo(data);
      } catch (error) {
        console.error('Error fetchChannelInfo', error);
      }
    };
    fetchChannelInfo();
  }, [id]);

  // 최근 영상 가져오기 api 호출
  useEffect(() => {
    const fetchRecentVideos = async () => {
      try {
        const videos = await readMostPopularVideos();
        console.log('Recent Videos:', videos); // 데이터 출력
        const thumbnails = await getMostPopularThumbnails(id);
        console.log('Thumbnails:', thumbnails); // 데이터 출력
        setRecentVideos(videos);
      } catch (error) {
        console.error('Error fetchRecentVideos', error);
      }
    };
    fetchRecentVideos();
  }, [id]);

  return (
    <Wrap>
      <Header />
      <TopImage>Top BackGroundImage </TopImage>
      <ProfileContainer>
        <ProfileImage></ProfileImage>
        <YoutuberTitle>{channelInfo.title}</YoutuberTitle>
        <Text>{channelInfo.subscriberNum}</Text>
        <Text>{channelInfo.averageViewNum}</Text>
      </ProfileContainer>
      <LinkToChannel>채널 방문</LinkToChannel>
      <GraphContainer>
        <Graph>그래프 자리</Graph>
        <Table>표 자리</Table>
      </GraphContainer>
      <VideoContainer>
        <RecentVideos>최근 영상</RecentVideos>
        {recentVideos.slice(0, 6).map((video) => {
          <RecentVideo key={video.id} video={video} />;
        })}
      </VideoContainer>
      <Footer />
    </Wrap>
  );
}

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #febe98;
  text-align: center;
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  gap: 50px;
  padding: 10px;
`;
const ProfileImage = styled.image`
  background-color: black;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px;
`;

const YoutuberTitle = styled.span`
  font-size: xx-large;
  font-weight: 800;
`;

const Text = styled.span`
  font-size: large;
`;

const LinkToChannel = styled.button`
  width: 150px;
  border-color: transparent;
  border-radius: 10px;
  height: 40px;

  margin-left: 200px;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 20px;
`;
const Graph = styled.div`
  width: 50%;
  height: 300px;
  background-color: #febe98;
  text-align: center;
`;
const Table = styled.div`
  width: 50%;
  height: 300px;
  background-color: #ff9b62;
  text-align: center;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 300px;
  padding: 20px;
`;

const RecentVideos = styled.span`
  font-size: large;
  padding: 10px;
`;
