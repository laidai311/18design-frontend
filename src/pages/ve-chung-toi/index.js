import { AboutUs } from "@/components/AboutUs";
import { getMenu } from "@/utils";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import Component404 from "@/components/404";
import DefaultLayout from "@/components/Layout";
import unfetch from "isomorphic-unfetch";

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

    const [menuData, defaulPageData, aboutPageData] = await Promise.all(
        ["/menu-items", "/pages?slug=mac-dinh", "/pages?slug=ve-chung-toi"].map(
            async (url) => {
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
            }
        )
    );

    const menu = getMenu(menuData);

    const default_meta_box = defaulPageData[0]?.meta_box || {};

    const meta_box = aboutPageData[0]?.meta_box
        ? aboutPageData[0]?.meta_box
        : {};

    return {
        props: {
            ...meta_box,
            menu,
            default_page: default_meta_box,
            title: aboutPageData[0]?.title?.rendered || "",
            content: aboutPageData[0]?.content?.rendered || "",
            site_name: NEXT_PUBLIC_SITE_NAME || "",
            api_url: NEXT_PUBLIC_API_URL || "",
        },
        // revalidate: REVALIDATE, // In seconds 1h
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
