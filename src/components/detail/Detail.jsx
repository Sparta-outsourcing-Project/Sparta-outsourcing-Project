import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getBanner, getMostChannelInfo } from '../../api/dataApi';
import {
  useChannelDetailInfo,
  useChannelRecentVideos,
  usePlayListId,
  useVideoStatisticInfo
} from '../../hooks/useChannelDetailInfo';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Loading from '../layout/Loading';
import RecentVideo from './RecentVideo';
import TwoLevelPieChart from './TwoLevelPieChart';
import { useEffect, useState } from 'react';
import { addFavoriteChannel, fetchIsFavorite, removeFavoriteChannel } from '../../api/favorites';
import { useSelector } from 'react-redux';
import nonFavImg from '../../assets/emptyStar.png';
import favImg from '../../assets/coloredStar.png';

export default function Detail() {
  const params = useParams();
  const channelId = params.id;
  const [favorite, setFavorite] = useState(false);
  const [userUid, setUserUid] = useState('');
  const isLogin = useSelector((state) => state.loginReducer);

  useEffect(() => {
    if (sessionStorage.getItem('uid')) {
      setUserUid(sessionStorage.getItem('uid'));
    }
  }, [isLogin]);

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

  const totalViewNum = channelInfo?.viewCount;

  const initialTotalViewCount = Number(totalViewNum);
  const simpleViewCount = (initialViewCount) => {
    let formattedViewCount;
    if (initialViewCount > 100000000) {
      formattedViewCount = Math.round(initialViewCount / 10000000) / 10 + '억';
    } else if (initialViewCount > 10000) {
      formattedViewCount = Math.round(initialViewCount / 10000) + '만';
    } else if (initialViewCount > 1000) {
      formattedViewCount = Math.round(initialViewCount / 1000) + '천';
    } else {
      formattedViewCount = initialViewCount.toString();
    }
    return formattedViewCount; // 함수가 값을 반환하도록 수정
  };

  // 최근 채널 내 최근 50개 영상 불러오기
  // playListId 가져오기
  const { data: playListId } = usePlayListId(channelId);
  // playListId로 최근 동영상 가져오기
  const { data: recentVideos } = useChannelRecentVideos(playListId);
  // videoId로 해당 Video의 조회수, 댓글수, 좋아요수 가져오기
  const { data: videoDetailInfo } = useVideoStatisticInfo(recentVideos);
  // 사용 가능한 video array로 형태 변경하기
  const finalVideoDetailInfo = videoDetailInfo?.reduce(function (acc, curr) {
    return acc.concat(curr);
  }, []);

  // 속성에 따라 반복되는 함수 하나로 만들기
  const mapPropertyToArray = (videos, property) => {
    return videos?.map((video) => video.statistics[property]);
  };

  // finalVideoDetailInfo를 사용하여 각 속성에 대한 배열 생성
  const commentCount = mapPropertyToArray(finalVideoDetailInfo, 'commentCount');
  const likeCount = mapPropertyToArray(finalVideoDetailInfo, 'likeCount');
  const viewCount = mapPropertyToArray(finalVideoDetailInfo, 'viewCount');
  // console.log(commentCount, likeCount, viewCount);

  // 최근 50개 동영상 평균값 구하기 함수 (평균 댓글수, 평균 좋아요수, 평균 조회수)
  const calculateAverage = (array) => {
    const sum = array?.map(Number).reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    const averageCount = array ? sum / array.length : 0;
    return averageCount;
  };
  const averageCommentCount = Math.round(calculateAverage(commentCount));
  const averageLikeCount = Math.round(calculateAverage(likeCount));
  const averageViewCount = Math.round(calculateAverage(viewCount));

  // 기존 즐겨찾기 데이터 가져와서 별표 뜨게하기 => RQ
  const {
    data: favoriteChannels,
    isLoading: isFavoriteChannelsLoading,
    error: favoriteChannelsError
    // } = userUid ? useQuery({
  } = useQuery({
    queryKey: ['favoriteChannels', userUid, favorite],
    queryFn: () => fetchIsFavorite(userUid)
  });
  // : { data: [], isLoading: false, error: null };

  useEffect(() => {
    if (userUid) {
      favoriteChannels?.includes(channelId) ? setFavorite(true) : setFavorite(false);
    }
  }, [userUid, favorite, favoriteChannels, isLogin]);

  const toggleFavoriteClick = async () => {
    // 비유저이면
    if (isLogin) {
      if (!favorite) {
        // 추가
        try {
          await addFavoriteChannel(userUid, channelId);
          setFavorite(true);
        } catch (error) {
          alert('즐겨찾기 추가가 제대로 되지 않았어요. 다시 시도해주세요 !');
        }
      } else {
        // 삭제(해제)
        try {
          await removeFavoriteChannel(userUid, channelId);
          setFavorite(false);
        } catch (error) {
          alert('즐겨찾기 삭제가 제대로 되지 않았어요. 다시 시도해주세요 !');
        }
      }
    } else {
      // 비회원
      alert('즐겨찾기 기능을 이용하시려면 로그인해주세요 !');
    }
  };

  // error handling
  if (isChannelInfoLoading || isBannerUrlLoading || isChannelLinkLoading || isFavoriteChannelsLoading)
    return <Loading />;
  if (channelInfoError || bannerUrlError || channelLinkError || favoriteChannelsError)
    return (
      <div>
        Error:
        {channelInfoError?.message ||
          bannerUrlError?.message ||
          channelLinkError?.message ||
          favoriteChannelsError?.message}
      </div>
    );

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
                  <Text>
                    채널 영상 총 조회수 <h3>{simpleViewCount(initialTotalViewCount)}</h3>
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
              <ButtonStyle onClick={onChannelBtnClickHandler} style={{ backgroundColor: ' #febe98' }}>
                채널 방문
              </ButtonStyle>
              <ButtonStyle>
                <FavoriteBox onClick={toggleFavoriteClick}>
                  <FavStar src={favorite ? favImg : nonFavImg} width={20} />
                  <p> &nbsp; 즐겨찾기 {favorite ? `해제` : `추가`}</p>
                </FavoriteBox>
              </ButtonStyle>
            </ButtonWrap>
          </ChannelInfoContainer>
          <GraphContainer>
            <Graph>
              <span style={{ fontSize: 'larger' }}> 채널 분석</span>
              <TwoLevelPieChart
                channelId={channelId}
                averageCommentCount={averageCommentCount}
                averageLikeCount={averageLikeCount}
                averageViewCount={averageViewCount}
              />
            </Graph>
            <Table>
              <span style={{ fontSize: 'larger' }}> 채널 세부 정보</span>
              {channelInfo && (
                <TableTextWrap>
                  <LineWrap>
                    <ColorCircle></ColorCircle>
                    <TableText>
                      총 영상수 <h3>{formattedVideoCount} 개</h3>
                    </TableText>
                  </LineWrap>
                  <LineWrap>
                    <ColorCircle></ColorCircle>
                    <TableText>
                      총 조회수 <h3>{initialViewCount} 회</h3>
                    </TableText>
                  </LineWrap>
                  <LineWrap>
                    <ColorCircle style={{ backgroundColor: '#febe98' }}></ColorCircle>
                    <TableText>
                      구독자 수 <h3>{subscriberNum} 명</h3>
                    </TableText>
                  </LineWrap>
                  <br />
                  <LineWrap>
                    <ColorCircle style={{ backgroundColor: '#f9d46e' }}></ColorCircle>
                    <TableText>
                      채널 영상 평균 조회수 <h3 style={{ marginLeft: '43px' }}>{averageVideoViewCount} 회</h3>
                    </TableText>
                  </LineWrap>
                  <LineWrap>
                    <ColorCircle style={{ backgroundColor: '#B1C381' }}></ColorCircle>
                    <TableText>
                      최근 영상 평균 조회수
                      <h3 style={{ marginLeft: '43px' }}>{parseInt(averageViewCount).toLocaleString()} 회</h3>
                    </TableText>
                  </LineWrap>

                  <br />
                  <LineWrap>
                    <ColorCircle style={{ backgroundColor: '#dadada' }}></ColorCircle>
                    <TableText>
                      최근 영상 평균 좋아요수
                      <h3 style={{ marginLeft: '25px' }}>{parseInt(averageLikeCount).toLocaleString()} 개</h3>
                    </TableText>
                  </LineWrap>
                  <LineWrap>
                    <ColorCircle style={{ backgroundColor: '#bfbebe' }}></ColorCircle>
                    <TableText>
                      최근 영상 평균 댓글수
                      <h3 style={{ marginLeft: '43px' }}>{parseInt(averageCommentCount).toLocaleString()} 개</h3>
                    </TableText>
                  </LineWrap>
                </TableTextWrap>
              )}
            </Table>
          </GraphContainer>
          <VideoContainer>
            <RecentVideoTitle>최근 영상 </RecentVideoTitle>
            <RecentVideo channelId={channelId} finalVideoDetailInfo={finalVideoDetailInfo} />
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
  color: #5c5c5c;

  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.5rem;
  > h3 {
    font-size: x-large;
    color: red;
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
  border-radius: 50px;

  width: 1280px;
  padding: 1rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 20px 0;
`;

const Graph = styled.div`
  width: 50%;
  height: 300px;

  border-radius: 10px;
  text-align: center;
`;

const Table = styled.div`
  width: 50%;
  height: 300px;

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
const LineWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ColorCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
`;
const TableText = styled.span`
  font-size: large;
  font-weight: 600;
  padding: 5px;
  color: #2a2a2a;

  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.5rem;
  > h3 {
    font-size: x-large;
    margin-left: 130px;
  }
`;

const VideoContainer = styled.div`
  width: 1280px;

  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RecentVideoTitle = styled.div`
  font-size: x-large;
  padding: 20px;
  font-weight: 600;
  width: 1280px;
`;

const FavoriteBox = styled.div`
  display: flex;
  padding: 0.1rem;
  justify-content: center;
`;
const FavStar = styled.img`
  height: 20px;
  cursor: pointer;
`;
