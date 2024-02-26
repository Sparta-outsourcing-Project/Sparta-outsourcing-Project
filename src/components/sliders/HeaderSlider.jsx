import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { MainSlider } from '../main/Main';

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
        autoplay={{ delay: 2500 }}
        speed={3000}
        loop={true}
      >
        <SwiperSlide>
          <MainSlider>
            <img src="src\assets\main_banner03.jpg" alt="" />
          </MainSlider>
        </SwiperSlide>
        <SwiperSlide>
          <MainSlider>
            <img src="src\assets\main_banner02.jpg" alt="" />
          </MainSlider>
        </SwiperSlide>
      </StSwiper>
    </>
  );
};

export default HeaderSlider;

// swiper
export const StSwiper = styled(Swiper)`
  --swiper-theme-color: #fff;
  height: 400px;
  margin-bottom: 3rem;
`;
