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
} from "../Styled/Layout/Footer";
import { Img } from "../UI";

export default function Footer({ onContactClick }) {
    return (
        <Wrapper id="footer">
            <Seasion>
                <FooterBG>
                    <FooterBGOverlay />
                </FooterBG>
                <div className="relative pt-8">
                    <div className="container mx-auto max-w-7xl">
                        <div className="-mx-4 flex flex-wrap text-white">
                            <div className="w-full p-4 md:w-1/2 lg:w-1/3 flex flex-col items-center">
                                <FooterLogo>
                                    <Link href={"/"}>
                                        <Img
                                            alt={"logo"}
                                            src={"./images/18-design-cut.png"}
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
                                <button
                                    onClick={onContactClick || null}
                                    className="px-5 py-3 font-medium text-white hover:bg-primary/90 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center bg-primary transition-all active:scale-95"
                                >
                                    <IconBook />
                                    <span>Nhận tư vấn thiết kế</span>
                                </button>
                            </div>
                            <div className="w-full p-4 md:w-1/2 lg:w-1/3">
                                <h3 className="font-semibold mb-3 uppercase">
                                    Thông tin liên hệ
                                </h3>

                                <h4 className="mb-4">
                                    CÔNG TY CỔ PHẦN KIẾN TRÚC VÀ ĐẦU TƯ XÂY DỰNG
                                    18 DESIGN
                                </h4>
                                <div className="flex flex-col space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <IconLocationDot />
                                        <span>
                                            Số 1, Nguyễn Cảnh Dị, Đại Kim, Hoàng
                                            Mai, TP. Hà Nội
                                        </span>
                                    </div>
                                    <a
                                        href="tel:0838586444"
                                        className="hover:underline"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <IconPhone />
                                            <span>083.8586.444</span>
                                        </div>
                                    </a>
                                    <a
                                        href="mailto:arch18designs@gmail.com"
                                        className="hover:underline"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <IconEnvelope />
                                            <span>arch18designs@gmail.com</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="w-full p-4 md:w-1/2 lg:w-1/3">
                                <h3 className="font-semibold mb-3 uppercase">
                                    Fanpage Facebook
                                </h3>
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
                            </div>
                        </div>
                    </div>
                </div>
            </Seasion>
            <FooterBottom>
                <Container>
                    <p>Copyright 2023 © 18Design - 083.8586.444</p>
                </Container>
            </FooterBottom>
        </Wrapper>
    );
}
