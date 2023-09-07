import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { ImageDefault } from "@/components/Styled";
import { styled } from "styled-components";
import { Img } from "../UI";

const SwiperWrapper = styled.div`
    position: relative;
    padding-top: 60%;

    .swiper {
        position: absolute;
        inset: 0;
    }

    & .swiper-button-prev:after,
    & .swiper-button-next:after {
        color: white;
        font-size: 20px !important;
        transition: transform 0.3s, opacity 0.3s, background 0.3s,
            box-shadow 0.3s;
        opacity: 0;
    }
    & .swiper:hover .swiper-button-prev:after,
    & .swiper:hover .swiper-button-next:after {
        opacity: 1;
    }
    & .swiper .swiper-pagination-bullet {
        border-color: #fff;
        border-radius: 0;
        height: 6px;
        width: 40px;
        margin: 0 5px;
        opacity: 0.4;
        transition: opacity 0.3s;
        background-color: #fff;
    }
    & .swiper-slide img {
        width: 100%;
    }
    & .swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
        opacity: 1;
    }
`;

const Image = styled(Img)`
    width: 100%;
    height: 100%;
    user-select: none;
`;

export function Slide() {
    return (
        <SwiperWrapper>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image
                        alt="pic1"
                        data-src="https://noithatdreamhome.vn/wp-content/uploads/2022/11/z3033311065157_e5753f88c6c08f577611858ef55e00a2-1536x922.jpg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        alt="pic2"
                        data-src="https://noithatdreamhome.vn/wp-content/uploads/2022/11/b69a589a2a34ec6ab525-1536x903.jpg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        alt="pic3"
                        data-src="https://noithatdreamhome.vn/wp-content/uploads/2022/11/z2927210368490_e5e0e2a306424e94bdf20d0423cdb22e-1536x1056.jpg"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        alt="pic4"
                        data-src="https://noithatdreamhome.vn/wp-content/uploads/2022/11/z3879772922008_81cc318845a506112c7ad50eaf9c6f29-1536x1097.jpg"
                    />
                </SwiperSlide>
            </Swiper>
        </SwiperWrapper>
    );
}
