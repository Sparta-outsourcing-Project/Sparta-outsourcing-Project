import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBanner, getMostChannelInfo } from '../../api/dataApi';
import { useChannelDetailInfo } from '../../hooks/useChannelDetailInfo';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Loading from '../layout/Loading';
import AdSuggestBtn from './AdSuggestBtn';
import RecentVideo from './RecentVideo';
import TwoLevelPieChart from './TwoLevelPieChart';

export default function Detail() {
  const params = useParams();
  const channelId = params.id;

  /* useChannelDetailInfo 커스텀훅으로부터 데이터 불러오기 */
  const {
    data: channelInfo,
    isLoading: isChannelInfoLoading,
    error: channelInfoError
  } = useChannelDetailInfo(channelId);

  /* banner url 불러오기 -> React Query로 */
  const {
    data: bannerUrl,
    isLoading: isBannerUrlLoading,
    error: bannerUrlError
  } = useQuery({
    queryKey: ['bannerUrl', channelId, channelInfo],
    queryFn: () => getBanner(channelId)
  });

  const formattedBannerUrl = `${bannerUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`;

  // 채널 방문 link 불러오기 -> React Query로
  const {
    data: channelLink,
    isLoading: isChannelLinkLoading,
    error: channelLinkError
  } = useQuery({
    queryKey: ['channelLink', channelId],
    queryFn: () => getMostChannelInfo(channelId)
  });

  /* 채널 방문 버튼 클릭시, 채널 페이지로 이동 */

  const onChannelBtnClickHandler = () => {
    const youtubeURL = `https://www.youtube.com/${channelLink}`;
    window.open(youtubeURL, '_blank');
  };

  /* 채널 정보 */

  // 채널 총 영상수
  const formattedVideoCount = channelInfo ? parseInt(channelInfo.videoCount).toLocaleString() : '';
  // 채널 총 조회수
  const initialViewCount = channelInfo ? parseInt(channelInfo.viewCount).toLocaleString() : 0;
  //  구독자 수
  const subscriberNum = channelInfo ? parseInt(channelInfo.initSubscriberCount).toLocaleString() : 0;
  //  영상 평균 조회수
  const averageVideoViewCount = channelInfo ? Math.ceil(channelInfo.initAverageViewCount).toLocaleString() : 0;

  if (isChannelInfoLoading || isBannerUrlLoading || isChannelLinkLoading) return <Loading />;
  if (channelInfoError || bannerUrlError || channelLinkError)
    return <div>Error: {channelInfoError?.message || bannerUrlError?.message || channelLinkError?.message}</div>;

  return (
    <Wrap>
      <Header />
      <BannerContainer>{bannerUrl ? <BannerImage src={formattedBannerUrl} alt="Banner Image" /> : ''}</BannerContainer>
      <BottomContainer>
        <DetailInfoContainer>
          <ChannelInfoContainer>
            <ProfileContainer>
              <ProfileImage src={channelInfo?.thumbnailUrl} alt="Channel Thumbnail" />
              {channelInfo && (
                <>
                  <YoutuberTitle>{channelInfo.channelTitle}</YoutuberTitle>
                  <Text>
                    구독자 <h3>{channelInfo.subscriberCount}</h3>
                  </Text>
                  <Text>
                    영상 평균 조회수 <h3>{channelInfo.averageViewCount}</h3>
                  </Text>
                </>
              )}
            </ProfileContainer>
            {channelInfo && (
              <>
                <ChannelDescription> {channelInfo.description} </ChannelDescription>
              </>
            )}
            <ButtonWrap>
              <ButtonStyle onClick={onChannelBtnClickHandler}>채널 방문</ButtonStyle>

              <AdSuggestBtn />
            </ButtonWrap>
          </ChannelInfoContainer>
          <GraphContainer>
            <Graph>
              <span style={{ fontSize: 'larger' }}> 채널 분석</span>
              <TwoLevelPieChart channelId={channelId} />
            </Graph>
            <Table>
              <span style={{ fontSize: 'larger' }}> 채널 정보</span>
              {channelInfo && (
                <TableTextWrap>
                  <TableText>
                    구독자 수 <h3>{subscriberNum} 명</h3>
                  </TableText>
                  <TableText>
                    영상 평균 조회수 <h3 style={{ marginLeft: '50px' }}>{averageVideoViewCount} 회</h3>
                  </TableText>
                  <TableText>
                    총 영상수 <h3>{formattedVideoCount} 개</h3>
                  </TableText>
                  <TableText>
                    총 조회수 <h3>{initialViewCount} 회</h3>
                  </TableText>
                </TableTextWrap>
              )}
            </Table>
          </GraphContainer>
          <VideoContainer>
            <RecentVideoTitle>최근 영상 </RecentVideoTitle>
            <RecentVideo channelId={channelId} />
          </VideoContainer>
        </DetailInfoContainer>
      </BottomContainer>
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
  background-color: #febe98; // 배너이미지가 없는 경우 배경색깔 주기
`;

const BannerImage = styled.img`
  text-align: center;
  width: 100%;
`;
const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const DetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChannelInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1280px;
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
  color: #6e6e6e;

  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.5rem;
  > h3 {
    font-size: x-large;
  }
`;

const ChannelDescription = styled.p`
  margin: 0 200px;
  width: 960px;
  font-size: large;
  line-height: 1.5;
`;
const ButtonStyle = styled.button`
  width: 150px;
  border-color: transparent;
  border-radius: 10px;
  height: 40px;
  margin: 30px 0;
  font-weight: 600;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: 200px;
`;
const GraphContainer = styled.div`
  /* border: 1px solid black; */
  border-radius: 50px;

  width: 1280px;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 20px;
  margin: 20px 200px;
`;

const Graph = styled.div`
  width: 50%;
  height: 300px;
  /* border: 1px solid black; */
  border-radius: 10px;
  text-align: center;
`;

const Table = styled.div`
  width: 50%;
  height: 300px;
  /* border: 1px solid black; */
  border-radius: 10px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TableTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
`;
const TableText = styled.span`
  font-size: large;
  font-weight: 600;
  padding: 5px;
  color: #6e6e6e;

  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.5rem;
  > h3 {
    font-size: x-large;
    margin-left: 100px;
  }
`;

const VideoContainer = styled.div`
  width: 100%;

  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RecentVideoTitle = styled.div`
  font-size: x-large;
  padding: 10px;
  font-weight: 600;
  width: 1280px;
`;
