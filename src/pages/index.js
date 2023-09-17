import DefaultLayout from "@/components/Layout";
import { Quote, About, TypicalProject } from "@/components/Home";
import { Slider } from "@/components/Home/Slider";
import { Contact } from "@/components/Home/Contact";
import { OutPartner } from "@/components/Home/OutPartner";
import Whychoose from "@/components/Home/Whychoose";
import { NextSeo } from "next-seo";
import unfetch from "isomorphic-unfetch";
import { get, getArrayStrapi, getImageStrapi } from "@/utils";
import {
    ABOUT_BACKGROUND_LINK,
    CONTACT_BACKGROUND_LINK,
    CONTACT_BACKGROUND_NAME,
} from "@/constant/default";
import { ABOUT_LIST } from "@/constant/about-list";
import { fakeHome, fakePostGroup, fakeProperty } from "@/stores/fakeData";

export default function Page({ site_name, message, seo_body, ...props }) {
    return (
        <>
            <NextSeo
                title={seo_body?.meta_title || site_name}
                description={seo_body?.meta_description || ""}
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
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;

    try {
        // const [property, home] = await Promise.all(
        //     ["/api/property?populate=*", "/api/home?populate=*"].map(
        //         async (url) => {
        //             const res = await unfetch(NEXT_PUBLIC_API_URL + url);
        //             return res.json();
        //         }
        //     )
        // );

        const propertyAttr = fakeProperty?.data?.attributes || {};
        const homeAttr = fakeHome?.data?.attributes || {};

        const why_choose_icons = getArrayStrapi(
            homeAttr?.why_choose_icons?.data,
            []
        );

        homeAttr.why_choose_list =
            "why_choose_list" in homeAttr &&
            Array.isArray(homeAttr.why_choose_list)
                ? homeAttr.why_choose_list.map((item) => ({
                      ...item,
                      icon_link:
                          NEXT_PUBLIC_API_URL +
                          get(why_choose_icons, { name: item?.icon_name })?.url,
                  }))
                : null;

        homeAttr.contact_background_link = getImageStrapi(
            homeAttr?.contact_background,
            "url",
            CONTACT_BACKGROUND_LINK
        );
        homeAttr.contact_background_name = getImageStrapi(
            homeAttr?.contact_background,
            "name",
            CONTACT_BACKGROUND_NAME
        );

        homeAttr.about_background_link = getImageStrapi(
            homeAttr?.about_background,
            "url",
            ABOUT_BACKGROUND_LINK
        );

        const about_icons = getArrayStrapi(homeAttr?.about_icons?.data, []);

        homeAttr.about_list =
            "why_choose_list" in homeAttr && Array.isArray(homeAttr.about_list)
                ? homeAttr.about_list.map((item) => ({
                      ...item,
                      icon_link:
                          NEXT_PUBLIC_API_URL +
                          get(about_icons, { name: item?.icon_name })?.url,
                  }))
                : ABOUT_LIST;

        // const postGroup = await Promise.all(
        //     Array.isArray(homeAttr?.post_tab) &&
        //         homeAttr.post_tab.map(async (tab) => {
        //             const resp = await unfetch(
        //                 NEXT_PUBLIC_API_URL +
        //                     `/api/posts?populate=*&filters[tag][$eq]=${tab?.tag}&pagination[limit]=6`
        //             );
        //             return resp.json();
        //         })
        // );

        homeAttr.post_group = homeAttr.post_tab.map((item, index) => ({
            ...item,
            items: getArrayStrapi(fakePostGroup?.[index]?.data, []) || [],
        }));

        return {
            props: {
                ...homeAttr,
                property: propertyAttr,
                // meta: home?.meta || {},
                // message: home?.error?.message || "",
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
