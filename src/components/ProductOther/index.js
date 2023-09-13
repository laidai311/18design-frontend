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