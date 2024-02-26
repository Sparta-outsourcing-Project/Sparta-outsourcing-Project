import {
  MainYoutuberSlider,
  SliderItem,
  SliderItemImgWrap,
  SliderItemInfo,
  SliderItemInfoTop,
  SliderWrap
} from '../main/Main';
// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { getVideoChannelDatabyId } from '../../api/mainSliderDataApi';
// import { Swiper } from 'swiper/react';
// import { keyframes } from 'styled-components';

const BodySlider = () => {
  // 카테고리 분야 6개 배열
  // const categoryArr = ['먹방', '여행', '생활', '운동', '뷰티', '패션'];

  // const videoIdCategoryArr = [
  //   { videoId: '1nVPaBoiq7I', category: '먹방' },
  //   { videoId: 'wphai3v-SXE', category: '여행' },
  //   { videoId: 'oqxYf5udE80', category: '생활' },
  //   { videoId: 'mKka_BPMQ9E', category: '운동' },
  //   { videoId: 'CodQ9aHyXAY', category: '뷰티' },
  //   { videoId: 'ESzcNpnPgW8', category: '패션' }
  // ];

  // API로 받아올 videoID에 따른 return 객체의 배열 설정
  const [videoDatas, setVideoDatas] = useState([]);

  // video Id 6개 배열일때
  useEffect(() => {
    // 영상 id 6개 배열
    const videoIds = ['1nVPaBoiq7I', 'wphai3v-SXE', 'r3C-iALopZo', 'meeMvpwnGy0', 'xKfCI4UciTo', 'ESzcNpnPgW8'];

    const fetchDataForVideoIds = async () => {
      const fetchDataPromises = videoIds.map(async (id) => {
        return await getVideoChannelDatabyId(id);
      });

      const results = await Promise.all(fetchDataPromises);

      setVideoDatas(results);
      console.log(results);
    };

    fetchDataForVideoIds();
  }, []);

  // TODO
  // 1. onClick 인자로 영상id 전달하려면, API의 return값에 videoId도 추가해야함
  // 2. API return값(6개 객체의 배열)에 '카테고리 분야 6개'도 순서대로 하나씩 Push해주기
  // -> videoDatas에 최종적으로 각 객체에 videoId, 카테고리 분야도 포함되도록 만들어놓기

  // 클릭 시 영상 링크로 이동
  // const navigate = useNavigate();
  const onVideoClickHandler = (id) => {
    const youtubeURL = `https://www.youtube.com/watch?v=${id}`;
    window.open(youtubeURL, '_blank');
  };

  return (
    <>
      <MainYoutuberSlider>
        {/* <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          navigation={{ clickable: true }}
          autoplay={{ delay: 1000 }}
          speed={5000}
          loop={true}
        > */}
        <SliderWrap>
          {videoDatas.map((videoData, idx) => {
            return (
              <SliderItem
                key={idx}
                onClick={() => {
                  onVideoClickHandler('1nVPaBoiq7I');
                }}
                style={{ cursor: 'pointer' }}
              >
                <SliderItemImgWrap>
                  <img
                    src={videoData.thumbnailUrl}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </SliderItemImgWrap>
                <SliderItemInfo>
                  <SliderItemInfoTop>
                    <h3>{videoData.channelTitle}</h3>
                    <span>{videoData.subscriberCount}</span>
                  </SliderItemInfoTop>
                  <p>분야</p>
                  <p>{videoData.averageViewCount}</p>
                </SliderItemInfo>
              </SliderItem>
            );
          })}
        </SliderWrap>

        {/* <SliderItem
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
          </SliderItem> */}
        {/* </SliderWrap> */}
        {/* </Swiper> */}
      </MainYoutuberSlider>
    </>
  );
};

export default BodySlider;
