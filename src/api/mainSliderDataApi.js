import axios from 'axios';
import request from './request';
// 메인페이지 BodySlider - 유튜버 영상 슬라이더에 사용될 youtube data api

export const mainSliderDataClient = axios.create({
  baseURL: import.meta.env.VITE_APP_YOUTUBE_BASE_URL_GET,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

// input: 영상id   output: 영상썸네일이미지url 및 해당 채널 정보가 담긴 객체
export const getVideoChannelDatabyId = async (videoId) => {
  // 영상id 한번만 받아서 채널id까지 찾을 수 있으니 한번에 채널id로 연결시켜서 채널id통해 유튜버(채널)명, 구독자수 등 객체로 전달해주기
  try {
    const videoResponse = await mainSliderDataClient.get(`${request.getVideoSnippet}&id=${videoId}`);
    // console.log(videoResponse.data);
    const snippet = videoResponse.data.items[0].snippet;
    const channelId = snippet.channelId; // 영상 id통해 채널 id 얻기
    const channelTitle = snippet.channelTitle; // 채널명 (유튜버명)
    const thumbnailUrl = snippet.thumbnails.standard.url; // 영상 썸네일이미지 url

    // 위의 받은 채널 id 사용
    const channelResponse = await mainSliderDataClient.get(`${request.getChannelStatistics}&id=${channelId}`);
    // console.log(channelResponse.data);

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

    return { channelTitle, thumbnailUrl, subscriberCount, averageViewCount };
    // 채널명(유튜버명), 영상썸네일이미지url, 채널구독자수(만 단위), 채널평균조회수(만 단위)
  } catch (error) {
    console.error('fail to get data by function getVideoChannelDatabyId', error.message);
  }
};
