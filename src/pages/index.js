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
    seo_title,
    seo_description,
    about_group,
    posts_tab,
    why_choose_group,
    ...props
}) {
    const [aboutGroupLoading, setAboutGroupLoading] = useState(true);
    const [aboutGroup, setAboutGroup] = useState(about_group);
    const { formfieldsLoading } = useStore();

    useEffect(() => {
        const fetchAboutGroup = async () => {
            const _aboutGroup = await Promise.all(
                Array.isArray(about_group)
                    ? about_group.map(async (item) => {
                          const icon = await fetcher(`/media/` + item?.icon);

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
        if (formfieldsLoading) return;
        fetchAboutGroup();
    }, [formfieldsLoading]);

    const [postsLoading, setPostsLoading] = useState(true);
    const [postsFetching, setPostsFetch] = useState(false);
    const [postsTab, setPostsTab] = useState(posts_tab || []);
    const [activedTab, setActivedTab] = useState(posts_tab?.[0]?.category_id);

    useEffect(() => {
        const fetchPostsTab = async () => {
            const posts_list = await fetcher(
                `/posts?categories=` + (activedTab || "") + "&per_page=6"
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
        if (aboutGroupLoading) return;
        setPostsFetch(true);
        fetchPostsTab();
    }, [aboutGroupLoading, activedTab]);

    const [whyChooseGroupLoading, setWhyChooseGroupLoading] = useState(true);
    const [whyChooseGroup, setWhyChooseGroup] = useState(why_choose_group);

    useEffect(() => {
        const fetchWhyChooseGroup = async () => {
            const _whyChooseGroup = await Promise.all(
                Array.isArray(why_choose_group)
                    ? why_choose_group.map(async (item) => {
                          const icon =
                              (await fetcher(`/media/` + item?.icon)) || {};

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
        if (postsLoading) return;
        fetchWhyChooseGroup();
    }, [postsLoading]);

    return (
        <>
            <NextSeo
                title={seo_title || props?.site_name || ""}
                description={seo_description || ""}
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
    try {
        const homePageData =
            (await fetcher("/pages?slug=trang-chu").catch((err) => undefined))
                ?.data || {};

        const meta_box = homePageData?.[0]
            ? {
                  ...homePageData?.[0]?.meta_box,
                  title: homePageData[0]?.title?.rendered || "",
                  content: homePageData[0]?.content?.rendered || "",
              }
            : {};

        return {
            props: meta_box,
            revalidate: REVALIDATE, // In seconds 1h
        };
    } catch (error) {
        return { props: { error: error?.message }, notFound: true };
    }
};

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
