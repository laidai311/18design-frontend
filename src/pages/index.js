import { Contact } from "@/components/Home/Contact";
import { getMenu } from "@/utils";
import { NextSeo } from "next-seo";
import { OutPartner } from "@/components/Home/OutPartner";
import { Quote, About, TypicalProject } from "@/components/Home";
import { REVALIDATE } from "@/constant/setting";
import { Slider } from "@/components/Home/Slider";
import DefaultLayout from "@/components/Layout";
import unfetch from "isomorphic-unfetch";
import Whychoose from "@/components/Home/Whychoose";

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

export const getStaticProps = async (context) => {
    try {
        const {
            NEXT_PUBLIC_SITE_NAME,
            NEXT_PUBLIC_API_URL,
            NEXT_PUBLIC_USER_NAME,
            NEXT_PUBLIC_PASSWORD,
            NEXT_PUBLIC_GRAVITY_FORMS_URL,
        } = process.env;

        const [menuData, defaulPageData, homePageData] = await Promise.all(
            [
                "/menu-items",
                "/pages?slug=mac-dinh",
                "/pages?slug=trang-chu",
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

        const default_meta_box = defaulPageData[0]?.meta_box || {};

        const meta_box = homePageData[0]?.meta_box
            ? homePageData[0]?.meta_box
            : {};

        let about_group = meta_box?.about_group || [];

        about_group = await Promise.all(
            about_group.map(async (item) => {
                const res = await unfetch(
                    NEXT_PUBLIC_API_URL + `/media/` + item?.icon
                );
                const icon = await res.json();

                return {
                    ...item,
                    icon_link: icon?.source_url,
                    icon_name: icon?.title?.rendered || "",
                };
            })
        );

        let why_choose_group = meta_box?.why_choose_group || [];

        why_choose_group = await Promise.all(
            why_choose_group.map(async (item) => {
                const res = await unfetch(
                    NEXT_PUBLIC_API_URL + `/media/` + item?.icon
                );
                const icon = await res.json();

                return {
                    ...item,
                    icon_link: icon?.source_url,
                    icon_name: icon?.title?.rendered || "",
                };
            })
        );

        let posts_tab = meta_box?.posts_tab || [];

        posts_tab = await Promise.all(
            posts_tab.map(async (item) => {
                const res = await unfetch(
                    NEXT_PUBLIC_API_URL + `/categories/` + item?.category_id
                );

                return {
                    ...item,
                    category: await res.json(),
                };
            })
        );

        posts_tab = await Promise.all(
            posts_tab.map(async (item) => {
                const res = await unfetch(
                    NEXT_PUBLIC_API_URL +
                        `/posts?categories=` +
                        item?.category_id +
                        "&per_page=6"
                );

                return {
                    ...item,
                    posts_list: await res.json(),
                };
            })
        );

        const formRes = await unfetch(
            NEXT_PUBLIC_GRAVITY_FORMS_URL + `/forms/1`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Basic " +
                        btoa(
                            NEXT_PUBLIC_USER_NAME + ":" + NEXT_PUBLIC_PASSWORD
                        ),
                },
            }
        );

        const form_data = await formRes.json();

        return {
            props: {
                ...meta_box,
                menu,
                default_page: default_meta_box,
                about_group,
                why_choose_group,
                posts_tab,
                form_data,
                title: homePageData[0]?.title?.rendered || "",
                content: homePageData[0]?.content?.rendered || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                form_url: NEXT_PUBLIC_GRAVITY_FORMS_URL || "",
            },
            // revalidate: REVALIDATE, // In seconds 1h
        };
    } catch (error) {
        return { props: { error: error?.message }, notFound: true };
    }
};

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
