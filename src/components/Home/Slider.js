import { css, styled } from "styled-components";
import { Img } from "../UI";
import { media } from "../theme";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { SLIDER_LIST } from "@/constant/slider-list";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStore } from "@/stores";

export function Slider({ slider_images }) {
    const { site_name } = useStore();

    return (
        <StyledSwiper>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop
                centeredSlides
                pagination={{
                    clickable: true,
                }}
                autoplay={{ delay: 5000 }}
                navigation
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {Array.isArray(slider_images)
                    ? slider_images.map((itm, idx) => (
                          <SwiperSlide key={idx}>
                              <Img
                                  alt={itm?.alt || site_name || ""}
                                  src={itm?.url || "/images/default-image.jpg"}
                                  className={
                                      "select-none w-full h-full object-cover"
                                  }
                              />
                          </SwiperSlide>
                      ))
                    : SLIDER_LIST.map((itm, idx) => (
                          <SwiperSlide key={idx}>
                              <Img
                                  alt={itm.name}
                                  src={itm.url}
                                  className={
                                      "select-none w-full h-full object-cover"
                                  }
                              />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </StyledSwiper>
    );
}

const StyledSwiper = styled.section`
    position: relative;
    padding-top: 60%;

    ${media.lg(css`
        padding-top: 40%;
    `)}

    .mySwiper {
        position: absolute;
        inset: 0;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
        color: white;
        font-size: 20px !important;
        transition: transform 0.3s, opacity 0.3s, background 0.3s,
            box-shadow 0.3s;
        opacity: 0;
    }
    .swiper:hover .swiper-button-prev:after,
    .swiper:hover .swiper-button-next:after {
        opacity: 1;
    }
    .swiper .swiper-pagination-bullet {
        border-color: #fff;
        border-radius: 0;
        height: 6px;
        width: 40px;
        margin: 0 5px;
        opacity: 0.4;
        transition: opacity 0.3s;
        background-color: #fff;
    }
    .swiper-slide img {
        width: 100%;
    }
    .swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
        opacity: 1;
    }
`;
