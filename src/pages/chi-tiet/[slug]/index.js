import { fetcher } from "@/utils";
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
import Loader from "@/components/Loader";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";

export default function Page({
    seo_title,
    seo_description,
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
                title={`${title || seo_title || ""} - ${site_name}`}
                description={seo_description || ""}
            />
            <section className="relative mb-10">
                <div className="container mx-auto max-w-7xl px-3">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="p-4 w-full lg:w-2/3 space-y-3">
                            <div className="p-4 lg:p-8 shadow-lg rounded-lg">
                                <div className="space-x-1">
                                    {categoriesLoading ? (
                                        <Loader />
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
                                    {postsLoading ? (
                                        <Loader />
                                    ) : Array.isArray(posts) ? (
                                        posts.map((item, index) => (
                                            <CardItem
                                                key={item?.id || index}
                                                {...item}
                                            />
                                        ))
                                    ) : null}
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

    const meta_box = {
        ...(postData?.meta_box || {}),
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
