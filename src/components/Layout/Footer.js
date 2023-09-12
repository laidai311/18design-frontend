import Link from "next/link";
import { IconBook, IconEnvelope, IconLocationDot, IconPhone } from "../Icons";
import { Container } from "../Styled/Common";
import {
    FooterBottom,
    Wrapper,
    Seasion,
    FooterBG,
    FooterBGOverlay,
    FooterDescription,
    FooterLogo,
} from "../Styled/Layout/Footer";
import { Img } from "../UI";
import {
    ADDRESS,
    COLOR_LOGO_URL,
    COMPANY_NAME,
    COPYRIGHT,
    EMAIL,
    FACEBOOK_PAGE_IFRAME,
    FOOTER_BG,
    FOOTER_DESCRIPTION,
    PHONE,
} from "@/constant/default";

export default function Footer({
    onContactClick,
    property,
    color_logo,
    api_url,
    footer_bg,
}) {
    const colorLogoUrl = color_logo?.data?.attributes?.url
        ? api_url + color_logo?.data?.attributes?.url
        : COLOR_LOGO_URL;
    const colorLogoName = color_logo?.data?.attributes?.name || LOGO_NAME;
    const footerBG = footer_bg?.data?.attributes?.url
        ? api_url + footer_bg?.data?.attributes?.url
        : FOOTER_BG;

    return (
        <Wrapper id="footer">
            <Seasion>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${footerBG})`,
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <FooterBGOverlay />
                </div>
                <div className="relative pt-8">
                    <div className="container mx-auto max-w-7xl">
                        <div className="-mx-4 flex flex-wrap text-white">
                            <div className="w-full p-7 md:w-1/2 lg:w-1/3 flex flex-col items-center">
                                <FooterLogo>
                                    <Link href={"/"}>
                                        <Img
                                            alt={colorLogoName}
                                            src={colorLogoUrl}
                                        />
                                    </Link>
                                </FooterLogo>
                                <FooterDescription>
                                    {property?.footer_description ||
                                        FOOTER_DESCRIPTION}
                                </FooterDescription>
                                <button
                                    onClick={onContactClick || null}
                                    className="px-5 py-3 font-medium text-white hover:bg-primary/90 rounded-lg hover:shadow inline-flex space-x-2 items-center justify-center bg-primary transition-all active:scale-95"
                                >
                                    <IconBook />
                                    <span>Nhận tư vấn thiết kế</span>
                                </button>
                            </div>
                            <div className="w-full p-7 md:w-1/2 lg:w-1/3">
                                <h3 className="font-semibold mb-3 uppercase">
                                    Thông tin liên hệ
                                </h3>

                                <h4 className="mb-4">
                                    {property?.company_name || COMPANY_NAME}
                                </h4>
                                <div className="flex flex-col space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <IconLocationDot />
                                        <span>
                                            {property?.address || ADDRESS}
                                        </span>
                                    </div>
                                    <div>
                                        <a
                                            href="tel:0838586444"
                                            className="flex items-center space-x-2 hover:underline"
                                        >
                                            <IconPhone />
                                            <span>
                                                {property?.phone || PHONE}
                                            </span>
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href="mailto:arch18designs@gmail.com"
                                            className="flex items-center space-x-2 hover:underline"
                                        >
                                            <IconEnvelope />
                                            <span>
                                                {property?.email || EMAIL}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full p-7 md:w-1/2 lg:w-1/3">
                                <h3 className="font-semibold mb-3 uppercase">
                                    Fanpage Facebook
                                </h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            property?.facebook_page_iframe ||
                                            FACEBOOK_PAGE_IFRAME,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Seasion>
            <FooterBottom>
                <Container>
                    <p>
                        {property.copyright ? property?.copyright : COPYRIGHT}
                    </p>
                </Container>
            </FooterBottom>
        </Wrapper>
    );
}
