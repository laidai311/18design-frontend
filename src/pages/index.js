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

export default function Page({ site_name, message, seo_body, ...props }) {
    return (
        <>
            <NextSeo
                title={seo_body?.meta_title || site_name}
                description={seo_body?.meta_description || ""}
                additionalMetaTags={[
                    {
                        name: "viewport",
                        content:
                            "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no",
                    },
                ]}
            />
            <Slider {...props} />
            <Quote />
            <About {...props} />
            <TypicalProject />
            <Contact {...props} />
            <Whychoose {...props} />
            <OutPartner {...props} />
        </>
    );
}

export async function getServerSideProps() {
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;

    try {
        const res = await unfetch(NEXT_PUBLIC_API_URL + "/api/home?populate=*");
        const data = await res.json();

        const attributes = data?.data?.attributes || {};

        const why_choose_icons = getArrayStrapi(
            attributes?.why_choose_icons?.data
        );

        attributes.why_choose_list =
            "why_choose_list" in attributes &&
            Array.isArray(attributes.why_choose_list)
                ? attributes.why_choose_list.map((item) => ({
                      ...item,
                      icon_link:
                          NEXT_PUBLIC_API_URL +
                          get(why_choose_icons, { name: item?.icon_name })?.url,
                  }))
                : null;

        attributes.contact_background_link = getImageStrapi(
            attributes?.contact_background,
            "url",
            CONTACT_BACKGROUND_LINK
        );
        attributes.contact_background_name = getImageStrapi(
            attributes?.contact_background,
            "name",
            CONTACT_BACKGROUND_NAME
        );

        attributes.about_background_link = getImageStrapi(
            attributes?.about_background,
            "url",
            ABOUT_BACKGROUND_LINK
        );

        const about_icons = getArrayStrapi(attributes?.about_icons?.data);

        attributes.about_list =
            "why_choose_list" in attributes &&
            Array.isArray(attributes.about_list)
                ? attributes.about_list.map((item) => ({
                      ...item,
                      icon_link:
                          NEXT_PUBLIC_API_URL +
                          get(about_icons, { name: item?.icon_name })?.url,
                  }))
                : ABOUT_LIST;

        return {
            props: {
                ...attributes,
                meta: data?.meta || {},
                message: data?.error?.message || "",
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
