import DefaultLayout from "@/components/Layout";
import { Seasion1, Seasion2, TypicalProject } from "@/components/Home";
import { Slide } from "@/components/Home/Slide";
import { Pricing } from "@/components/Home/Pricing";
import { Partner } from "@/components/Home/Partner";
import Whychoose from "@/components/Home/Whychoose";
import { NextSeo } from "next-seo";
import unfetch from "isomorphic-unfetch";

export default function Home({ title, seo, error }) {
    return (
        <>
            <NextSeo
                title={seo?.meta_title || title}
                description={seo?.meta_description || ""}
            />
            <Slide />
            <Seasion1 />
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

        return {
            props: {
                menu: data.data.attributes.property.menu
                    ? data.data.attributes.property.menu
                    : null,
                seo: data.data.attributes.seo_body
                    ? data.data.attributes.seo_body
                    : null,
                error: data.error ? data.error : null,
                title: NEXT_PUBLIC_SITE_NAME || "",
            },
        };
    } catch (error) {
        return {
            props: {
                error: { message: error.message },
                title: NEXT_PUBLIC_SITE_NAME || "",
            },
        };
    }
}

Home.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
