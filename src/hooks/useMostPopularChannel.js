import { useQuery } from '@tanstack/react-query';
import { readMostPopularVideos } from '../api/dataApi';

export const useMostPopularVideos = () => {
  return useQuery({
    queryKey: ['mostPopularVideos'],
    queryFn: readMostPopularVideos
  });
};
