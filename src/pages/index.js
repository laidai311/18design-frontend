import DefaultLayout from "@/components/Layout";
import { Quote, Seasion2, TypicalProject } from "@/components/Home";
import { Slider } from "@/components/Home/Slider";
import { Pricing } from "@/components/Home/Pricing";
import { OutPartner } from "@/components/Home/OutPartner";
import Whychoose from "@/components/Home/Whychoose";
import { NextSeo } from "next-seo";
import unfetch from "isomorphic-unfetch";

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
            <Seasion2 />
            <TypicalProject />
            <Pricing />
            <Whychoose />
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
