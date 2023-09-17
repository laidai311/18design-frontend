import DefaultLayout from "@/components/Layout";
import { AboutUs } from "@/components/AboutUs";
import Component404 from "@/components/404";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import { getMenu, updateImgSrc } from "@/utils";

export default function Page({
    message,
    seo_title,
    seo_description,
    ...props
}) {
    return (
        <>
            <NextSeo
                title={
                    (seo_title || props?.title || "") + " - " + props?.site_name
                }
                description={seo_description || ""}
            />
            {message ? (
                <Component404 message={message} />
            ) : (
                <AboutUs {...props} />
            )}
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
        const [menuData, aboutPageData] = await Promise.all(
            ["/menu-items", "/pages?slug=ve-chung-toi"].map(async (url) => {
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

        const meta_box = aboutPageData[0]?.meta_box
            ? aboutPageData[0]?.meta_box
            : {};

        return {
            props: {
                ...meta_box,
                menu,
                title: aboutPageData[0]?.title?.rendered || "",
                content: aboutPageData[0]?.content?.rendered || "",
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
