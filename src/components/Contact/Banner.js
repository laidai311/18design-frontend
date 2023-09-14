import { styled } from "styled-components";
import { IconEmail, IconFacebook, IconLinkedin, IconLocation, IconPhoneRight, IconTwitter, IconVKontake } from "../Icons";
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
export function Banner({banner_img , api_url}) {
  return (
    <BannerContact>
      <BannerImage  src={api_url + banner_img?.data?.attributes?.url}/>
    </BannerContact>
  );
}

export function Contact({ address, email, phone, description_contact }) {
  return (
    <ContactInfo>
      <Container>
        <ContactBlock>
          <ContactTitle>
            <h1>liên hệ với chúng tôi</h1>
            <ReadOnlyEditor content={description_contact || ""} />
          </ContactTitle>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full p-4 md:w-1/3">
              <div className="flex justify-center text-3xl mb-3">
                <IconEmail />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">Email</h4>
                <p>{email || "arch18designs@gmail.com"}</p>
              </div>
            </div>
            <div className="w-full p-4 md:w-1/3">
              <div className="flex justify-center text-3xl mb-3">
                <IconLocation />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">Địa chỉ</h4>
                <p>{address || "Số 1, Nguyễn Cảnh Dị, Đại Kim, Hoàng Mai, TP. Hà Nội"}</p>
              </div>
            </div>
            <div className="w-full p-4 md:w-1/3">
              <div className="flex justify-center text-3xl mb-3">
                <IconPhoneRight />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-lg">Điện thoại</h4>
                <p>{phone || "083.8586.444"}</p>
              </div>
            </div>
          </div>
        </ContactBlock>
      </Container>
    </ContactInfo>
  );
}

export function FollowUs({ connect_img, api_url }) {
  return (
    <Follow>
      <Container>
        <FollowTitle>
          <h2>Follow Us</h2>
        </FollowTitle>
        <FollowImage>
          {connect_img?.data
            ? connect_img.data.map((itm, idx) => (
                <div key={idx} className = "follow__image">
                  <Img alt={itm?.attributes?.name || ""} src={api_url + itm?.attributes?.url} className={"select-none w-full h-full"} />
                </div>
              ))
            : null}
        </FollowImage>
      </Container>
    </Follow>
  );
}

export function Social({ fb_contact_link, twitter_contact_link, linked_contact_link, wk_contact_link }) {
  return (
    <section className="pt-16 bg-[#d4e1e7] pb-16">
      <div className="container max-w-7xl mx-auto">
        <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">kết nối với chúng tôi</h2>
        <div className="flex justify-center space-x-2">
          <Link href={fb_contact_link}>
            <div className="w-10 h-10 rounded-full bg-[#3a589d] text-white flex justify-center items-center">
              <IconFacebook />
            </div>
          </Link>
          <Link href={twitter_contact_link}>
            <div className="w-10 h-10 rounded-full bg-[#2478ba] text-white flex justify-center items-center">
              <IconTwitter />
            </div>
          </Link>
          <Link href={linked_contact_link}>
            <div className="w-10 h-10 rounded-full bg-[#0072b7] text-white flex justify-center items-center">
              <IconLinkedin />
            </div>
          </Link>
          <Link href={wk_contact_link}>
            <div className="w-10 h-10 rounded-full bg-[#527498] text-white flex justify-center items-center">
              <IconVKontake />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
