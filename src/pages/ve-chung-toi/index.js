import { AboutUs } from "@/components/AboutUs";
import { fetcher } from "@/utils";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";

export default function Page({ seo, title, content }) {
    const { site_name } = useStore();

    return (
        <>
            <NextSeo
                title={`${seo?.seo_title || title || ""} - ${site_name}`}
                description={seo?.seo_description || ""}
                noindex={seo?.seo_noindex || ""}
                titleTemplate={seo?.seo_title_template || ""}
                defaultTitle={seo?.seo_default_title || ""}
                canonical={seo?.seo_canonical || ""}
                openGraph={{
                    url: seo?.seo_openGraph_url || "",
                    title: seo?.seo_openGraph_title || "",
                    description: seo?.seo_openGraph_description || "",
                    images: seo?.seo_openGraph_images || [],
                    siteName: seo?.seo_openGraph_siteName || "",
                }}
                twitter={{
                    handle: seo?.seo_twitter_handle || "",
                    site: seo?.seo_twitter_site || "",
                    cardType: seo?.seo_twitter_cardType || "",
                }}
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

    const seo_opengraph_images = aboutPageData?.meta_box?.seo_opengraph_images
        ?.length
        ? aboutPageData?.meta_box?.seo_opengraph_images?.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.sizes?.medium_large?.url || item?.full_url || "#",
              width: item?.sizes?.medium_large?.width || "",
              height: item?.sizes?.medium_large?.height || "",
          }))
        : [];

    const meta_box = {
        title: aboutPageData?.title?.rendered || "",
        content: aboutPageData?.content?.rendered || "",
        seo: {
            seo_title: aboutPageData?.meta_box?.seo_title || "",
            seo_description: aboutPageData?.meta_box?.seo_description || "",
            seo_noindex: aboutPageData?.meta_box?.seo_noindex || "",
            seo_title_template:
                aboutPageData?.meta_box?.seo_title_template || "",
            seo_default_title: aboutPageData?.meta_box?.seo_default_title || "",
            seo_canonical: aboutPageData?.meta_box?.seo_canonical || "",
            seo_openGraph_url: aboutPageData?.meta_box?.seo_openGraph_url || "",
            seo_openGraph_title:
                aboutPageData?.meta_box?.seo_openGraph_title || "",
            seo_openGraph_description:
                aboutPageData?.meta_box?.seo_openGraph_description || "",
            seo_openGraph_images: seo_opengraph_images,
            seo_openGraph_siteName:
                aboutPageData?.meta_box?.seo_openGraph_siteName || "",
            seo_twitter_handle:
                aboutPageData?.meta_box?.seo_twitter_handle || "",
            seo_twitter_site: aboutPageData?.meta_box?.seo_twitter_site || "",
            seo_twitter_cardType:
                aboutPageData?.meta_box?.seo_twitter_cardType || "",
        },
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
