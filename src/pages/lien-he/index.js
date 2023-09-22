import { Contact, FollowUs, Social } from "@/components/Contact/Banner";
import { getMenu } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";
import unfetch from "isomorphic-unfetch";

export default function Page({
    background,
    seo_title,
    seo_description,
    ...props
}) {
    const { default_image } = useStore();

    return (
        <>
            <NextSeo
                title={
                    (seo_title || props?.title || "") + " - " + props?.site_name
                }
                description={seo_description || ""}
            />
            <div className="w-full relative pt-[52%] h-auto lg:pt-0 lg:h-[80vh] bg-[#d4e1e7]">
                <div className="absolute inset-0 py-32 px-20">
                    <Img
                        alt={background?.title || default_image?.title || ""}
                        src={background?.full_url || default_image?.full_url}
                        className={"w-full h-full object-cover"}
                    />
                </div>
            </div>
            <Contact {...props} />
            <FollowUs {...props} />
            <Social {...props} />
        </>
    );
}

export async function getServerSideProps() {
    try {
        const {
            NEXT_PUBLIC_SITE_NAME,
            NEXT_PUBLIC_API_URL,
            NEXT_PUBLIC_USER_NAME,
            NEXT_PUBLIC_PASSWORD,
        } = process.env;

        const [menuData, defaulPageData, contactPageData] = await Promise.all(
            ["/menu-items", "/pages?slug=mac-dinh", "/pages?slug=lien-he"].map(
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

        const meta_box = contactPageData[0]?.meta_box
            ? contactPageData[0]?.meta_box
            : {};

        return {
            props: {
                ...meta_box,
                menu,
                default_page: default_meta_box,
                title: contactPageData[0]?.title?.rendered || "",
                content: contactPageData[0]?.content?.rendered || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
            },
            // revalidate: REVALIDATE, // In seconds 1h
        };
    } catch (error) {
        return { props: { error: error?.message }, notFound: true };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
