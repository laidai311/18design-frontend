import { AboutUs } from "@/components/AboutUs";
import { fetcher } from "@/utils";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";

export default function Page({ seo_title, seo_description, title, content }) {
    const { site_name } = useStore();

    return (
        <>
            <NextSeo
                title={`${title || seo_title || ""} - ${site_name}`}
                description={seo_description || ""}
            />
            <AboutUs title={title} content={content} />
        </>
    );
}

export async function getStaticProps() {
    const abputPage = await fetcher("/pages?slug=ve-chung-toi").catch(
        () => undefined
    );
    const aboutPageData = abputPage?.data?.[0] || {};

    const meta_box = {
        seo_title: aboutPageData?.meta_box?.seo_title || "",
        seo_description: aboutPageData?.meta_box?.seo_description || "",
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
