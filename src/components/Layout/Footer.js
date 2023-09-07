import Link from "next/link";
import { IconBook, IconEnvelope, IconLocationDot, IconPhone } from "../Icons";
import { Container } from "../Styled/Common";
import {
    FooterBottom,
    Wrapper,
    Content,
    Inner,
    Seasion,
    FooterBG,
    FooterBGOverlay,
    FooterDescription,
    ContentItem,
    FooterLogo,
    FooterAdviceButton,
    FooterContactWrap,
} from "../Styled/Footer";
import { Img } from "../UI";

export default function Footer() {
    return (
        <Wrapper id="footer">
            <Seasion>
                <FooterBG>
                    <FooterBGOverlay />
                </FooterBG>
                <Inner>
                    <Container>
                        <Content>
                            <ContentItem center>
                                <FooterLogo>
                                    <Link href={"/"}>
                                        <Img
                                            alt={"logo"}
                                            data-src={
                                                "./images/18-design-cut.png"
                                            }
                                        />
                                    </Link>
                                </FooterLogo>
                                <FooterDescription>
                                    &ldquo;18 DESIGN luôn nằm trong TOP 5 đơn vị
                                    thiết kế & thi công nội thất hàng đầu tại
                                    khu vực phía Bắc và miền Trung - Việt Nam,
                                    được hàng trăm ngàn khách hàng tin tưởng sử
                                    dụng dịch vụ&rdquo;
                                </FooterDescription>
                                <FooterAdviceButton>
                                    <IconBook />
                                    <span>Nhận tư vấn thiết kế</span>
                                </FooterAdviceButton>
                            </ContentItem>
                            <ContentItem>
                                <h3>THÔNG TIN LIÊN HỆ</h3>

                                <h4>
                                    CÔNG TY CỔ PHẦN KIẾN TRÚC VÀ ĐẦU TƯ XÂY DỰNG
                                    18 DESIGN
                                </h4>
                                <FooterContactWrap>
                                    <div>
                                        <IconLocationDot />
                                        <span>
                                            Số 1, Nguyễn Cảnh Dị, Đại Kim, Hoàng
                                            Mai, TP. Hà Nội
                                        </span>
                                    </div>
                                    <a href="tel:0838586444">
                                        <IconPhone />
                                        <span>083.8586.444</span>
                                    </a>
                                    <a href="mailto:arch18designs@gmail.com">
                                        <IconEnvelope />
                                        <span>arch18designs@gmail.com</span>
                                    </a>
                                </FooterContactWrap>
                            </ContentItem>
                            <ContentItem>
                                <h3>FANPAGE FACEBOOK</h3>
                                <iframe
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDreamHomeNoiThat&amp;tabs=timeline&amp;width=340&amp;height=500&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=450550055455892"
                                    width="100%"
                                    height={315}
                                    style={{
                                        border: "none",
                                        overflow: "hidden",
                                    }}
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                />
                            </ContentItem>
                        </Content>
                    </Container>
                </Inner>
            </Seasion>
            <FooterBottom>
                <Container>
                    <p>Copyright 2023 © 18Design - 083.8586.444</p>
                </Container>
            </FooterBottom>
        </Wrapper>
    );
}
