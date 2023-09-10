import DefaultLayout from "@/components/Layout";
import { Quote, Seasion1, Seasion2, TypicalProject } from "@/components/Home";
import { Slider } from "@/components/Home/Slider";
import { Pricing } from "@/components/Home/Pricing";
import { Partner } from "@/components/Home/Partner";
import Whychoose from "@/components/Home/Whychoose";
import { NextSeo } from "next-seo";
import unfetch from "isomorphic-unfetch";

export default function Page({
    site_name,
    message,
    seo_body,
    image_slider,
    ...props
}) {
    return (
        <>
            <NextSeo
                title={seo_body?.meta_title || site_name}
                description={seo_body?.meta_description || ""}
            />
            <Slider images={image_slider} />
            <Quote />
            <Seasion2 />
            <TypicalProject />
            <Pricing />
            <Whychoose />
            <Partner />
        </>
    );
}

export async function getServerSideProps() {
    try {
        const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;

        const res = await unfetch(NEXT_PUBLIC_API_URL + "/api/home?populate=*");
        const data = await res.json();

        const attributes = data?.data?.attributes || {};

        return {
            props: {
                ...attributes,
                meta: data?.meta || {},
                message: data?.error?.message || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
            },
        };
    } catch (error) {
        return {
            props: {
                message: error.message,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
            },
        };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
