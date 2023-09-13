import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { styled } from "styled-components";
import { Container } from "../Styled";
import { Img } from "../UI";

export const PricingTitle = styled.div`
    text-align: center;

    & h2 {
        margin-bottom: 50px;
        display: inline-block;
        padding: 0px 25px;
        line-height: 50px;
        position: relative;
        font-weight: 500;
        font-size: 24px;
        text-transform: uppercase;
    }
    & :after {
        position: absolute;
        bottom: -10px;
        content: "";
        height: 3px;
        width: 80px;
        left: calc(50% - 40px);
        background: #bd8b1b;
    }
`;

const SwiperWrapper = styled.div`
    padding: 40px 0;

    & .swiper-wrapper {
        align-items: center;
    }
`;

export function OutPartner({ our_partner_list, api_url }) {
    return (
        <div className="bg-white pt-10 relative">
            <div className="container max-w-7xl mx-auto">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    Đối tác của chúng tôi
                </h2>
                <Swiper
                    spaceBetween={40}
                    loop
                    autoplay={{
                        delay: 2500,
                    }}
                    pagination={false}
                    navigation={false}
                    centeredSlides
                    modules={[Autoplay, Pagination, Navigation]}
                    breakpoints={{
                        200: {
                            slidesPerView: 2,
                        },
                        456: {
                            slidesPerView: 2,
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
                    {our_partner_list?.data
                        ? our_partner_list.data.map((itm, idx) => (
                              <SwiperSlide key={idx}>
                                  <Img
                                      alt={itm?.attributes?.name || ""}
                                      src={api_url + itm?.attributes?.url}
                                      className={"select-none w-full h-full"}
                                  />
                              </SwiperSlide>
                          ))
                        : null}
                </Swiper>
            </div>
        </div>
    );
}
