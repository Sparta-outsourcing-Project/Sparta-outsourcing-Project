import axios from 'axios';
import request from './request';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_YOUTUBE_BASE_URL_GET,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

// NOTE 해시태그# 검색 기능 - get 키워드검색 영상들에대한 채널ID -   input: keyword   output: 채널 정보 객체들이 담긴 배열
export const readSearchKeyWord = async (keyword) => {
  try {
    const today = new Date();
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1)).toISOString(); // 한달 전 날짜 ISO String
    const params = { q: keyword, publishedAfter: oneMonthAgo, maxResults: 15 };
    const videoResponse = await axiosInstance.get(`${request.getSearchKeyWord}`, { params });
    const videoItems = videoResponse.data.items;
    const result = [];

    for (const item of videoItems) {
      const channelId = item.snippet.channelId;
      const channelInfo = await getChannelInfoById(channelId);
      result.push({ channelId, ...channelInfo });
    }
    return result; // 객체담긴 배열 형태로 리턴 - {채널ID, 채널명, 채널설명, 채널썸네일이미지url, 구독자수(천/만), 평균조회수(천/만)}
  } catch (error) {
    console.error('Failed to get data by function readSearchKeyWord - ', error.message);
  }
};

// NOTE input: 채널ID  output: 해당 채널 정보 객체
export const getChannelInfoById = async (channelId) => {
  try {
    const channelResponse = await axiosInstance.get(`${request.getChannelSnippetStatistics}&id=${channelId}`);

    const snippet = channelResponse.data.items[0].snippet;
    const channelTitle = snippet.title;
    const description = snippet.description;
    const thumbnailUrl = snippet.thumbnails.medium.url;

    const statistics = channelResponse.data.items[0].statistics;
    const initSubscriberCount = statistics.subscriberCount;
    const videoCount = statistics.videoCount; // 채널 총 영상수
    const viewCount = statistics.viewCount; // 채널 총 조회수(모든 영상 조회수의 합)
    const initAverageViewCount = viewCount / videoCount; // (일반적인) 채널 평균 조회수 (총 조회수 / 총 영상 수)

    const subscriberCount =
      initSubscriberCount > 10000
        ? Math.round(initSubscriberCount / 10000) + '만'
        : Math.round((initSubscriberCount / 1000) * 10) / 10 + '천';
    const averageViewCount =
      initAverageViewCount > 10000
        ? Math.round(initAverageViewCount / 10000) + '만'
        : Math.round((initAverageViewCount / 1000) * 10) / 10 + '천';

    return {
      channelTitle,
      description,
      thumbnailUrl,
      subscriberCount,
      averageViewCount,
      viewCount,
      videoCount,
      initSubscriberCount,
      initAverageViewCount
    };
    // 객체담긴 배열 형태로 리턴 - {채널명, 채널설명, 채널썸네일이미지url, 구독자수(천/만), 평균조회수(천/만), 채널 총 조회수, 채널 총 영상수}
  } catch (error) {
    console.error('Failed to get data by function getChannelInfoById - ', error.message);
    throw error;
  }
};

export const readMostPopularVideos = async () => {
  const { data } = await axiosInstance.get(`${request.getMostPopularVideos}&regionCode=KR`);
  return data.items;
};

export const getMostPopularThumbnails = async (channelId) => {
  const { data } = await axiosInstance.get(`${request.getByChannelId}&id=${channelId}`);
  return data.items[0].snippet.thumbnails;
};

// channel Url
export const getMostChannelInfo = async (channelId) => {
  const { data } = await axiosInstance.get(`${request.getByChannelId}&id=${channelId}`);
  // console.log(data);
  return data.items[0].snippet.customUrl;
};

//get banner from channelId
export const getBanner = async (channelId) => {
  try {
    const url = request.getChannelBannerURL(channelId);
    const { data } = await axiosInstance.get(url);
    // 배너 이미지가 없는 경우 brandingSettings에 image키 자체가 X - 없는 경우 빈문자열로 반환
    return data.items[0].brandingSettings.image ? data.items[0].brandingSettings.image.bannerExternalUrl : '';
  } catch (error) {
    console.error('failed to fetch getBanner', error.message);
    throw error;
  }
};

export const readByChannelId = async (channelId) => {
  const { data } = await axiosInstance.get(`${request.getByChannelId}&id=${channelId}`);
  console.log(data);
  return data;
};

export const readVideoId = async (channelId) => {
  const { data } = await axiosInstance.get(`${request.getVidoeId}&regionCode=KR&id=${channelId}`);
  return data;
};

export const readI18nRegions = async () => {
  const { data } = await axiosInstance.get(request.getI18nRegions);
  return data;
};

//get UploadPlayListId
export const getUpLoadPlayListId = async (channelId) => {
  const url = request.getChannelVideos(channelId);
  const { data } = await axiosInstance.get(url);
  return data.items[0].contentDetails.relatedPlaylists.uploads;
};

export const getUpLoadPlayLists = async (uploadPlaylistId) => {
  const url = request.getPlayListVideo(uploadPlaylistId);
  const { data } = await axiosInstance.get(url);
  return data;
};

// videoId로 좋아요, 댓글수, 조회수 등 가져오기
export const getDetailDataApi = async (videoId) => {
  const { data } = await axiosInstance.get(`${request.getLikedAndCommentApi}&id=${videoId}`);
  return data.items;
};
