import { Contact, FollowUs, Social } from "@/components/Contact/Banner";
import { fetcher } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";

export default function Page({
    background,
    seo_title,
    seo_description,
    ...props
}) {
    const { default_image } = useStore();

    return (
        <>
            <NextSeo
                title={
                    (seo_title || props?.title || "") + " - " + props?.site_name
                }
                description={seo_description || ""}
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

    const meta_box = {
        seo_title: contactPageData?.meta_box?.seo_title || "",
        seo_description: contactPageData?.meta_box?.seo_description || "",
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
