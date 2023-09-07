import { keyframes, styled } from "styled-components";
import { Container } from "../Styled";
import { Img } from "../UI";
const Content = styled.div``;
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);

  @media (max-width: 992px) {
    grid-template-columns: repeat(1, auto);
  }
`;
const Col6 = styled.div`
  max-width: 50%;
  flex-basis: 50%;
`;
const Inner = styled.div`
  text-align: center;
  background: #949599;
  padding: 64px 0;
`;
const TItleH4 = styled.h4`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 13px;
  margin: 0;
  color: #fff;
  line-height: 18px;
`;
const Text = styled.p`
  font-size: 28px;
  font-weight: 500;
  line-height: 45px;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 0;
`;
const Titleh3 = styled.h3`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  color: #fff;
`;
const TextAction = styled.div``;
const OurSection = styled.div`
  position: relative;
  padding: 50px 0 50px;
  background-image: url("https://noithatdreamhome.vn/wp-content/uploads/2022/07/1582527257_dream.jpg");
  background-position: 50% 50%;
  background-repeat: no-repeat !important;
  background-size: cover !important;
`;
const OverLay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Our = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;
const OurTitle = styled.h2`
  margin-bottom: 50px;
  display: inline-block;
  padding: 0px 25px;
  line-height: 50px;
  position: relative;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  &::after {
    position: absolute;
    bottom: -10px;
    content: "";
    height: 3px;
    width: 80px;
    left: calc(50% - 40px);
    background: #bd8b1b;
  }
`;
const OurText = styled.p`
  color: #f1f1f1;
  font-weight: 400;
  margin-bottom: 20px;
  text-transform: uppercase;
`;
const OurTextItalic = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #fff;

  @media (max-width:456px) {
    font-size:12px;
  }
`;
const CompanyTitle = styled.span`
  font-weight: bold;
  font-style: normal;
  font-size: 16px;
`;
const OurInfo = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(3, auto);

  @media (max-width: 992px) {
    grid-template-columns: repeat(1, auto);
  }
`;

const OurBlock = styled.div`
  background: #fff;
  padding: 15px;
  text-align: center;
`;
const OurDescription = styled.p`
  font-size: 14px;
  color: #000;
  font-weight: 400;
  line-height: 1.6;
`;
const OurTag = styled.p`
  text-align: center;
  display: block;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px 0;
  background: #bd8b1b;
  color: #fff;
  font-weight: bolder;
  margin-bottom: 0;
`;
const OurTitleSecond = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #000;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ImageOur = styled.div`
  margin: 0 auto 1em;
`;
const Image = styled.img`
  transition: all 0.8s ease;
  padding-top: 0.2em;
`;
const OurItem = styled.div`
  margin: 20px;
  transition: all 0.8s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 18px 10px rgb(0 0 0 / 80%);

    ${OurBlock} > ${ImageOur} > ${Image} {
      transform: rotate(360deg);
      filter: brightness(1) invert(1);
    }
  }
`;
const OurItemCenter = styled(OurItem)`
  margin-top: -20px;

  @media (max-width: 992px) {
    margin-top: 20px;
  }
`;
const blink = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;
const Discount = styled.div`
  height: 100%;
  background-image: url("http://phattrienweb.tapato.org/files_upload/frame_06_delay-0.03s_cleanup.jpg");
  background-repeat: no-repeat !important;
  background-size: cover !important;
`;
const DiscountInfo = styled.div`
  text-align: center;
  padding: 57px 0;
  font-size: 28px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -2.5px;
`;
const DiscountSpecial = styled.span`
  animation: ${blink} 2s infinite;
  font-size: 52px;
`;
const Introduction = styled.div`
  position: relative;
  padding: 50px 0 50px;
  background-image: url("https://noithatdreamhome.vn/wp-content/uploads/2022/07/1582527257_dream.jpg");
  background-position: 50% 50%;
  background-repeat: no-repeat !important;
  background-size: cover !important;
