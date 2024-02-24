import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MainYoutuberSlider,
  SliderItem,
  SliderItemImgWrap,
  SliderItemInfo,
  SliderItemInfoTop,
  SliderWrap
} from '../main/Main';

const BodySlider = () => {
  // api로 받아올 정보 : 썸네일 이미지, 유튜버 이름, 구독자수, 평균 시청수
  // api로 받아오는거 예시
  const getThumbnailImg = async (id) => {
    const response = await axios.get(`썸네일 이미지 가져오는api${id}`);
    return response.data;
  };

  const getYoutuberTitle = async (id) => {
    const response = await axios.get(`채널이름 가져오는api${id}`);
    return response.data;
  };

  const getSubscriberNum = async (id) => {
    const response = await axios.get(`구독자수 가져오는api${id}`);
    return response.data;
  };

  const getViewNumber = async (id) => {
    const response = await axios.get(`시청자수 가져오는api${id}`);
    return response.data;
  };

  // 영상 id 6개 배열
  // const videoId = ['1nVPaBoiq7I', 'wphai3v-SXE', 'oqxYf5udE80', 'mKka_BPMQ9E', 'CodQ9aHyXAY', 'ESzcNpnPgW8'];

  // 카테고리 분야 6개 배열
  // const categoryArr = ['먹방', '여행', '생활', '운동', '뷰티', '패션'];

  const videoIdCategoryArr = [
    { videoId: '1nVPaBoiq7I', category: '먹방' },
    { videoId: 'wphai3v-SXE', category: '여행' },
    { videoId: 'oqxYf5udE80', category: '생활' },
    { videoId: 'mKka_BPMQ9E', category: '운동' },
    { videoId: 'CodQ9aHyXAY', category: '뷰티' },
    { videoId: 'ESzcNpnPgW8', category: '패션' }
  ];

  // 클릭 시 영상 링크로 이동
  // const navigate = useNavigate();
  const onVideoClickHandler = (id) => {
    const youtubeURL = `https://www.youtube.com/watch?v=${id}`;
    window.open(youtubeURL, '_blank');
  };

  return (
    <>
      {/* map(card) => getimg(id) getSub()) */}
      {/* <MainYoutuberSlider>
        <SliderWrap>
          {videoIdCategoryArr.map((sliderItem) => {
            <>
              <SliderItem
                onClick={() => {
                  onVideoClickHandler(sliderItem.videoId);
                }}
              >
                <SliderItemImgWrap>
                  <img src={getThumbnailImg(sliderItem.videoId)} alt="" />
                </SliderItemImgWrap>
                <SliderItemInfo>
                  <SliderItemInfoTop>
                    <h3>{getYoutuberTitle(sliderItem.videoId)}</h3>
                    <span>{getSubscriberNum(sliderItem.videoId)}</span>
                  </SliderItemInfoTop>
                  <p>{sliderItem.category}</p>
                  <p>{getViewNumber(sliderItem.videoId)}</p>
                </SliderItemInfo>
              </SliderItem>
            </>;
          })}
        </SliderWrap>
      </MainYoutuberSlider> */}

      <MainYoutuberSlider>
        <SliderWrap>
          <SliderItem
            onClick={() => {
              onVideoClickHandler('1nVPaBoiq7I');
            }}
            style={{ cursor: 'pointer' }}
          >
            <SliderItemImgWrap>
              <img src="" alt="" />
            </SliderItemImgWrap>
            <SliderItemInfo>
              <SliderItemInfoTop>
                <h3>Youtuber</h3>
                <span>20만</span>
              </SliderItemInfoTop>
              <p>분야</p>
              <p>view</p>
            </SliderItemInfo>
          </SliderItem>
          <SliderItem>
            <SliderItemImgWrap>
              <img src="" alt="" />
            </SliderItemImgWrap>
            <SliderItemInfo>
              <SliderItemInfoTop>
                <h3>Youtuber</h3>
                <span>20만</span>
              </SliderItemInfoTop>
              <p>분야</p>
              <p>view</p>
            </SliderItemInfo>
          </SliderItem>
          <SliderItem>
            <SliderItemImgWrap>
              <img src="" alt="" />
            </SliderItemImgWrap>
            <SliderItemInfo>
              <SliderItemInfoTop>
                <h3>Youtuber</h3>
                <span>20만</span>
              </SliderItemInfoTop>
              <p>분야</p>
              <p>view</p>
            </SliderItemInfo>
          </SliderItem>
        </SliderWrap>
      </MainYoutuberSlider>
    </>
  );
};

export default BodySlider;
