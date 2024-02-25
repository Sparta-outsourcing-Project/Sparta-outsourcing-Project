import axios from 'axios';
import request from './request';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_YOUTUBE_BASE_URL_GET,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

export const readSearchKeyWord = async () => {
  try {
    const { data } = await axiosInstance.get(`${request.getSearchKeyWord}&regionCode=KR`);
    return data;
  } catch (error) {
    console.error('fail get readSearchKeyWord', error.messege);
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
