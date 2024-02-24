import axios from 'axios';
import requst from './request';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_YOUTUBE_BASE_URL_GET,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

export const readSearchKeyWord = async () => {
  const { data } = await axiosInstance.get(`${requst.getSearchKeyWord}&regionCode=KR`);
  return data;
};

export const readMostPopularVideos = async () => {
  const { data } = await axiosInstance.get(`${requst.getMostPopularVideos}&regionCode=KR`);
  return data.items;
};

export const getMostPopularThumbnails = async (channelId) => {
  const { data } = await axiosInstance.get(`${requst.getByChannelId}&id=${channelId}`);
  return data.items[0].snippet.thumbnails;
};

export const readByChannelId = async () => {
  const { data } = await axiosInstance.get(`${requst.getByChannelId}&regionCode=KR`);
  return data;
};

export const readVidoeId = async () => {
  const { data } = await axiosInstance.get(`${requst.getVidoeId}&regionCode=KR`);
  return data;
};

export const readI18nRegions = async () => {
  const { data } = await axiosInstance.get(requst.getI18nRegions);
  return data;
};
