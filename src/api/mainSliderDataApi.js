import axios from 'axios';
// 메인 유튜버 영상 슬라이더에 사용될 youtube data api

export const mainSliderDataClient = axios.create({
  baseURL: `https://youtube.googleapis.com/youtube/v3`,
  // https://youtube.googleapis.com/youtube/v3/channels?
  // videos 까지 쓰고  아래에다 ?부터써줘야만 part=snippet 해당되는 데이터가 뜸
  headers: {
    'Content-Type': 'application/json'
  }
});

// 영상 썸네일 이미지
export const getThumbnail = async (videoId) => {
  // 영상id받아서 채널id까지 받을 수 있으니 한번에 채널id로 연결시켜서
  // 채널id통해 유튜버(채널)명, 구독자수 등 객체로 전달해주기
  // getThumbnail('영상id')로 사용하기
  const { data } = await mainSliderDataClient.get(
    `/videos?part=snippet&id=${videoId}&key=${import.meta.env.VITE_APP_API_KEY}`
  );
  const snippet = data.items[0].snippet;
  const channelId = snippet.channelId;
  const channelTitle = snippet.channelTitle;
  const thumbnailUrl = snippet.thumbnails.standard.url;

  console.log(channelId);
  console.log(channelTitle);
  console.log(snippet);

  return thumbnailUrl;
  {
  }
};

// r_E_-FRiyKc
//RLURZtX-fUo
// get 유튜버명(채널명) - 위에서 같이 해도 될듯? (굳이 여러번 id안넣어도) // 아님 따로 쓰는게 편할까?
export const getChannelTitle = async () => {};

// get 구독자 수
// 채널id UCE6e9tjKl3l3nGlAcxH7GQg
// 근데 채널ID를 위에서 반환해주고 다시 넣기보다는.. 아예 같은 함수내에서 처리하는게 편할거 같은데.
export const getChannels = async (channelId) => {
  const { data } = await mainSliderDataClient.get(
    `/channels?part=snippet&id=${channelId}&key=${import.meta.env.VITE_APP_API_KEY}`
  );
  console.log(data);
};

// get 평균 시청수 (기간? 기간정해서 )
