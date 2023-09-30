import Link from "next/link";
import { IconBook, IconEnvelope, IconLocationDot, IconPhone } from "../Icons";
import { Container } from "../Styled/Common";
import {
    FooterBottom,
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
    LOGO_NAME,
    PHONE,
} from "@/constant/default";
import { useStore } from "@/stores";
import { useInView } from "@/hooks";
import { useRef } from "react";

export default function Footer({ onContactClick }) {
    const ref = useRef();
    const { defaultPage, defaultPageLoading, setOpenFloatContactForm } =
        useStore();

    useInView(ref, {
        callback: (value) => {
            setOpenFloatContactForm(!value);
        },
    });

    const colorLogoUrl = defaultPage?.color_logo?.full_url || COLOR_LOGO_URL;
    const colorLogoName = defaultPage?.color_logo?.name || LOGO_NAME;
    const footerBG = defaultPage?.footer_background?.full_url || FOOTER_BG;
    const defaulImage = defaultPage?.default_image?.full_url || "/#";

    return defaultPageLoading ? (
        <div class="animate-pulse">
            <div class="rounded-lg bg-black/5 h-72"></div>
        </div>
    ) : (
        <footer ref={ref} id="footer" className="relative">
            <section className="bg-gray-800">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${footerBG || defaulImage})`,
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="bg-black/70 h-full" />
                </div>
                <div className="relative py-10">
                    <div className="container mx-auto max-w-7xl px-3">
                        <div className="-mx-4 flex flex-wrap text-white ">
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
                                    {defaultPage?.footer_description ||
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
                                    {defaultPage?.company_name || COMPANY_NAME}
                                </h4>
                                <div className="flex flex-col space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <IconLocationDot />
                                        <span>
                                            {defaultPage?.address || ADDRESS}
                                        </span>
                                    </div>
                                    <div>
                                        <a
                                            href="tel:0838586444"
                                            className="flex items-center space-x-2 hover:underline"
                                        >
                                            <IconPhone />
                                            <span>
                                                {defaultPage?.phone || PHONE}
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
                                                {defaultPage?.email || EMAIL}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full p-7 md:w-1/2 lg:w-1/3 flex flex-col items-center lg:items-start">
                                <h3 className="font-semibold mb-3 uppercase">
                                    Fanpage Facebook
                                </h3>
                                {defaultPage?.facebook_page_name ? (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: `<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2${defaultPage?.facebook_page_name}%2F&width=340&height=350&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="340" height="130" scrolling="no" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
                                        }}
                                    />
                                ) : (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: FACEBOOK_PAGE_IFRAME,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterBottom>
                <Container>
                    <p>{defaultPage?.copyright || COPYRIGHT}</p>
                </Container>
            </FooterBottom>
        </footer>
    );
}
