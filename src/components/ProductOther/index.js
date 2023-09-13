import { Swiper, SwiperSlide } from 'swiper/react';
import { CardProductItem } from '../CardProduct';


export default function ProductOther() {
    return (
      <>
        <Swiper
          slidesPerView={4}
          loop={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
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
          <SwiperSlide><CardProductItem/></SwiperSlide>
          <SwiperSlide><CardProductItem/></SwiperSlide>
          <SwiperSlide><CardProductItem/></SwiperSlide>
          <SwiperSlide><CardProductItem/></SwiperSlide>
          <SwiperSlide><CardProductItem/></SwiperSlide>
        </Swiper>
      </>
    );
  }