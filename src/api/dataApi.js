import axios from 'axios';
import request from './request';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_YOUTUBE_BASE_URL_GET,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

// 필요한 정보 - 채널명, 채널썸네일이미지, 구독자수, 평균조회수, (상세페이지? -평균 좋아요수, 평균 댓글 수, 최근 or 인기 영상?)

// NOTE 해시태그# 검색 기능 - get 키워드검색 영상들에대한 채널ID -   input: keyword   output: channelId객체들의 배열
export const readSearchKeyWord = async (keyword) => {
  // ? 키워드에 따라서 q=에 넣을 값 다르게 바꾸기 ('생활'은 다르게 바꿔넣어야할거같다?)
  // TODO categoryId 설정해주기 / 채널중복걸러내기
  // if (keyword == "뷰티") {
  // const videoCategoryId = 26
  //  };
  try {
    const today = new Date();
    const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1)).toISOString(); // 한달 전 날짜 ISO String
    const params = { q: keyword, publishedAfter: oneMonthAgo, maxResults: 15 };
    const videoResponse = await axiosInstance.get(`${request.getSearchKeyWord}`, { params });

    const videoItems = videoResponse.data.items;
    const result = [];

    // NOTE 정보들 - 전역상태관리해야할것같다 RQ 사용해야할듯 여기서 return 후?
    for (const item of videoItems) {
      const channelId = item.snippet.channelId;
      // console.log(item.snippet);
      result.push({ channelId });
      // const channelResponse = await axiosInstance.get(`${request.getChannelSnippetStatistics}&id=${channelId}`);
      // const snippet = channelResponse.data.items[0].snippet;
      // console.log('🚀 ~ readSearchKeyWord ~ snippet:', snippet);
    }
    return result; // [{channelId: '채널id'}, ..]
  } catch (error) {
    console.error('failed to get data by function readSearchKeyWord - ', error.message);
  }
};

// NOTE input: 채널ID  output: 해당 채널 정보 객체
export const getChannelInfoById = async (channelId) => {
  try {
    const channelResponse = await axiosInstance.get(`${request.getChannelSnippetStatistics}&id=${channelId}`);

    const snippet = channelResponse.data.items[0].snippet;
    const channelTitle = snippet.title;
    const description = snippet.description; // 채널설명
    const thumbnailUrl = snippet.thumbnails.medium.url; // 채널 썸네일 url

    const statistics = channelResponse.data.items[0].statistics;
    const initSubscriberCount = statistics.subscriberCount; // 채널 구독자수
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

    return { channelTitle, description, thumbnailUrl, subscriberCount, averageViewCount };
    // 객체담긴 배열 형태로 리턴 - {채널명, 채널설명, 채널썸네일이미지url, 구독자수(천/만), 평균조회수(천/만)}
  } catch (error) {
    console.error('failed to get data by function getChannelInfoById - ', error.message);
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

//get banner from channelId
export const getBanner = async (channelId) => {
  const url = request.getChannelBannerURL(channelId);
  const { data } = await axiosInstance.get(url);
  return data.items[0].brandingSettings.image.bannerExternalUrl();
};

export const readByChannelId = async () => {
  const { data } = await axiosInstance.get(`${request.getByChannelId}&regionCode=KR`);
  return data;
};

export const readVidoeId = async () => {
  const { data } = await axiosInstance.get(`${request.getVidoeId}&regionCode=KR`);
  return data;
};

export const readI18nRegions = async () => {
  const { data } = await axiosInstance.get(request.getI18nRegions);
  return data;
};
