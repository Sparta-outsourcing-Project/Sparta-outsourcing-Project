import styled from 'styled-components';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { useEffect, useState } from 'react';
import { getBanner, readByChannelId, readSearchKeyWord } from '../../api/dataApi';
import { getDetailDataApi } from '../../api/detailApi';

export default function Detail() {
  // const { id } = useParams();

  const [channelInfo, setChannelInfo] = useState(null);
  const [detailInfo, setDetailInfo] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [chnnelLink, setChannelLink] = useState('');

  // channel 정보 불러오기
  useEffect(() => {
    console.log('useEffect 도는 중');
    const fetchChannelInfo = async () => {
      try {
        const channelData = await readSearchKeyWord(`쯔양`);
        // console.log(channelData[1]);
        const specificChannel = channelData[1];
        setChannelInfo(specificChannel);
      } catch (error) {
        console.error('Failed to fetch channel info:', error.message);
      }
    };
    fetchChannelInfo();
  }, []);

  // channelId로 채널 정보 데이터 불러오기
  // useEffect(() => {
  //   const fetchChannelInfo = async (channelId) => {
  //     try {
  //       const channelData = await getChannelInfoById(`${channelId}`);

  //       setChannelInfo(channelData);
  //     } catch (error) {
  //       console.error('Failed to fetch channel info:', error.message);
  //     }
  //   };
  //   fetchChannelInfo();
  // }, []);

  // 댓글수, 좋아요 수 불러오기
  useEffect(() => {
    console.log('useEffect 도는 중');
    const fetchDetailInfo = async () => {
      try {
        const detailData = await getDetailDataApi('OzHPMTZXs8U');
        // console.log(detailData);
        setDetailInfo(detailData);
      } catch (error) {
        console.error('Failed to fetch detail info:', error.message);
      }
    };
    fetchDetailInfo();
  }, []);

  // banner url 불러오기
  useEffect(() => {
    console.log('useEffect 도는 중');
    const fetchBanner = async () => {
      try {
        if (channelInfo) {
          const bannerImage = await getBanner('UCfpaSruWW3S4dibonKXENjA');
          // const bannerImage = await getBanner(`${channelId}`);
          setBannerUrl(bannerImage);
        }
      } catch (error) {
        console.error('Failed to fetch banner:', error.message);
      }
    };
    fetchBanner();
  }, [channelInfo]);

  useEffect(() => {
    console.log('useEffect 도는 중');
    const fetchChannelLink = async () => {
      const getChannelInfo = await readByChannelId();
      const getChannelLink = getChannelInfo.items[0].snippet.customUrl;

      setChannelLink(getChannelLink);
    };
    fetchChannelLink();
  }, []);

  // 채널 방문 버튼 클릭시, 채널 페이지로 이동

  const onChannelBtnClickHandler = () => {
    const youtubeURL = `https://www.youtube.com/${chnnelLink}`;
    window.open(youtubeURL, '_blank');
  };
  return (
    <Wrap>
      <Header />
      <BannerContainer>
        <BannerImage src={bannerUrl} alt="Banner Image" />
      </BannerContainer>

      <ProfileContainer>
        <ProfileImage src={channelInfo?.thumbnailUrl} alt="Channel Thumbnail" />
        {channelInfo && (
          <>
            <YoutuberTitle>{channelInfo.channelTitle}</YoutuberTitle>
            <Text>구독자 {channelInfo.subscriberCount}</Text>
            <Text>영상 평균 조회수 {channelInfo.averageViewCount}</Text>
          </>
        )}
      </ProfileContainer>
      <LinkToChannel onClick={onChannelBtnClickHandler}>채널 방문</LinkToChannel>
      <GraphContainer>
        <Graph>
          <h2>오각형 방사형 그래프</h2>
        </Graph>
        <Table>
          테이블 자리
          {channelInfo && (
            <>
              <Text>구독자 수 {channelInfo.subscriberCount} 명</Text>
              <Text>영상 평균 조회수 {channelInfo.averageViewCount} 회</Text>
            </>
          )}
          {detailInfo && (
            <>
              <Text>특정 영상 좋아요 수 {detailInfo.likeCount} 개</Text>
              <Text>특정 영상 댓글 수 {detailInfo.commentCount} 개</Text>
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

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 300px;
`;

const BannerImage = styled.img`
  text-align: center;
  width: 100%;
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
