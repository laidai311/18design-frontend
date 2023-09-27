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
            <div className="w-full relative pt-[52%] h-auto lg:pt-0 lg:h-[80vh] bg-[#d4e1e7]">
                <div className="absolute inset-0 py-32 px-20">
                    <Img
                        alt={background?.title || default_image?.title || ""}
                        src={background?.full_url || default_image?.full_url}
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
    try {
        const contactPage = await fetcher("/pages?slug=lien-he").catch(
            (err) => undefined
        );
        const contactPageData = contactPage?.data?.[0] || {};
        const meta_box = {
            ...contactPageData?.meta_box,
            title: contactPageData?.title?.rendered || "",
            content: contactPageData?.content?.rendered || "",
        };

        return {
            props: meta_box,
            revalidate: REVALIDATE, // In seconds 1h
        };
    } catch (error) {
        return { props: { error: error?.message }, notFound: true };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
