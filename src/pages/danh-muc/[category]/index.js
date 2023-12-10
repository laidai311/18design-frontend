import { Card } from "@/components/Card";
import { fetcher, range } from "@/utils";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { useEffect, useState } from "react";
import { usePagination } from "@/hooks";
import { useRouter } from "next/router";
import { useStore } from "@/stores";
import clsx from "clsx";
import Component404 from "@/components/404";
import DefaultLayout from "@/components/Layout";
import Link from "next/link";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";

export default function Page({
    seo_title,
    seo_description,
    error,
    id,
    slug,
    title,
    content,
    name,
}) {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);

    const router = useRouter();
    const { formfieldsLoading, site_name } = useStore();

    useEffect(() => {
        const fetchPostbyCategory = async () => {
            const curr_page = router.query?.page ? +router.query.page : 1;
            setPage(curr_page);

            const _posts = id
                ? await fetcher(
                      `/posts?categories=${id}&per_page=${limit}&offset=${
                          limit * (curr_page - 1)
                      }`
                  ).catch(() => {})
                : {};

            setTotal(_posts?.total || 0);
            setPosts(_posts?.data);
            setLoading(false);
        };
        if (!formfieldsLoading) {
            fetchPostbyCategory();
        }
    }, [formfieldsLoading, router.query, id, limit]);

    const paginationParam = usePagination({
        total: Math.ceil(total / limit),
        initialPage: 1,
        page,
        siblings: 1,
        boundaries: 1,
    });

    return (
        <>
            <NextSeo
                title={`${title || name || seo_title || ""} - ${site_name}`}
                description={seo_description || ""}
            />
            {!error ? (
                <section key={slug + page} className="min-h-[80vh] py-10">
                    <div className="container max-w-7xl mx-auto">
                        <h1 className="border-b-2 border-primary uppercase mb-8 text-center text-2xl leading-9">
                            {title || name || ""}
                        </h1>
                        <ReadOnlyEditor
                            content={content || ""}
                            className={"mb-10"}
                        />

                        <div className="-m-4 flex flex-wrap px-4 md:px-0">
                            {loading
                                ? range(1, limit).map((key) => (
                                      <div
                                          key={key}
                                          className="w-full p-4 md:w-1/2 lg:w-1/3"
                                      >
                                          <div className="relative pt-[100%]">
                                              <div className="absolute inset-0 animate-pulse flex flex-col space-y-5">
                                                  <div className="rounded-lg bg-black/10 h-72"></div>
                                                  <div className="space-y-2">
                                                      <div className="rounded-lg bg-black/10 h-5"></div>
                                                      <div className="rounded-lg bg-black/10 h-5 w-1/2"></div>
                                                  </div>
                                                  <div className="rounded-lg bg-black/10 h-14"></div>
                                              </div>
                                          </div>
                                      </div>
                                  ))
                                : Array.isArray(posts)
                                ? posts.map((itm) => (
                                      <Card
                                          key={itm.id}
                                          {...itm}
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
                                            href={{
                                                pathname: `/danh-muc/${slug}`,
                                                query: { page: item },
                                            }}
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

export const getStaticPaths = async () => {
    const categories = await fetcher(`/categories`);

    const paths = Array.isArray(categories?.data)
        ? categories.data.flatMap((item) =>
              [`${item?.id}`, item?.slug].map((itm) => ({
                  params: { category: itm },
              }))
          )
        : [];

    return {
        paths,
        fallback: "blocking",
    };
};

export async function getStaticProps(context) {
    const category = context.params?.category || "";

    const categoriesPage = await fetcher(
        isNaN(+category)
            ? `/categories?slug=${category}`
            : `/categories/${category}`
    ).catch(() => undefined);

    const categoriesData = Array.isArray(categoriesPage?.data)
        ? categoriesPage?.data?.[0]
        : categoriesPage?.data || {};

    const meta_box = {
        slug: categoriesData?.slug || "",
        id: categoriesData?.id || "",
        name: categoriesData?.name || "",
        title: categoriesData?.meta_box?.title || "",
        content: categoriesData?.meta_box?.content || "",
        seo_title: categoriesData?.meta_box?.seo_title || "",
        seo_description: categoriesData?.meta_box?.seo_description || "",
    };

    return {
        props: meta_box,
        revalidate: REVALIDATE, // In seconds 1h
        notFound:
            categoriesPage === undefined || categoriesPage?.data?.length === 0,
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
