import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { styled } from "styled-components";
import { Container } from "../Styled";
import { PricingTitle } from "./Pricing";

const SwiperWrapper = styled.div`
  padding: 40px 0;

  & .swiper-wrapper {
    align-items: center;
  }
`;
const Image = styled.img`
`;
export function Partner() {
  return (
    <SwiperWrapper>
      <Container>
        <PricingTitle>
          <h2>ĐỐI TÁC CỦA CHÚNG TÔI</h2>
        </PricingTitle>
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}  
          pagination={false}
          navigation={false}
          modules={[Autoplay,Pagination, Navigation]}
          breakpoints={{
            200: {
              slidesPerView: 2,
            },
            456: {
              slidesPerView: 2,
              // spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            992: {
              slidesPerView: 6,
              spaceBetween: 50,
            },

          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <Image alt="pic1" src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/doi-tac-7.png  " />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="pic2" src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/doi-tac-8.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="pic3" src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/doi-tac-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="pic4" src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/doi-tac-2.png" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="pic4" src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/doi-tac-3.png" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="pic4" src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/doi-tac-4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <Image alt="pic4" src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/doi-tac-5.jpg" />
          </SwiperSlide>
        </Swiper>
      </Container>
    </SwiperWrapper>
  );
}
