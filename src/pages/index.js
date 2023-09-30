import { Contact } from "@/components/Home/Contact";
import { fetcher } from "@/utils";
import { NextSeo } from "next-seo";
import { OutPartner } from "@/components/Home/OutPartner";
import { Quote, About, TypicalProject } from "@/components/Home";
import { REVALIDATE } from "@/constant/setting";
import { Slider } from "@/components/Home/Slider";
import { useEffect, useState } from "react";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";
import Whychoose from "@/components/Home/Whychoose";

export default function Page({
    seo,
    about_group,
    posts_tab,
    why_choose_group,
    ...props
}) {
    const { formfieldsLoading, site_name } = useStore();
    const [aboutGroupLoading, setAboutGroupLoading] = useState(true);
    const [aboutGroup, setAboutGroup] = useState(about_group);

    useEffect(() => {
        const fetchAboutGroup = async () => {
            const _aboutGroup = await Promise.all(
                Array.isArray(about_group)
                    ? about_group.map(async (item) => {
                          const icon = await fetcher(`/media/${item?.icon}`);

                          return {
                              ...item,
                              icon_link: icon?.data?.source_url || "",
                              icon_name: icon?.data?.title?.rendered || "",
                          };
                      })
                    : []
            );
            setAboutGroup(_aboutGroup);
            setAboutGroupLoading(false);
        };
        if (!formfieldsLoading) {
            fetchAboutGroup();
        }
    }, [formfieldsLoading, about_group]);

    const [postsLoading, setPostsLoading] = useState(true);
    const [postsFetching, setPostsFetch] = useState(false);
    const [postsTab, setPostsTab] = useState(posts_tab || []);
    const [activedTab, setActivedTab] = useState(posts_tab?.[0]?.category_id);

    useEffect(() => {
        const fetchPostsTab = async () => {
            setPostsFetch(true);

            const posts_list = await fetcher(
                `/posts?categories=${activedTab || ""}&per_page=6`
            );

            setPostsTab((current) =>
                current.map((item) => {
                    if (item.category_id === activedTab) {
                        return {
                            ...item,
                            posts_list: posts_list?.data || {},
                        };
                    }
                    return item;
                })
            );
            setPostsLoading(false);
            setPostsFetch(false);
        };
        if (!aboutGroupLoading) {
            fetchPostsTab();
        }
    }, [aboutGroupLoading, activedTab]);

    const [whyChooseGroupLoading, setWhyChooseGroupLoading] = useState(true);
    const [whyChooseGroup, setWhyChooseGroup] = useState(why_choose_group);

    useEffect(() => {
        const fetchWhyChooseGroup = async () => {
            const _whyChooseGroup = await Promise.all(
                Array.isArray(why_choose_group)
                    ? why_choose_group.map(async (item) => {
                          const icon =
                              (await fetcher(`/media/${item?.icon}`)) || {};

                          return {
                              ...item,
                              icon_link: icon?.data?.source_url || "",
                              icon_name: icon?.data?.title?.rendered || "",
                          };
                      })
                    : []
            );
            setWhyChooseGroup(_whyChooseGroup);
            setWhyChooseGroupLoading(false);
        };
        if (!postsLoading) {
            fetchWhyChooseGroup();
        }
    }, [postsLoading, why_choose_group]);

    return (
        <>
            <NextSeo
                title={seo?.seo_title || site_name || ""}
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
            <Slider {...props} />
            <Quote />
            <About
                aboutGroup={aboutGroup}
                aboutGroupLoading={aboutGroupLoading}
                {...props}
            />
            <TypicalProject
                postsTab={postsTab}
                activedTab={activedTab}
                isFetching={postsLoading || postsFetching}
                setActivedTab={setActivedTab}
                {...props}
            />
            <Contact {...props} />
            <Whychoose
                whyChooseGroup={whyChooseGroup}
                whyChooseGroupLoading={whyChooseGroupLoading}
                {...props}
            />
            <OutPartner {...props} />
        </>
    );
}

export const getStaticProps = async (context) => {
    const homePage = await fetcher("/pages?slug=trang-chu").catch(
        () => undefined
    );
    const homePageData = homePage?.data?.[0] || {};

    const slider_images = homePageData?.meta_box?.slider_images?.length
        ? homePageData?.meta_box?.slider_images?.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.full_url || "#",
          }))
        : [];

    const our_partner_images = homePageData?.meta_box?.our_partner_images
        ?.length
        ? homePageData?.meta_box?.our_partner_images?.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.full_url || "#",
          }))
        : [];

    const seo_opengraph_images = homePageData?.meta_box?.seo_opengraph_images
        ?.length
        ? homePageData?.meta_box?.seo_opengraph_images?.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.sizes?.medium_large?.url || item?.full_url || "#",
              width: item?.sizes?.medium_large?.width || "",
              height: item?.sizes?.medium_large?.height || "",
          }))
        : [];

    const meta_box = {
        description: homePageData?.meta_box?.description || "",
        email: homePageData?.meta_box?.email || "",
        address: homePageData?.meta_box?.address || "",
        phone: homePageData?.meta_box?.phone || "",
        title: homePageData?.title?.rendered || "",
        id: homePageData?.id || "",
        slug: homePageData?.slug || "",
        slider_images,
        about_title: homePageData?.meta_box?.about_title || "",
        about_description: homePageData?.meta_box?.about_description || "",
        about_group: homePageData?.meta_box?.about_group || [],
        about_background: {
            alt: homePageData?.meta_box?.about_background?.alt || "",
            url: homePageData?.meta_box?.about_background?.full_url || "",
        },
        contact_background: {
            alt: homePageData?.meta_box?.contact_background?.alt || "",
            url: homePageData?.meta_box?.contact_background?.full_url || "",
        },
        why_choose_group: homePageData?.meta_box?.why_choose_group || [],
        why_choose_background: {
            alt: homePageData?.meta_box?.why_choose_background?.alt || "",
            url: homePageData?.meta_box?.why_choose_background?.full_url || "",
        },
        our_partner_images,
        posts_tab: homePageData?.meta_box?.posts_tab || [],
        seo: {
            seo_title: homePageData?.meta_box?.seo_title || "",
            seo_description: homePageData?.meta_box?.seo_description || "",
            seo_noindex: homePageData?.meta_box?.seo_noindex || "",
            seo_title_template:
                homePageData?.meta_box?.seo_title_template || "",
            seo_default_title: homePageData?.meta_box?.seo_default_title || "",
            seo_canonical: homePageData?.meta_box?.seo_canonical || "",
            seo_openGraph_url: homePageData?.meta_box?.seo_openGraph_url || "",
            seo_openGraph_title:
                homePageData?.meta_box?.seo_openGraph_title || "",
            seo_openGraph_description:
                homePageData?.meta_box?.seo_openGraph_description || "",
            seo_openGraph_images: seo_opengraph_images,
            seo_openGraph_siteName:
                homePageData?.meta_box?.seo_openGraph_siteName || "",
            seo_twitter_handle:
                homePageData?.meta_box?.seo_twitter_handle || "",
            seo_twitter_site: homePageData?.meta_box?.seo_twitter_site || "",
            seo_twitter_cardType:
                homePageData?.meta_box?.seo_twitter_cardType || "",
        },
    };

    return {
        props: meta_box,
        revalidate: REVALIDATE, // In seconds 1h
        notFound: homePage === undefined || homePage?.data?.length === 0,
    };
};

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
