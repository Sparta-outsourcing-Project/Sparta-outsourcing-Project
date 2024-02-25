import { useQuery } from '@tanstack/react-query';
import { readMostPopularVideos } from '../api/dataApi';

export const useMostPopularVideos = () => {
  return useQuery({
    queryKey: ['mostPopularVideos'],
    queryFn: readMostPopularVideos
  });
};

// export const useChannelThumbnails = (channelId) => {
//   return useQuery({
//     queryKey: ['channelThumbnails', channelId],
//     queryFn: () => getMostPopularThumbnails(channelId),
//     enabled: !!channelId
//   });
// };
