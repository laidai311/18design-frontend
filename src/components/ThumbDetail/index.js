import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "styled-components";
import { useState } from "react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import { Img } from "../UI";

const SlideWrapper = styled.div`
  & .swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;

    & .swiper-button-prev:after, & .swiper-button-next:after {
      font-size:18px;
    }
    & .swiper-slide {
      background-size: cover;
      background-position: center;
      & img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    & .mySwiper2 {
      height: 80%;
      width: 100%;
    }
  }
  & .mySwiper {
    height: 25%;
    box-sizing: border-box;
    padding: 10px 0;
    & .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }
    & .swiper-slide-thumb-active {
      opacity: 1;
    }
  }
`;
export function ThumbDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <SlideWrapper>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <Img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
        <SwiperSlide>
          <Img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <Img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
    </SlideWrapper>
  );
}
