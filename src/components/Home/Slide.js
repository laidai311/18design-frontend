
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { ImageDefault } from "@/components/styled";
import { styled } from "styled-components";

const SwiperCustom = styled(Swiper)`
    height: 100vh;
`
export function Slide() {
  return (
    <SwiperCustom
    slidesPerView={1}
    spaceBetween={30}
    loop={true}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Pagination, Navigation]}
    className="mySwiper"
  >
    <SwiperSlide>
     <ImageDefault src="https://noithatdreamhome.vn/wp-content/uploads/2022/11/z3033311065157_e5753f88c6c08f577611858ef55e00a2-1536x922.jpg"/>
    </SwiperSlide>
    <SwiperSlide>
     <ImageDefault src="https://noithatdreamhome.vn/wp-content/uploads/2022/11/b69a589a2a34ec6ab525-1536x903.jpg"/>
    </SwiperSlide>
    <SwiperSlide>
     <ImageDefault src="https://noithatdreamhome.vn/wp-content/uploads/2022/11/z2927210368490_e5e0e2a306424e94bdf20d0423cdb22e-1536x1056.jpg"/>
    </SwiperSlide>
    <SwiperSlide>
     <ImageDefault src="https://noithatdreamhome.vn/wp-content/uploads/2022/11/z3879772922008_81cc318845a506112c7ad50eaf9c6f29-1536x1097.jpg"/>
    </SwiperSlide>
  </SwiperCustom>
  )
}
