import { Card } from "@/components/Card";
import { getMenu } from "@/utils";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { usePagination } from "@/hooks";
import { useRouter } from "next/router";
import clsx from "clsx";
import Component404 from "@/components/404";
import DefaultLayout from "@/components/Layout";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";
import unfetch from "isomorphic-unfetch";

export default function Page({
    posts,
    seo_title,
    seo_description,
    title,
    content,
    site_name,
    tag,
    status,
    error,
    default_image,
    total_posts,
    limit_posts,
    curr_page,
    category,
}) {
    const router = useRouter();

    const paginationParam = usePagination({
        total: Math.ceil(total_posts / limit_posts),
        initialPage: 1,
        page: (curr_page || 0) === 0 ? curr_page + 1 : curr_page,
        siblings: 1,
        boundaries: 1,
        onChange: (value) => {
            router.push({
                pathname: window.location.pathname + "/page/" + value,
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
                                        <button
                                            key={item}
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

// export const getStaticPaths = async (context) => {
//     const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_USER_NAME, NEXT_PUBLIC_PASSWORD } =
//         process.env;

//     const categoriesRes = await unfetch(NEXT_PUBLIC_API_URL + `/categories`, {
//         method: "GET",
//         headers: {
//             Authorization:
//                 "Basic " +
//                 btoa(NEXT_PUBLIC_USER_NAME + ":" + NEXT_PUBLIC_PASSWORD),
//         },
//     });

//     const categoriesData = await categoriesRes.json();

//     const paths = categoriesData.map((item) => ({
//         params: { category: item?.slug },
//     }));

//     return {
//         paths,
//         fallback: false,
//     };
// };

export async function getServerSideProps(context) {
    try {
        const {
            NEXT_PUBLIC_SITE_NAME,
            NEXT_PUBLIC_API_URL,
            NEXT_PUBLIC_USER_NAME,
            NEXT_PUBLIC_PASSWORD,
            NEXT_PUBLIC_GRAVITY_FORMS_URL,
        } = process.env;
        const category = context.params?.category || "";
        const curr_page = context.query?.page || 1;
        const per_page = 9;

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

        const default_meta_box = defaulPageData[0]?.meta_box || {};

        const meta_box = categoryPageData[0]?.meta_box || {};

        const postRes = await unfetch(
            NEXT_PUBLIC_API_URL +
                `/posts?categories=` +
                categoryPageData[0]?.id +
                `&per_page=${per_page}`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Basic " +
                        btoa(
                            NEXT_PUBLIC_USER_NAME + ":" + NEXT_PUBLIC_PASSWORD
                        ),
                },
            }
        );

        const total = postRes.headers.get("x-wp-total");
        const postsData = await postRes.json();

        const formRes = await unfetch(
            NEXT_PUBLIC_GRAVITY_FORMS_URL + `/forms/1`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Basic " +
                        btoa(
                            NEXT_PUBLIC_USER_NAME + ":" + NEXT_PUBLIC_PASSWORD
                        ),
                },
            }
        );

        const form_data = await formRes.json();

        return {
            props: {
                ...meta_box,
                menu,
                default_page: default_meta_box,
                form_data,
                category: categoryPageData[0],
                posts: postsData,
                total_posts: +total,
                limit_posts: +per_page,
                curr_page: +curr_page,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                form_url: NEXT_PUBLIC_GRAVITY_FORMS_URL || "",
                status: true,
            },
            // revalidate: REVALIDATE, // In seconds 1h
        };
    } catch (error) {
        return { props: { error: error?.message }, notFound: true };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
