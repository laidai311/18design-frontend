import DefaultLayout from "@/components/Layout";
import { Card } from "@/components/Card";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";
import { getMenu } from "@/utils";
import { usePagination } from "@/hooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import Component404 from "@/components/404";

export default function Page({
    posts,
    seo_title,
    seo_description,
    title,
    content,
    site_name,
    pagination,
    currentPage,
    tag,
    status,
    error,
    category,
    default_image,
}) {
    const router = useRouter();

    const paginationParam = usePagination({
        total: Math.ceil(pagination?.total / pagination?.limit),
        initialPage: 1,
        page: (currentPage || 0) + 1,
        siblings: 1,
        boundaries: 1,
        onChange: (value) => {
            router.push({
                pathname: window.location.pathname,
                query: { page: value },
            });
        },
    });

    return (
        <>
            <NextSeo
                title={(seo_title || title || "") + " - " + site_name}
                description={seo_description || ""}
            />
            {status ? (
                <section key={tag + currentPage} className="min-h-[80vh] pt-10">
                    <div className="container max-w-7xl mx-auto">
                        <h1 className="border-b-2 border-primary uppercase mb-8 text-center text-2xl leading-9">
                            {title || ""}
                        </h1>
                        <ReadOnlyEditor content={content || ""} className={'mb-10'} />

                        <div className="-m-4 flex flex-wrap">
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
                                        <button
                                            key={item}
                                            onClick={() => {
                                                paginationParam.setPage(item);
                                            }}
                                            className={clsx(
                                                "border h-8 w-8 flex items-center justify-center rounded-full transition-all hover:bg-primary/70 hover:text-white",
                                                {
                                                    "bg-primary/70 text-white":
                                                        paginationParam?.active ===
                                                        item,
                                                }
                                            )}
                                        >
                                            {item}
                                        </button>
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

export async function getServerSideProps(context) {
    const {
        NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_USER_NAME,
        NEXT_PUBLIC_PASSWORD,
    } = process.env;
    const { category, page: currentPage = 1 } = context.query;

    try {
        const [menuData, defaulPageData, categoryPageData] = await Promise.all(
            [
                "/menu-items",
                "/pages?slug=mac-dinh",
                `/categories?slug=${category}`,
            ].map(async (url) => {
                const res = await unfetch(NEXT_PUBLIC_API_URL + url, {
                    method: "GET",
                    headers: {
                        Authorization:
                            "Basic " +
                            btoa(
                                NEXT_PUBLIC_USER_NAME +
                                    ":" +
                                    NEXT_PUBLIC_PASSWORD
                            ),
                    },
                });
                return res.json();
            })
        );

        const menu = getMenu(menuData);
        const meta_box = defaulPageData[0]?.meta_box || {};
        const category_meta_box = categoryPageData[0]?.meta_box || {};

        const [postsData] = await Promise.all(
            [`/posts?categories=${categoryPageData[0]?.id}`].map(
                async (url) => {
                    const res = await unfetch(NEXT_PUBLIC_API_URL + url, {
                        method: "GET",
                        headers: {
                            Authorization:
                                "Basic " +
                                btoa(
                                    NEXT_PUBLIC_USER_NAME +
                                        ":" +
                                        NEXT_PUBLIC_PASSWORD
                                ),
                        },
                    });
                    return res.json();
                }
            )
        );

        return {
            props: {
                ...meta_box,
                menu,
                posts: postsData,
                category: category,
                title: category_meta_box?.title || "",
                content: category_meta_box?.content || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                status: true,
            },
        };
    } catch (error) {
        return {
            props: {
                message: error.message,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                status: false,
            },
        };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
