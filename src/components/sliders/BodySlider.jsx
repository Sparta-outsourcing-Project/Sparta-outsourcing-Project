import { useEffect, useState } from 'react';
import { getVideoChannelDatabyId } from '../../api/mainSliderDataApi';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VideoModal from './VideoModal'; // VideoModal 컴포넌트 import 추가

const BodySliderCopy = () => {
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
    };

    fetchDataForVideoIds();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태
  const [selectedVideo, setSelectedVideo] = useState(null); // 선택된 비디오 데이터

  const closeModal = () => {
    setSelectedVideo(null); // 선택된 비디오 데이터 초기화
    setIsModalOpen(false); // 모달 닫기
  };

  // 클릭 시 영상 링크로 이동
  const onVideoClickHandler = (videoData) => {
    setSelectedVideo(videoData); // 선택된 비디오 데이터 설정
    setIsModalOpen(true); // 모달 열기
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 300,
    // autoplaySpeed: 700,
    cssEase: 'linear',
    pauseOnHover: true
  };

  return (
    <>
      <MainYoutuberSlider>
        <StyledSwiper>
          <SliderWrap>
            <Slider {...settings}>
              {videoDatas.map((videoData, idx) => {
                return (
                  <SliderItem key={idx} onClick={() => onVideoClickHandler(videoData)}>
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
            </Slider>
          </SliderWrap>
        </StyledSwiper>
      </MainYoutuberSlider>

      {/* 모달이 열려있을 때만 VideoModal을 렌더링 */}
      {isModalOpen && (
        <VideoModal
          videoData={selectedVideo} // VideoModal에 전달할 데이터
          onClose={closeModal} // 모달 닫기 함수 전달
        />
      )}
    </>
  );
};

export default BodySliderCopy;

// BodySlider 컴포넌트에서 사용할 스타일드 컴포넌트 정의

//youtuberslider
export const MainYoutuberSlider = styled.section`
  width: 1280px;
  /* height: 330px; */
  margin: 0 auto 3rem auto;
  display: flex;
  align-items: center;
  /* background-color: red; */

  @media (max-width: 1300px) {
    max-width: calc(100% - 2rem);
    margin: 1rem;
  }
`;

const StyledSwiper = styled.div`
  width: 100%;
  /* background-color: blue; */
  .slick-slider.slick-initialized {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    width: auto;
    height: auto;
  }

  .slick-prev {
    left: -10px;
  }
  .slick-next {
    right: -10px;
  }
`;

export const SliderWrap = styled.div`
  width: 100%;
  /* display: flex; */
  justify-content: center;

  .slick-prev:before,
  .slick-next:before {
    color: #febe98;
    font-size: 40px;
  }
`;

// 각 슬라이드에 적용될 스타일드 컴포넌트 정의
export const SliderItem = styled.div`
  width: 100%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  /* background-color: green; */

  &:hover {
    cursor: pointer;
    transform: scale(1.08);
    transition: 0.3s;
  }
`;
export const SliderItemImgWrap = styled.div`
  width: calc(100% - 3rem);
  height: 180px;
  & > img {
    border-radius: 1rem;
  }
`;
export const SliderItemInfo = styled.div`
  padding: 1.5rem;
  width: 100%;
`;
export const SliderItemInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;

  & > h3 {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
