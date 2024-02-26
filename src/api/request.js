const apiKey = import.meta.env.VITE_APP_YOUTUBE_API_KEY;

const request = {
  getSearchKeyWord: `/search?part=snippet&maxResults=25&q=surfing&key=${apiKey}`,
  getMostPopularVideos: `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${apiKey}`,
  getByChannelId: `/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=${apiKey}`,
  getVidoeId: `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${apiKey}`,
  getI18nRegions: `/i18nRegions?part=snippet&hl=es_MX&key=${apiKey}`,
  getChannelBannerURL: (channelId) => `/channels?part=brandingSettings&id=${channelId}&key=${apiKey}`,

  getVideoSnippet: `/videos?part=snippet&key=${apiKey}`,
  getChannelStatistics: `/channels?part=statistics&key=${apiKey}`,
  getLikedAndCommentApi: `/videos?part=snippet%2Cstatistics&key=${apiKey}`
};

export default request;
