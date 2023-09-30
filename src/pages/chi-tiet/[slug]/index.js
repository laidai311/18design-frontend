import { fetcher, range } from "@/utils";
import { IconEye } from "@/components/Icons";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { useEffect, useState } from "react";
import { useStore } from "@/stores";
import Comment from "@/components/Comment";
import ContactForm from "@/components/ContactForm";
import DefaultLayout from "@/components/Layout";
import Link from "next/link";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";

export default function Page({
    seo,
    title,
    content,
    total_view,
    id,
    categories,
}) {
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesData, setCategoriesData] = useState();
    const { formfieldsLoading, site_name } = useStore();

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesGroup = await Promise.all(
                Array.isArray(categories)
                    ? categories.map(async (item) => {
                          const category = await fetcher(
                              `/categories/${item}`
                          ).catch(() => undefined);

                          return category?.data || {};
                      })
                    : []
            );
            setCategoriesLoading(false);
            setCategoriesData(categoriesGroup);
        };
        if (!formfieldsLoading) {
            fetchCategories();
        }
    }, [formfieldsLoading, categories]);

    const [postsLoading, setPostsLoading] = useState(true);
    const [posts, setPosts] = useState();

    useEffect(() => {
        const fetchPosts = async () => {
            const posts =
                categories?.length > 0
                    ? await fetcher(
                          `/posts?categories=${categories[0]}&per_page=8`
                      ).catch(() => undefined)
                    : {};

            setPostsLoading(false);

            if (Array.isArray(posts?.data)) {
                setPosts(
                    posts?.data
                        ?.filter((item) => item?.id !== id)
                        .map((item) => ({
                            ...item,
                            category_slug: categoriesData[0]?.slug,
                        }))
                );
            }
        };
        if (!categoriesLoading) {
            fetchPosts();
        }
    }, [categoriesLoading, categories, categoriesData, id]);

    useEffect(() => {
        if (id) {
            fetcher(`/total_view/${id}`);
        }
    }, [id]);

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
            <section className="relative mb-10">
                <div className="container mx-auto max-w-7xl px-3">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="p-4 w-full lg:w-2/3 space-y-3">
                            <div className="p-4 lg:p-8 shadow-lg rounded-lg">
                                <div className="space-x-1">
                                    {categoriesLoading ? (
                                        <div class="animate-pulse flex space-x-2">
                                            <div class="rounded-full bg-black/5 h-5 w-20"></div>
                                            <div class="rounded-full bg-black/5 h-5 w-10"></div>
                                            <div class="rounded-full bg-black/5 h-5 w-16"></div>
                                        </div>
                                    ) : Array.isArray(categoriesData) ? (
                                        categoriesData.map((item, index) => {
                                            if (index >= 3) return null;
                                            return (
                                                <Link
                                                    key={index}
                                                    href={`/${item?.slug}`}
                                                >
                                                    <div className="inline-block opacity-80 border rounded-full px-2 mb-2 text-sm hover:bg-black/5 transition-colors">
                                                        {item?.name || ""}
                                                    </div>
                                                </Link>
                                            );
                                        })
                                    ) : null}
                                </div>
                                <h1 className="font-semibold text-2xl pb-5">
                                    {title || ""}
                                </h1>
                                <div className="flex items-center space-x-2 pb-3">
                                    <IconEye />
                                    <div>{total_view || 0}</div>
                                </div>
                                <ReadOnlyEditor content={content || ""} />
                            </div>
                            {/* <div className="overflow-hidden shadow-lg rounded-lg">
                                <Comment />
                            </div> */}
                        </div>
                        <div className="p-4 w-full lg:w-1/3 space-y-8">
                            <div className="shadow-lg p-4 bg-white rounded-lg">
                                <h3 className="font-semibold uppercase text-center text-lg mb-1">
                                    Miễn phí 100% <br /> phí thiết kế nội thất
                                </h3>
                                <h4 className="uppercase text-center font-semibold mb-5">
                                    Trong duy nhất hôm nay
                                </h4>
                                <ContactForm closeButton={false} />
                            </div>
                            <div className="overflow-hidden rounded-lg">
                                <h3 className="uppercase bg-[#e5b936] px-6 py-4 font-semibold text-white">
                                    {categoriesData?.[0]?.name || "Bài viết"}{" "}
                                    mới nhất
                                </h3>
                                <div className="py-4 bg-[#e5b9364a]">
                                    {postsLoading
                                        ? range(0, 5).map((key) => (
                                              <div
                                                  key={key}
                                                  class="animate-pulse flex space-x-2 px-3 py-3"
                                              >
                                                  <div class="rounded-lg bg-black/5 w-24 h-24"></div>
                                                  <div className="grow space-y-2">
                                                      <div class="rounded-full bg-black/5 h-4"></div>
                                                      <div class="rounded-full bg-black/5 h-4 w-20"></div>
                                                  </div>
                                              </div>
                                          ))
                                        : Array.isArray(posts)
                                        ? posts.map((item, index) => (
                                              <CardItem
                                                  key={item?.id || index}
                                                  {...item}
                                              />
                                          ))
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export const getStaticPaths = async () => {
    const posts = await fetcher(`/posts`).catch(() => undefined);

    const paths = Array.isArray(posts?.data)
        ? posts.data.map((item) => ({
              params: { slug: item?.slug || "" },
          }))
        : [];

    return {
        paths,
        fallback: "blocking",
    };
};

export async function getStaticProps(context) {
    const slug = context.params?.slug || "";

    const post = await fetcher(
        isNaN(+slug) ? `/posts?slug=${slug}` : `/posts/${slug}`
    ).catch(() => undefined);

    const postData = Array.isArray(post?.data)
        ? post?.data?.[0]
        : post?.data || {};

    const seo_opengraph_images = postData?.meta_box?.seo_opengraph_images
        ?.length
        ? postData?.meta_box?.seo_opengraph_images?.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.sizes?.medium_large?.url || item?.full_url || "#",
              width: item?.sizes?.medium_large?.width || "",
              height: item?.sizes?.medium_large?.height || "",
          }))
        : [];

    const meta_box = {
        total_view: postData?.meta_box?.total_view || "",
        description: postData?.meta_box?.description || "",
        image: {
            name: postData?.meta_box?.image?.name || "",
            url: postData?.meta_box?.image?.full_url || "",
        },
        slug: postData?.slug || "",
        id: postData?.id || "",
        title: postData?.title?.rendered || "",
        content: postData?.content?.rendered || "",
        categories: postData?.categories,
        tags: postData?.tags,
        seo: {
            seo_title: postData?.meta_box?.seo_title || "",
            seo_description: postData?.meta_box?.seo_description || "",
            seo_noindex: postData?.meta_box?.seo_noindex || "",
            seo_title_template: postData?.meta_box?.seo_title_template || "",
            seo_default_title: postData?.meta_box?.seo_default_title || "",
            seo_canonical: postData?.meta_box?.seo_canonical || "",
            seo_openGraph_url: postData?.meta_box?.seo_openGraph_url || "",
            seo_openGraph_title: postData?.meta_box?.seo_openGraph_title || "",
            seo_openGraph_description:
                postData?.meta_box?.seo_openGraph_description || "",
            seo_openGraph_images: seo_opengraph_images,
            seo_openGraph_siteName:
                postData?.meta_box?.seo_openGraph_siteName || "",
            seo_twitter_handle: postData?.meta_box?.seo_twitter_handle || "",
            seo_twitter_site: postData?.meta_box?.seo_twitter_site || "",
            seo_twitter_cardType:
                postData?.meta_box?.seo_twitter_cardType || "",
        },
    };

    return {
        props: meta_box,
        revalidate: REVALIDATE, // In seconds 1h
        notFound: post === undefined || post?.data?.length === 0,
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);

const CardItem = ({ title, meta_box, slug, category_slug }) => {
    const { defaultPage } = useStore();

    const image_link =
        meta_box?.image?.full_url || defaultPage?.default_image?.full_url;

    const image_name = meta_box?.image?.name || "18 design";

    const url = `/chi-tiet/${slug}`;

    return (
        <Link href={url} className="block">
            <div className="flex space-x-3 hover:bg-black/5 rounded-xl transition-colors px-3 py-3">
                <div className="w-24 h-24 overflow-hidden rounded-lg shrink-0">
                    <Img
                        src={image_link}
                        alt={image_name}
                        className="transition-transform duration-300 group-hover:scale-110 h-full w-full object-cover"
                    />
                </div>
                <h3 className="">{title?.rendered || ""}</h3>
            </div>
        </Link>
    );
};
