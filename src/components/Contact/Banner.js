import { styled } from "styled-components";
import {
    IconEmail,
    IconFacebook,
    IconLocation,
    IconPhoneRight,
    IconTwitter,
    IconZalo,
} from "../Icons";
import { Container } from "../Styled";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";
import Link from "next/link";
import { Img } from "../UI";

const BannerContact = styled.div`
    padding: 120px 80px;
    background-color: rgb(212, 225, 231);

    @media (max-width: 992px) {
        padding: 120px 50px 0px;
    }

    @media (max-width: 768px) {
        padding: 120px 20px 0px;
    }
`;

const ContactInfo = styled.div`
    background-color: rgb(212, 225, 231);
    position: relative;
    padding: 30px 0;
    &:after {
        content: "";
        position: absolute;
        top: -25%;
        left: 50%;
        width: 3px;
        height: 150px;
        background-color: black;

        @media (max-width: 992px) {
            top: -5%;
            height: 100px;
        }
        @media (max-width: 768px) {
            top: -2%;
        }
        @media (max-width: 456px) {
            top: -1%;
            height: 75px;
        }
    }
`;
const ContactBlock = styled.div`
    margin: auto;
    text-align: center;
    padding: 50px 30px 120px;
    max-width: 900px;
`;
const ContactTitle = styled.div`
    margin: 30px auto;
    color: #333333;
    & strong {
        font-weight: bold;
    }
    & h1 {
        line-height: 1.3;
        font-weight: 500;
        font-size: 46px;
        text-transform: uppercase;
        margin-bottom: 20px;

        @media (max-width: 992px) {
            font-size: 32px;
        }
        @media (max-width: 456px) {
            font-size: 24px;
        }
    }
    & p {
        line-height: 1.6;
        font-weight: 300;

        @media (max-width: 456px) {
            font-size: 12px;
            text-align: justify;
        }
    }
`;

const Follow = styled.div`
    padding: 120px 0;
    position: relative;

    &:after {
        content: "";
        position: absolute;
        top: -13%;
        left: 50%;
        width: 3px;
        height: 150px;
        background-color: black;

        @media (max-width: 992px) {
            top: -5%;
        }
    }
`;

const FollowTitle = styled.div`
    text-align: center;
    padding: 0 15px 30px;
    & h2 {
        color: #333333;
        font-size: 44px;
        margin-bottom: 24px;
        font-weight: 500;

        @media (max-width: 756px) {
            font-size: 32px;
        }
        @media (max-width: 456px) {
            font-size: 24px;
        }
    }
`;

export function Banner({ banner_img, api_url }) {
    return (
        <BannerContact>
            <Img
                alt="banner"
                src={api_url + banner_img?.data?.attributes?.url}
                className={"w-full h-full"}
            />
        </BannerContact>
    );
}

export function Contact({ address, email, phone, description }) {
    return (
        <ContactInfo>
            <Container>
                <ContactBlock>
                    <ContactTitle>
                        <h1 className="font-semibold">Liên hệ với chúng tôi</h1>
                        <ReadOnlyEditor
                            className="text-center"
                            content={description || ""}
                        />
                    </ContactTitle>
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full p-4 md:w-1/3">
                            <div className="flex justify-center text-3xl mb-3">
                                <IconEmail />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-lg">Email</h4>
                                <a href={`mailto:${email}`}>
                                    {email || "arch18designs@gmail.com"}
                                </a>
                            </div>
                        </div>
                        <div className="w-full p-4 md:w-1/3">
                            <div className="flex justify-center text-3xl mb-3">
                                <IconLocation />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-lg">
                                    Địa chỉ
                                </h4>
                                <p>
                                    {address ||
                                        "Số 1, Nguyễn Cảnh Dị, Đại Kim, Hoàng Mai, TP. Hà Nội"}
                                </p>
                            </div>
                        </div>
                        <div className="w-full p-4 md:w-1/3">
                            <div className="flex justify-center text-3xl mb-3">
                                <IconPhoneRight />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-lg">
                                    Điện thoại
                                </h4>
                                <a href={`tel:${phone}`}>
                                    {phone || "083.8586.444"}
                                </a>
                            </div>
                        </div>
                    </div>
                </ContactBlock>
            </Container>
        </ContactInfo>
    );
}

export function FollowUs({ images }) {
    return (
        <Follow>
            <div className="container mx-auto max-w-7xl">
                <FollowTitle>
                    <h2>Follow Us</h2>
                </FollowTitle>
                <div className="-mx-4 flex flex-wrap">
                    {Array.isArray(images)
                        ? images.map((itm, idx) => {
                              if (idx >= 3) return null;
                              return (
                                  <div
                                      key={idx}
                                      className="p-4 w-full lg:w-1/3"
                                  >
                                      <div className="relative pt-[100%]">
                                          <div className="absolute inset-0">
                                              <Img
                                                  alt={itm?.title || ""}
                                                  src={itm?.full_url}
                                                  className={
                                                      "select-none w-full h-full object-cover"
                                                  }
                                              />
                                          </div>
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </Follow>
    );
}

export function Social({ social_group }) {
    return (
        <section className="pt-16 bg-[#d4e1e7] pb-16">
            <div className="container max-w-7xl mx-auto">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    kết nối với chúng tôi
                </h2>
                <div className="flex justify-center space-x-4">
                    {Array.isArray(social_group)
                        ? social_group.map((item, index) => (
                              <Link key={index} href={item?.link || "/#"}>
                                  {item?.social === "Facebook" ? (
                                      <div className="w-10 h-10 rounded-full bg-[#3a589d] text-white flex justify-center items-center">
                                          <IconFacebook />
                                      </div>
                                  ) : item?.social === "Twitter" ? (
                                      <div className="w-10 h-10 rounded-full bg-[#2478ba] text-white flex justify-center items-center">
                                          <IconTwitter />
                                      </div>
                                  ) : item?.social === "Zalo" ? (
                                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center">
                                          <IconZalo className="w-10 h-10" />
                                      </div>
                                  ) : item?.social === "Instagram" ? (
                                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center">
                                          <Img
                                              alt="icon"
                                              src="/images/Instagram_logo.svg"
                                          />
                                      </div>
                                  ) : item?.social === "Messenger" ? (
                                      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center">
                                          <Img
                                              alt="icon"
                                              src="/images/Messenger_logo.svg"
                                          />
                                      </div>
                                  ) : null}
                              </Link>
                          ))
                        : null}
                </div>
            </div>
        </section>
    );
}
