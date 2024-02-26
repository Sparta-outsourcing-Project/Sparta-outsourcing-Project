import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { getVideoChannelDatabyId } from '../../api/mainSliderDataApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';

const BodySlider = () => {
  // API로 받아올 videoID에 따른 return 객체의 배열 설정
  const [videoDatas, setVideoDatas] = useState([]);

  // video Id 6개 배열일때
  useEffect(() => {
    // 영상 id 6개 배열
    const videoIds = ['1nVPaBoiq7I', 'I01pzEznbdU', 'r3C-iALopZo', 'meeMvpwnGy0', 'xKfCI4UciTo', 'ESzcNpnPgW8'];

    const fetchDataForVideoIds = async () => {
      const fetchDataPromises = videoIds.map(async (id, index) => {
        // 각 비디오의 카테고리를 설정
        const categoryArr = ['먹방', '여행', '생활', '운동', '뷰티', '패션'];
        const category = categoryArr[index];

        // 각 비디오의 데이터를 가져오기
        const videoData = await getVideoChannelDatabyId(id); // 가져온 데이터에 카테고리를 추가하여 반환
        return { ...videoData, category };
      });

      // 모든 비디오 데이터를 한꺼번에 가져오기
      // results = {영상Id, 채널명(유튜버명), 영상썸네일이미지url, 채널구독자수(만 단위), 채널평균조회수(만 단위), 카테고리}
      const results = await Promise.all(fetchDataPromises);

      setVideoDatas(results);
      console.log(results);
    };

    fetchDataForVideoIds();
  }, []);

  // 클릭 시 영상 링크로 이동
  const onVideoClickHandler = (id) => {
    const youtubeURL = `https://www.youtube.com/watch?v=${id}`;
    window.open(youtubeURL, '_blank');
  };

  return (
    <>
      <MainYoutuberSlider>
        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}
          navigation={{ clickable: true }}
          autoplay={{ delay: 0, disableOnInteraction: true }}
          speed={7000}
          loop={true}
        >
          <SliderWrap>
            {videoDatas.map((videoData, idx) => {
              return (
                <SliderItem
                  key={idx}
                  onClick={() => {
                    onVideoClickHandler(videoData.videoId);
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
                    <p>{videoData.category}</p>
                    <p>평균 조회수 : {videoData.averageViewCount}</p>
                  </SliderItemInfo>
                </SliderItem>
              );
            })}
          </SliderWrap>
        </StyledSwiper>
      </MainYoutuberSlider>
    </>
  );
};

export default BodySlider;

// BodySlider 컴포넌트에서 사용할 스타일드 컴포넌트 정의
const StyledSwiper = styled(Swiper)`
  position: relative;
`;

//youtuberslider
export const MainYoutuberSlider = styled.section`
  width: 1280px;
  height: 300px;
  margin: 0 auto 3rem auto;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;

  @media (max-width: 1300px) {
    max-width: calc(100% - 2rem);
    margin: 1rem;
  }

  .swiper-wrapper {
    transition-timing-function: linear;
  }

  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 300px; /* 흐린 효과의 너비 조절 */
    background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 2) 100%);
    z-index: 1;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
    transform: scaleX(-1);
  }
`;

export const SliderWrap = styled.div`
  width: 100%;
  display: flex;
`;

// 각 슬라이드에 적용될 스타일드 컴포넌트 정의
// export const SliderItem = styled.article`
export const SliderItem = styled(SwiperSlide)`
  /* width: calc(100% / 3); */
  width: calc(100% / 6);
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid red; */
`;
export const SliderItemImgWrap = styled.div`
  width: calc(100% - 3rem);
  height: 180px;
  /* background-color: #febe98; */
  & > img {
    border-radius: 1rem;
  }
`;
export const SliderItemInfo = styled.div`
  padding: 1rem 2rem;
  width: 100%;
`;
export const SliderItemInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  /* padding-right: 20px; */
`;
