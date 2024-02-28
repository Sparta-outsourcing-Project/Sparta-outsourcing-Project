import { useQuery } from '@tanstack/react-query';
import { getChannelInfoById, getDetailDataApi, getUpLoadPlayListId, getUpLoadPlayLists } from '../api/dataApi';

// channelId로 채널 정보 불러오기
export const useChannelDetailInfo = (channelId) => {
  return useQuery({
    queryKey: ['channelInfo', channelId],
    queryFn: () => getChannelInfoById(channelId)
  });
};

// playListId 가져오기
export const usePlayListId = (channelId) => {
  return useQuery({
    queryKey: ['playListId', channelId],
    queryFn: () => getUpLoadPlayListId(channelId)
  });
};

// playListId로 최근 동영상 가져오기
export const useChannelRecentVideos = (playListId) => {
  return useQuery({
    queryKey: ['recentVideos', playListId],
    queryFn: async () => {
      const videos = await getUpLoadPlayLists(playListId);
      const recentVideos = videos.items;
      return recentVideos;
    }
  });
};
// playListId로 불러온 최근 영상들의 조회수, 댓글수, 좋아요수 videoId로 가져오기
export const useVideoStatisticInfo = (recentVideos) => {
  return useQuery({
    queryKey: ['videoDetailInfo', recentVideos],
    queryFn: async () => {
      const videoIds = recentVideos.map((video) => video.snippet.resourceId.videoId);
      const videoDetailsPromise = videoIds.map((videoId) => getDetailDataApi(videoId));
      const videoDetailInfo = await Promise.all(videoDetailsPromise);
      return videoDetailInfo;
    }
  });
};
