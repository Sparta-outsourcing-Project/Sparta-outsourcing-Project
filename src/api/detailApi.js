import axios from 'axios';
import request from './request';

export const detailApiInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_YOUTUBE_BASE_URL_GET,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
});

export const getDetailDataApi = async (channelId) => {
  try {
    // 채널 정보를 가져오기 위해 API 호출
    const channelResponse = await detailApiInstance.get(`${request.getChannelDetails}&id=${channelId}`);
    const channel = channelResponse.data.items[0];

    if (!channel) {
      throw new Error(`Channel not found for id: ${channelId}`);
    }

    // 채널의 모든 동영상 가져오기
    const playlistId = channel.contentDetails.relatedPlaylists.uploads;
    const playlistResponse = await detailApiInstance.get(`${request.getPlaylistItems}&playlistId=${playlistId}`);
    const playlistItems = playlistResponse.data.items;

    let totalCommentCount = 0;
    let totalLikeCount = 0;
    let validVideoCount = 0;

    // 각 동영상의 통계 데이터 합산
    for (const video of playlistItems) {
      const videoId = video.snippet.resourceId.videoId;
      const videoResponse = await detailApiInstance.get(`${request.getVideoStatistics}&id=${videoId}`);
      const videoStats = videoResponse.data.items[0]?.statistics;

      if (!videoStats) {
        console.log(`Statistics not found for video: ${videoId}`);
        continue;
      }

      totalCommentCount += parseInt(videoStats.commentCount);
      totalLikeCount += parseInt(videoStats.likeCount);
      validVideoCount++;
    }

    if (validVideoCount === 0) {
      throw new Error('No valid videos found.');
    }

    // 채널의 모든 동영상의 평균 댓글 수와 좋아요 수 계산
    const averageCommentCount = totalCommentCount / validVideoCount;
    const averageLikeCount = totalLikeCount / validVideoCount;

    return { totalCommentCount, totalLikeCount, averageCommentCount, averageLikeCount };
  } catch (error) {
    console.error('Error fetching channel details:', error.message);
    // 오류가 발생한 경우 기본값 또는 오류 처리 로직을 추가할 수 있습니다.
    return { totalCommentCount: 0, totalLikeCount: 0, averageCommentCount: 0, averageLikeCount: 0 };
  }
};