`;
const IntroductTitle = styled.div`
  text-align: center;
  position: relative;
  text-transform: uppercase;
  padding: 30px 0;

  & h3 {
    color: #fff;
    font-weight: 400;
    font-size: 26px;
  }
`;
const IntroductList = styled.div`
  padding-top: 20px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, auto);

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, auto);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, auto);
  }

  gap: 40px;
`;
const IntroductItem = styled.div`
  text-align: center;
`;
const IntroductImage = styled.img`
  max-width: 70px;
`;
const IntroductInfo = styled.div`
  margin-top: 15px;
`;
const IntroductItemTitle = styled.h3`
  color: #f3d461;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
const IntroductDescription = styled.p`
  color: #f1f1f1;
  font-weight: 300;

  @media (max-width:768px) {
    font-size:14px;
  }
`;
const OverLayIntroduction = styled(OverLay)`
  background-color: rgba(0, 0, 0, 0.8);
`;
export function Seasion1() {
  return (
    <Content>
      <Row>
        <div>
          <Inner>
            <TextAction className="text-action">
              <TItleH4>Bạn đang ấp ủ ý tưởng về ngôi nhà của mình?</TItleH4>
              <Text>hãy liên lạc ngay</Text>
              <Titleh3>Chúng tôi sẽ giúp hiện thực hóa ước mơ về tổ ấm của bạn!</Titleh3>
            </TextAction>
          </Inner>
        </div>
        <div>
          <Discount>
            <DiscountInfo>
              miễn phí <DiscountSpecial>100%</DiscountSpecial>
              <br />
              phí thiết kế nội thất
            </DiscountInfo>
          </Discount>
        </div>
      </Row>
    </Content>
  );
}

export function Seasion2() {
  return (
    <OurSection>
      <OverLay />
      <Our>
        <OurTitle>Về chúng tôi</OurTitle>
        <Container>
          <div className="Our__Title">
            <OurText>18 design – công ty cổ phần kiến trúc và đầu tư xây dựng 18 design</OurText>
            <OurTextItalic>
              Với slogan &#34;KIẾN TRÚC KHÁC BIỆT - KHÔNG GIAN ĐẶC BIỆT&#34;, chúng tôi đề cao sáng tạo, đổi mới và cung cấp ý tưởng thiết kế <br /> ra những không gian sống ý nghĩa, mang dấu ấn cá
              nhân, xứng tầm với phong cách, tầm nhìn của mọi gia chủ bằng tâm huyết, bằng kinh nghiệm, sự nhiệt tình và sáng tạo của đổi ngũ <CompanyTitle> 18 design</CompanyTitle>
            </OurTextItalic>
          </div>
          <OurInfo>
            <OurItem>
              <OurBlock>
                <ImageOur>
                  <Image src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-3.png" />
                </ImageOur>

                <OurTitleSecond>Vươn Xa - Biểu Tượng Kiến Trúc Việt</OurTitleSecond>
                <OurDescription>Luôn không ngừng vươn xa, trở thành biểu tượng niềm tin hàng đầu về thiết kế và thi công kiến trúc, nội ngoại thất cho mọi ngôi nhà Việt.”</OurDescription>
              </OurBlock>
              <OurTag>Tầm nhìn</OurTag>
            </OurItem>
            <OurItemCenter>
              <OurBlock>
                <ImageOur>
                  <Image src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-2.png" />
                </ImageOur>
                <OurDescription>
                  Chúng tôi cam kết mang đến sự sáng tạo thông qua thiết kế và thi công, nâng cao không gian sống của bạn thành tuyệt vời hơn. Mục tiêu của chúng tôi là cung cấp tổ ấm chất lượng, cao
                  cấp, và đầy giá trị, thể hiện tình yêu và trách nhiệm đối với cuộc sống và xã hội.
                </OurDescription>
              </OurBlock>
              <OurTag>Sứ Mệnh</OurTag>
            </OurItemCenter>
            <OurItem>
              <OurBlock>
                <ImageOur>
                  <Image src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-1.png" />
                </ImageOur>
                <OurTitleSecond>Kim chỉ nam đáng tin cậy và tôn vinh</OurTitleSecond>
                <OurDescription>Tôn trọng, tin cậy và đề cao chữ TÍN – lấy chữ TÍN là vũ khí cạnh tranh và bảo vệ chữ TÍN cũng như bảo vệ danh dự của chính mình</OurDescription>
              </OurBlock>
              <OurTag>Giá trị cốt lõi</OurTag>
            </OurItem>
          </OurInfo>
        </Container>
      </Our>
    </OurSection>
  );
}

