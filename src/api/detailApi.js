import axios from 'axios';
import request from './request';

export const detailApiInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_YOUTUBE_BASE_URL_GET,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

export const getDetailDataApi = async (videoId) => {
  const response = await detailApiInstance.get(`${request.getLikedAndCommentApi}&id=${videoId}`);
  const video = response.data.items[0];

  // 특정 영상의 댓글 수와 좋아요 수
  const commentCount = video.statistics.commentCount;
  const likeCount = video.statistics.likeCount;

  // 모든 영상의 댓글 수와 좋아요 수 가져오는 방법은 ?

  const channelResponse = await detailApiInstance.get(`${request.getByChannelId}`);
  const videos = channelResponse.data.items;

  let totalCommentCount = 0;
  let totalLikeCount = 0;

  // 각 동영상의 댓글 수와 좋아요 수 합산
  for (const video of videos) {
    const videoId = video.id;
    const videoResponse = await detailApiInstance.get(`${request.getLikedAndCommentApi}&id=${videoId}`);
    const videoStats = videoResponse.data.items[0]?.statistics;

    if (!videoStats) {
      //   console.log(`Statistics not found for video: ${videoId}`);
      continue;
    }

    totalCommentCount += parseInt(videoStats.commentCount);
    totalLikeCount += parseInt(videoStats.likeCount);
  }

  // 유튜버의 모든 동영상의 평균 댓글 수와 좋아요 수 계산
  const averageCommentCount = totalCommentCount / videos.length;
  console.log('댓글', averageCommentCount());
  const averageLikeCount = totalLikeCount / videos.length;
  console.log('좋아요', averageLikeCount());

  return { commentCount, likeCount, averageCommentCount, averageLikeCount };
};
