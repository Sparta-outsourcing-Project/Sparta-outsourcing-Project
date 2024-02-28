import { useQuery } from '@tanstack/react-query';
import { getChannelInfoById } from '../api/dataApi';

export const useChannelDetailInfo = (channelId) => {
  return useQuery({
    queryKey: ['channelInfo', channelId],
    queryFn: () => getChannelInfoById(channelId)
  });
};
