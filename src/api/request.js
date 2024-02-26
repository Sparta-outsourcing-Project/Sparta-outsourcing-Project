const apiKey = import.meta.env.VITE_APP_YOUTUBE_API_KEY;
const videoSnippetFields = 'items(snippet(channelId,channelTitle,thumbnails(standard)))';
const channelStatisticsFields = 'items(statistics(subscriberCount,videoCount,viewCount))';

const request = {
  getSearchKeyWord: `/search?part=snippet&type=video&order=viewCount&regionCode=KR&key=${apiKey}`,
  getMostPopularVideos: `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${apiKey}`,
  getByChannelId: `/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=${apiKey}`,
  getVidoeId: `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${apiKey}`,
  getI18nRegions: `/i18nRegions?part=snippet&hl=es_MX&key=${apiKey}`,
  getChannelBannerURL: (channelId) => `/channels?part=brandingSettings&id=${channelId}&key=${apiKey}`,

  getVideoSnippet: `/videos?part=snippet&key=${apiKey}&fields=${videoSnippetFields}`,
  getChannelStatistics: `/channels?part=statistics&key=${apiKey}&fields=${channelStatisticsFields}`,
  getChannelSnippetStatistics: `/channels?part=snippet,statistics&key=${apiKey}`
};

export default request;