export function Introduct() {
  return (
    <Introduction>
      <Container>
        <OverLayIntroduction />
        <IntroductTitle>
          <h3>tại sao chọn 18Design</h3>
        </IntroductTitle>
        <IntroductList>
          <IntroductItem>
            <div>
              <IntroductImage src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-4.png" />
            </div>
            <IntroductInfo>
              <IntroductItemTitle>đội ngũ thiết kế kinh nghiệm</IntroductItemTitle>
              <IntroductDescription>Đội ngũ kiến trúc sư có kinh nghiệm lâu năm với tư duy sáng tạo</IntroductDescription>
            </IntroductInfo>
          </IntroductItem>
          <IntroductItem>
            <div>
              <IntroductImage src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-5.png" />
            </div>
            <IntroductInfo>
              <IntroductItemTitle>ĐỘI NGŨ GIÁM SÁT NĂNG LỰC CAO</IntroductItemTitle>
              <IntroductDescription>Đội ngũ tư vấn giám sát năng lực cao và tinh thần làm việc nhiệt huyết!</IntroductDescription>
            </IntroductInfo>
          </IntroductItem>
          <IntroductItem>
            <div>
              <IntroductImage src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-6.png" />
            </div>
            <IntroductInfo>
              <IntroductItemTitle>ĐỘI NGŨ CÔNG NHÂN LÀNH NGHỀ</IntroductItemTitle>
              <IntroductDescription>Đội ngũ công nhân đều có tay nghề cao, đã tham gia nhiều dự án.</IntroductDescription>
            </IntroductInfo>
          </IntroductItem>
          <IntroductItem>
            <div>
              <IntroductImage src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-7.png" />
            </div>
            <IntroductInfo>
              <IntroductItemTitle>SẢN PHẨM NỘI THẤT CHẤT LƯỢNG CAO</IntroductItemTitle>
              <IntroductDescription>Xưởng sản xuất với cơ sở vật chất hiện đại cho sản phẩm tốt nhất.</IntroductDescription>
            </IntroductInfo>
          </IntroductItem>
          <IntroductItem>
            <div>
              <IntroductImage src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-8.png" />
            </div>
            <IntroductInfo>
              <IntroductItemTitle>ĐƠN GIÁ HỢP LÝ VÀ CẠNH TRANH</IntroductItemTitle>
              <IntroductDescription>Bảng giá của các sản phẩm và dịch vụ cung cấp cạnh tranh.</IntroductDescription>
            </IntroductInfo>
          </IntroductItem>
          <IntroductItem>
            <div>
              <IntroductImage src="https://noithatdreamhome.vn/wp-content/uploads/2022/07/icon-9.png" />
            </div>
            <IntroductInfo>
              <IntroductItemTitle>DỊCH VỤ SAU BÁN HÀNG HOÀN HẢO</IntroductItemTitle>
              <IntroductDescription>Cam kết hỗ trợ khách hàng mọi vấn đề về bảo hành, bảo trì sản phẩm trong 05 năm sử dụng</IntroductDescription>
            </IntroductInfo>
          </IntroductItem>
        </IntroductList>
      </Container>
    </Introduction>
  );
}
