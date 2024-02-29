import styled from 'styled-components';
import mainBanner1 from '../../assets/main_banner02.jpg';
import mainBanner2 from '../../assets/main_banner03.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeaderSlider = () => {
  return (
    <>
      <StSwiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        speed={500}
        loop={true}
      >
        <SwiperSlide>
          <MainSlider>
            <img src={mainBanner1} alt="" />
          </MainSlider>
        </SwiperSlide>
        <SwiperSlide>
          <MainSlider>
            <img src={mainBanner2} alt="" />
          </MainSlider>
        </SwiperSlide>
      </StSwiper>
    </>
  );
};

export default HeaderSlider;

const StSwiper = styled(Swiper)`
  --swiper-theme-color: #fff;
  height: 400px;
  margin-bottom: 3rem;
`;

const MainSlider = styled.section`
  width: 100%;
  height: 400px;
  background-color: #212121;
  overflow: hidden;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  & img {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
`;
