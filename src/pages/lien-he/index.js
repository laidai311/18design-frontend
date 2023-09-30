import { Contact, FollowUs, Social } from "@/components/Contact/Banner";
import { fetcher } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";

export default function Page({ background, seo, title, ...props }) {
    const { default_image, site_name } = useStore();

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
            <div className="w-full relative pt-[43%] h-auto lg:pt-0 lg:h-[60vh] bg-[#d4e1e7]">
                <div className="absolute inset-0 py-3 lg:py-20 px-3 container max-w-7xl mx-auto">
                    <Img
                        alt={background?.name || default_image?.name || ""}
                        src={background?.url || default_image?.full_url}
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

export async function getStaticProps() {
    const contactPage = await fetcher("/pages?slug=lien-he").catch(
        () => undefined
    );
    const contactPageData = contactPage ? contactPage?.data?.[0] : {};

    const images = Array.isArray(contactPageData?.meta_box?.images)
        ? contactPageData.meta_box.images.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.full_url || "",
          }))
        : [];

    const seo_opengraph_images = contactPageData?.meta_box?.seo_opengraph_images
        ?.length
        ? contactPageData?.meta_box?.seo_opengraph_images?.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.sizes?.medium_large?.url || item?.full_url || "#",
              width: item?.sizes?.medium_large?.width || "",
              height: item?.sizes?.medium_large?.height || "",
          }))
        : [];

    const meta_box = {
        description: contactPageData?.meta_box?.description || "",
        email: contactPageData?.meta_box?.email || "",
        address: contactPageData?.meta_box?.address || "",
        phone: contactPageData?.meta_box?.phone || "",
        social_group: contactPageData?.meta_box?.social_group || "",
        images,
        background: {
            alt:
                contactPageData?.meta_box?.background?.alt ||
                contactPageData?.meta_box?.background?.title ||
                "",
            url: contactPageData?.meta_box?.background?.full_url || "#",
        },
        title: contactPageData?.title?.rendered || "",
        content: contactPageData?.content?.rendered || "",
        seo: {
            seo_title: contactPageData?.meta_box?.seo_title || "",
            seo_description: contactPageData?.meta_box?.seo_description || "",
            seo_noindex: contactPageData?.meta_box?.seo_noindex || "",
            seo_title_template:
                contactPageData?.meta_box?.seo_title_template || "",
            seo_default_title:
                contactPageData?.meta_box?.seo_default_title || "",
            seo_canonical: contactPageData?.meta_box?.seo_canonical || "",
            seo_openGraph_url:
                contactPageData?.meta_box?.seo_openGraph_url || "",
            seo_openGraph_title:
                contactPageData?.meta_box?.seo_openGraph_title || "",
            seo_openGraph_description:
                contactPageData?.meta_box?.seo_openGraph_description || "",
            seo_openGraph_images: seo_opengraph_images,
            seo_openGraph_siteName:
                contactPageData?.meta_box?.seo_openGraph_siteName || "",
            seo_twitter_handle:
                contactPageData?.meta_box?.seo_twitter_handle || "",
            seo_twitter_site: contactPageData?.meta_box?.seo_twitter_site || "",
            seo_twitter_cardType:
                contactPageData?.meta_box?.seo_twitter_cardType || "",
        },
    };

    return {
        props: meta_box,
        revalidate: REVALIDATE, // In seconds 1h
        notFound: contactPage === undefined || contactPage?.data?.length === 0,
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
