import DefaultLayout from "@/components/Layout";
import { Card } from "@/components/Card";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";
import { getArrayStrapi } from "@/utils";
import { usePagination } from "@/hooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import { LIMIT_LIST } from "@/constant/default";
import Component404 from "@/components/404";

export default function Page({
    posts,
    seo_body,
    title,
    content,
    site_name,
    pagination,
    currentPage,
    tag,
    property,
    status,
    error,
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
                title={
                    (seo_body?.meta_title || title || "") + " - " + site_name
                }
                description={seo_body?.meta_description || ""}
            />
            {status ? (
                <section key={tag + currentPage} className="min-h-[80vh] pt-10">
                    <div className="container max-w-7xl mx-auto">
                        <h1 className="border-b-2 border-primary uppercase mb-8 text-center text-2xl leading-9">
                            {title || ""}
                        </h1>
                        <ReadOnlyEditor content={content || ""} />

                        <div className="-m-4 flex flex-wrap">
                            {Array.isArray(posts)
                                ? posts.map((itm) => (
                                      <Card
                                          {...itm}
                                          property={property}
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
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;
    const { tag = null, page: currentPage = 1 } = context.query;

    try {
        const [property, tagPage, posts] = await Promise.all(
            [
                "/api/property?populate=*",
                `/api/pages/${tag}`,
                `/api/posts?populate=*&filters[tag][$eq]=${tag}&pagination[start]=${
                    currentPage - 1 ? (+currentPage - 1) * LIMIT_LIST : 0
                }&pagination[limit]=${LIMIT_LIST}`,
            ].map(async (url) => {
                const res = await unfetch(NEXT_PUBLIC_API_URL + url);
                return res.json();
            })
        );

        const propertyAttr = property?.data?.attributes || {};
        const tagPageAttr = tagPage?.data?.attributes || {};
        const postArr = getArrayStrapi(posts?.data, []);

        if (tagPage?.error?.message) {
            tagPageAttr.status = false;
            tagPageAttr.error = tagPage?.error?.message;
        } else tagPageAttr.status = true;

        return {
            props: {
                ...tagPageAttr,
                property: propertyAttr,
                posts: postArr,
                currentPage: currentPage - 1,
                tag: tag,
                pagination: posts.meta?.pagination || {},
                meta: tagPageAttr?.meta || {},
                message: tagPageAttr?.error?.message || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
            },
        };
    } catch (error) {
        return {
            props: {
                status: false,
                error: error.message,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
            },
        };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
