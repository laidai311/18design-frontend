import { styled } from "styled-components";
import {
    IconEmail,
    IconFacebook,
    IconLinkedin,
    IconLocation,
    IconPhoneRight,
    IconTwitter,
    IconVKontake,
} from "../Icons";
import { Container } from "../Styled";

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

const BannerImage = styled.img``;
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
const ContactSocial = styled.div`
    padding-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 33.333333%);

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, auto);
    }
`;
const ContactSocialItem = styled.div``;

const ContactIcon = styled.div`
    font-size: 28px;
    margin-bottom: 20px;
`;
const ContactDescription = styled.div`
    & h4 {
        font-weight: 600;
        color: #333333;
        font-size: 18px;
        margin-bottom: 10px;
    }

    & p {
        margin-bottom: 20px;
        font-weight: 300;
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

const FollowImage = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, auto);

    @media (max-width: 992px) {
        grid-template-columns: repeat(1, auto);
    }
`;

const SectionSocial = styled.div`
    padding: 100px 0;
    background-color: rgb(212, 225, 231);
    margin: auto;
    text-align: center;
`;
const SocialTitle = styled.div`
    & h2 {
        text-transform: capitalize;
        margin-bottom: 20px;
        font-size: 38px;
        font-weight: 400;

        @media (max-width: 756px) {
            font-size: 32px;
        }
        @media (max-width: 456px) {
            font-size: 24px;
        }
    }
`;

const SocialList = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;

    & .icon__box:nth-child(1) {
        & a {
            background: #3a589d;
            color: white;
            padding: 10px 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
        }
    }
    & .icon__box:nth-child(2) {
        & a {
            background: #2478ba;
            color: white;
            padding: 10px 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
        }
    }
    & .icon__box:nth-child(3) {
        & a {
            background: #0072b7;
            color: white;
            padding: 10px 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
        }
    }
    & .icon__box:nth-child(4) {
        & a {
            background: #527498;
            color: white;
            padding: 10px 15px;
            border-radius: 50%;
            display: flex;
            align-items: center;
        }
    }
`;
export function Banner() {
    return (
        <BannerContact>
            <BannerImage src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/banner-bg1.jpg" />
        </BannerContact>
    );
}

export function Contact() {
    return (
        <ContactInfo>
            <Container>
                <ContactBlock>
                    <ContactTitle>
                        <h1>liên hệ với chúng tôi</h1>
                        <p>
                            Công Ty Cổ Phần Kiến Trúc Và Đầu Tư Xây Dựng 18
                            Design là một trong những công ty hàng đầu về thiết
                            kế và thi công kiến trúc - nội ngoại thất, từng bước
                            trở thành Nhà thiết kế và thi công kiến trúc – nội
                            ngoại thất, được các công ty RIKI Việt Nam, Truyền
                            Thông Đậu Family, Imago Work hay tập đoàn Tài Tâm
                            lựa chọn làm đối tác chiến lược.{" "}
                            <strong>18 Design</strong> ghi dấu ấn thiết kế nội
                            thất sang trọng, thi công nội thất cao cấp trên các
                            dự án: Vinhomes Timecity Park Hill, Vinhomes Royal
                            City, Vinhomes Smartcity, One 18 Ngọc Lâm, Vinhomes
                            D’capitale, Shophouse 124 Vĩnh Tuy, Lake View,...
                        </p>
                    </ContactTitle>
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full p-4 md:w-1/3">
                            <div className="flex justify-center text-3xl mb-3">
                                <IconEmail />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-lg">Email</h4>
                                <p>arch18designs@gmail.com</p>
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
                                    Số 1, Nguyễn Cảnh Dị, Đại Kim, Hoàng Mai,
                                    TP. Hà Nội
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
                                <p>083.8586.444</p>
                            </div>
                        </div>
                    </div>
                </ContactBlock>
            </Container>
        </ContactInfo>
    );
}

export function FollowUs() {
    return (
        <Follow>
            <Container>
                <FollowTitle>
                    <h2>Follow Us</h2>
                </FollowTitle>
                <FollowImage>
                    <img src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/banner-bg2.jpg" />
                    <img src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/banner-bg3.jpg" />
                    <img src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/banner-bg1.jpg" />
                </FollowImage>
            </Container>
        </Follow>
    );
}

export function Social() {
    return (
        <section className="pt-16 bg-[#d4e1e7] pb-16">
            <div className="container max-w-7xl mx-auto">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    kết nối với chúng tôi
                </h2>
                <div className="flex justify-center space-x-2">
                    <a href="#">
                        <div className="w-10 h-10 rounded-full bg-[#3a589d] text-white flex justify-center items-center">
                            <IconFacebook />
                        </div>
                    </a>
                    <a href="#">
                        <div className="w-10 h-10 rounded-full bg-[#2478ba] text-white flex justify-center items-center">
                            <IconTwitter />
                        </div>
                    </a>
                    <a href="#">
                        <div className="w-10 h-10 rounded-full bg-[#0072b7] text-white flex justify-center items-center">
                            <IconLinkedin />
                        </div>
                    </a>
                    <a href="#">
                        <div className="w-10 h-10 rounded-full bg-[#527498] text-white flex justify-center items-center">
                            <IconVKontake />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
