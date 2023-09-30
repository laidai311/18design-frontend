import { AboutUs } from "@/components/AboutUs";
import { fetcher } from "@/utils";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import Component404 from "@/components/404";
import DefaultLayout from "@/components/Layout";

export default function Page({ error, seo_title, seo_description, ...props }) {
    return (
        <>
            <NextSeo
                title={
                    (seo_title || props?.title || "") + " - " + props?.site_name
                }
                description={seo_description || ""}
            />
            {error ? <Component404 message={error} /> : <AboutUs {...props} />}
        </>
    );
}

export async function getStaticProps() {
    const abputPage = await fetcher("/pages?slug=ve-chung-toi").catch(
        () => undefined
    );
    const aboutPageData = abputPage?.data?.[0] || {};
    const meta_box = {
        ...aboutPageData?.meta_box,
        title: aboutPageData?.title?.rendered || "",
        content: aboutPageData?.content?.rendered || "",
    };

    return {
        props: meta_box,
        revalidate: REVALIDATE, // In seconds 1h
        notFound: abputPage === undefined || abputPage?.data?.length === 0,
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
