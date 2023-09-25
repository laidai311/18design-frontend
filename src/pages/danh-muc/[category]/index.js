import { Card } from "@/components/Card";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { usePagination } from "@/hooks";
import { useRouter } from "next/router";
import clsx from "clsx";
import Component404 from "@/components/404";
import DefaultLayout from "@/components/Layout";
import Link from "next/link";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";
import unfetch from "isomorphic-unfetch";
import { fetcher } from "@/utils";
import { useEffect, useState } from "react";
import { useStore } from "@/stores";

export default function Page({
    seo_title,
    seo_description,
    title,
    content,
    site_name,
    tag,
    error,
    default_image,
    total_posts,
    limit_posts,
    curr_page,
    category,
}) {
    const { formfieldsLoading } = useStore();
    const [postLoading, setPostLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPostbyCategory = async () => {
            const postsData = await fetcher(
                `/posts?categories=` +
                    categoryPageData[0]?.id +
                    `&per_page=${per_page}`
            );
            setPosts(postsData);
            setPostLoading(false);
        };
        if (formfieldsLoading) return;
        fetchPostbyCategory();
    }, [formfieldsLoading]);

    const paginationParam = usePagination({
        total: Math.ceil(total_posts / limit_posts),
        initialPage: 1,
        page: (curr_page || 0) === 0 ? curr_page + 1 : curr_page,
        siblings: 1,
        boundaries: 1,
    });

    return (
        <>
            <NextSeo
                title={(seo_title || title || "") + " - " + site_name}
                description={seo_description || ""}
            />
            {!error ? (
                <section key={tag + curr_page} className="min-h-[80vh] py-10">
                    <div className="container max-w-7xl mx-auto">
                        <h1 className="border-b-2 border-primary uppercase mb-8 text-center text-2xl leading-9">
                            {title || ""}
                        </h1>
                        <ReadOnlyEditor
                            content={content || ""}
                            className={"mb-10"}
                        />

                        <div className="-m-4 flex flex-wrap px-4 md:px-0">
                            {Array.isArray(posts)
                                ? posts.map((itm) => (
                                      <Card
                                          {...itm}
                                          category={category}
                                          default_image={default_image}
                                          key={itm.id}
                                          className="w-full p-4 md:w-1/2 lg:w-1/3"
                                      />
                                  ))
                                : null}
                        </div>
                        {posts?.length ? (
                            <div className="flex items-center justify-center space-x-2 mt-10">
                                {paginationParam?.range?.map((item, index) => {
                                    if (item === "dots") {
                                        return (
                                            <div key={item + index}>...</div>
                                        );
                                    }
                                    return (
                                        <Link
                                            key={item}
                                            href={
                                                "/danh-muc/" +
                                                category?.slug +
                                                "/page/" +
                                                item
                                            }
                                            onClick={() => {
                                                paginationParam.setPage(item);
                                            }}
                                            className={clsx(
                                                "border h-8 w-8 flex items-center justify-center rounded-full transition-all hover:bg-primary/70 hover:text-white",
                                                {
                                                    "bg-primary/70 text-white":
                                                        paginationParam?.active ==
                                                        item,
                                                }
                                            )}
                                        >
                                            {item}
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                </section>
            ) : (
                <Component404 message={error} />
            )}
        </>
    );
}

export const getStaticPaths = async (context) => {
    // const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_USER_NAME, NEXT_PUBLIC_PASSWORD } =
    //     process.env;

    // const categoriesRes = await unfetch(NEXT_PUBLIC_API_URL + `/categories`, {
    //     method: "GET",
    //     headers: {
    //         Authorization:
    //             "Basic " +
    //             btoa(NEXT_PUBLIC_USER_NAME + ":" + NEXT_PUBLIC_PASSWORD),
    //     },
    // });

    // const categoriesData = await categoriesRes.json();

    // const paths = categoriesData.map((item) => ({
    //     params: { category: item?.slug },
    // }));

    return {
        paths: [],
        fallback: false,
    };
};

export async function getStaticProps(context) {
    try {
        const category = context.params?.category || "";

        const categoryPageData =
            (await fetcher(
                isNaN(category)
                    ? `/categories?slug=${category}`
                    : `/categories/${category}`
            ).catch((err) => undefined)?.data) || {};

        let meta_box = {};

        if (typeof categoryPageData === "object") {
            meta_box = categoryPageData?.meta_box;
            meta_box.category_slug = categoryPageData?.slug || "";
        } else {
            meta_box = categoryPageData?.[0]?.meta_box;
            meta_box.category_slug = categoryPageData?.[0]?.slug || "";
        }

        // const postRes = await unfetch(
        //     NEXT_PUBLIC_API_URL +
        //         `/posts?categories=` +
        //         categoryPageData[0]?.id +
        //         `&per_page=${per_page}`
        // );

        // const total = postRes.headers.get("x-wp-total");
        // const postsData = await postRes.json();

        return {
            props: {
                ...meta_box,
                // category: categoryPageData[0],
                // posts: postsData,
                // total_posts: +total,
            },
            revalidate: REVALIDATE, // In seconds 1h
        };
    } catch (error) {
        console.log(error);
        return { props: { error: error?.message }, notFound: true };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
