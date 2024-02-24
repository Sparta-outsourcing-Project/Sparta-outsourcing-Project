import axios from 'axios';

export const analyticsClient = axios.create({
  baseURL: `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&startDate=2017-01-01&endDate=2024-02-01&maxResults=3&key=${
    import.meta.VITE_APP_API_KEY
  }`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAnalytics = async () => {
  const { data } = await analyticsClient.get('/');
  // 일부러 에러내보기 throw new Error("에러메세지");
  console.log(data);
  return data;
};
