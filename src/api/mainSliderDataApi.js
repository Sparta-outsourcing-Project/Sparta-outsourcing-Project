import axios from 'axios';
// 메인 유튜버 영상 슬라이더에 사용될 youtube data api

export const mainSliderDataClient = axios.create({
  baseURL: `https://youtube.googleapis.com/youtube/v3/videos`,
  // videos 까지 쓰고  아래에다 ?부터써줘야만 part=snippet 해당되는 데이터가 뜸
  headers: {
    'Content-Type': 'application/json'
  }
});

// 영상 썸네일 이미지
export const getThumbnail = async (id) => {
  // getThumbnail('영상id')로 사용하기
  const { data } = await mainSliderDataClient.get(`?key=${import.meta.env.VITE_APP_API_KEY}&part=snippet&id=${id}`);
  const thumbnailUrl = data.items[0].snippet.thumbnails.standard.url;
  const a = a;
  return thumbnailUrl;
};

// get 유튜버 이름

// get 구독자 수

// get 평균 시청수 (기간?)
