import styled from 'styled-components';

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
        autoplay={{ delay: 2500 }}
        speed={3000}
        loop={true}
      >
        <SwiperSlide>
          <MainSlider>
            <div>Main Slider</div>
          </MainSlider>
        </SwiperSlide>
        <SwiperSlide>
          <MainSlider>
            <div>Main Slider</div>
          </MainSlider>
        </SwiperSlide>
      </StSwiper>
    </>
  );
};

export default HeaderSlider;

// swiper
const StSwiper = styled(Swiper)`
  --swiper-theme-color: #fff;
  height: 400px;
  margin-bottom: 3rem;
`;

//main slider
const MainSlider = styled.section`
  width: 100%;
  height: 400px;
  background-color: #212121;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;
