import styled from 'styled-components';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { useEffect, useState } from 'react';
import { getVideoChannelDatabyId } from '../../api/mainSliderDataApi';
// import { getDetailDataApi } from '../../api/detailApi';

export default function Detail() {
  // const { id } = useParams();
  const [channelInfo, setChannelInfo] = useState(null);
  // const [detailInfo, setDetailInfo] = useState(null);
  // const [recentVideos, setRecentVideos] = useState([]);

  // channel 정보 가져오기
  useEffect(() => {
    const fetchChannelInfo = async () => {
      const channelData = await getVideoChannelDatabyId('OzHPMTZXs8U');
      console.log('Channel Data', channelData);
      setChannelInfo(channelData);

      // setRecentVideos(channelData.recentVideos);
    };

    fetchChannelInfo();
  }, []);

  // 댓글수, 좋아요 수 정보 가져오기
  // useEffect(() => {
  //   const likedAndCommentApi = async () => {
  //     const detailData = await getDetailDataApi('OzHPMTZXs8U');
  //     console.log('detailData', detailData);
  //     setDetailInfo(detailData);
  //   };
  //   likedAndCommentApi();
  // }, []);

  return (
    <Wrap>
      <Header />
      <TopImage>Top BackGroundImage </TopImage>
      <ProfileContainer>
        <ProfileImage></ProfileImage>
        {channelInfo && (
          <>
            <YoutuberTitle>{channelInfo.channelTitle}</YoutuberTitle>
            <Text>구독자 {channelInfo.subscriberCount}</Text>
            <Text>영상 평균 조회수 {channelInfo.averageViewCount}</Text>
          </>
        )}
      </ProfileContainer>
      <LinkToChannel>채널 방문</LinkToChannel>
      <GraphContainer>
        <Graph>그래프 자리</Graph>
        <Table>
          테이블 자리
          {channelInfo && (
            <>
              <Text>구독자 수 {channelInfo.subscriberCount}</Text>
              <Text>영상 평균 조회수 {channelInfo.averageViewCount}</Text>
              {/* <Text>평균 좋아요 수 {detailInfo.likeCount}</Text>
              <Text>평균 댓글 수 {detailInfo.commentCount}</Text> */}
              <Text>광고 실적 {channelInfo.subscriberCount}</Text>
            </>
          )}
        </Table>
      </GraphContainer>
      <VideoContainer>
        <RecentVideos>최근 영상</RecentVideos>
        {/* {recentVideos.slice(0, 6).map((video) => {
          <RecentVideo key={video.channelId} video={video} />;
        })} */}
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
const ProfileImage = styled.img`
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
  font-weight: 600;
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

  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
