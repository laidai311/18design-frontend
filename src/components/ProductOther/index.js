import { styled } from "styled-components";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardProductItem } from "../CardProduct";
import { fakeProductOther } from "./fetchData";

const SwiperWrapper = styled.div`
    & .swiper-wrapper {
        padding-bottom: 30px;
    }
`;

export default function ProductOther({ products_list }) {
    return (
        <SwiperWrapper>
            <Swiper
                slidesPerView={4}
                loop={true}
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay]}
                className="mySwiper"
                breakpoints={{
                    280: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
            >
                {Array.isArray(products_list)
                    ? products_list.map((item) => (
                          <SwiperSlide key={item.id}>
                              <CardProductItem {...item} />
                          </SwiperSlide>
                      ))
                    : null}
            </Swiper>
        </SwiperWrapper>
    );
}
