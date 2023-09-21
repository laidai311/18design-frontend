import DefaultLayout from "@/components/Layout";
import Component404 from "@/components/404";
import { getMenu } from "@/utils";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";

export default function Page({ title, site_name }) {
    return (
        <>
            <NextSeo
                title={(title || "") + " - " + site_name}
                description={"Không thể tìm thấy trang bạn yêu cầu."}
            />
            <Component404 message={"Không thể tìm thấy trang bạn yêu cầu."} />
        </>
    );
}

export async function getStaticProps() {
    const {
        NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_USER_NAME,
        NEXT_PUBLIC_PASSWORD,
    } = process.env;

    const [menuData, defaulPageData] = await Promise.all(
        ["/menu-items", "/pages?slug=mac-dinh"].map(async (url) => {
            const res = await unfetch(NEXT_PUBLIC_API_URL + url, {
                method: "GET",
                headers: {
                    Authorization:
                        "Basic " +
                        btoa(
                            NEXT_PUBLIC_USER_NAME + ":" + NEXT_PUBLIC_PASSWORD
                        ),
                },
            });
            return res.json();
        })
    );

    const menu = getMenu(menuData);

    const default_meta_box = defaulPageData[0]?.meta_box || {};

    return {
        props: {
            menu,
            default_page: default_meta_box,
            title: "404",
            site_name: NEXT_PUBLIC_SITE_NAME || "",
            api_url: NEXT_PUBLIC_API_URL || "",
        },
        revalidate: REVALIDATE, // In seconds 1h
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
