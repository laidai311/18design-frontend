import DefaultLayout from "@/components/Layout";
import { Quote, About, TypicalProject } from "@/components/Home";
import { Slider } from "@/components/Home/Slider";
import { Contact } from "@/components/Home/Contact";
import { OutPartner } from "@/components/Home/OutPartner";
import Whychoose from "@/components/Home/Whychoose";
import { NextSeo } from "next-seo";
import unfetch from "isomorphic-unfetch";
import { getMenu } from "@/utils";

export default function Page({ seo_title, seo_description, ...props }) {
    return (
        <>
            <NextSeo
                title={seo_title || props?.site_name || ""}
                description={seo_description || ""}
            />
            <Slider {...props} />
            <Quote />
            <About {...props} />
            <TypicalProject {...props} />
            <Contact {...props} />
            <Whychoose {...props} />
            <OutPartner {...props} />
        </>
    );
}

export async function getServerSideProps() {
    const {
        NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_USER_NAME,
        NEXT_PUBLIC_PASSWORD,
    } = process.env;

    try {
        const [menuData, homePageData, posts] = await Promise.all(
            [
                "/menu-items",
                "/pages?slug=trang-chu",
                `/posts?category=thiet-ke-noi-that`,
            ].map(async (url) => {
                const res = await unfetch(NEXT_PUBLIC_API_URL + url, {
                    method: "GET",
                    headers: {
                        Authorization:
                            "Basic " +
                            btoa(
                                NEXT_PUBLIC_USER_NAME +
                                    ":" +
                                    NEXT_PUBLIC_PASSWORD
                            ),
                    },
                });
                return res.json();
            })
        );

        const menu = getMenu(menuData);

        const meta_box = homePageData[0]?.meta_box
            ? homePageData[0]?.meta_box
            : {};

        return {
            props: {
                ...meta_box,
                menu,
                posts,
                title: homePageData[0]?.title?.rendered || "",
                content: homePageData[0]?.content?.rendered || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
            },
        };
    } catch (error) {
        return {
            props: {
                message: error.message,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
            },
        };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
