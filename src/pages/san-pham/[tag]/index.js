import { Breadcrumb } from "@/components/Breadcrumb";
import { CardProductItem } from "@/components/CardProduct";
import { fetcher } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { useEffect, useState } from "react";
import { usePagination } from "@/hooks";
import { useRouter } from "next/router";
import { useStore } from "@/stores";
import clsx from "clsx";
import DefaultLayout from "@/components/Layout";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function Page({
    seo_title,
    seo_description,
    title,
    id,
    slug,
    image,
}) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);

    const router = useRouter();
    const { formfieldsLoading, site_name } = useStore();

    useEffect(() => {
        const fetchProducts = async () => {
            const curr_page = router.query?.page ? +router.query.page : 1;
            setPage(curr_page);

            const _products = await fetcher(
                `/product?product-tag=${id}&per_page=${limit}&offset=${
                    limit * (curr_page - 1)
                }`
            ).catch(() => {});

            setTotal(_products?.total || 0);
            setProducts(_products?.data);
            setLoading(false);
        };
        if (!formfieldsLoading) {
            fetchProducts();
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
                title={`${title || seo_title} - ${site_name}`}
                description={seo_description || ""}
            />
            <div className="w-full relative pt-[52%] h-auto lg:pt-[40%]">
                <div className="absolute inset-0">
                    <Img
                        alt={image?.alt || ""}
                        src={image?.url || ""}
                        className={"w-full h-full object-cover"}
                    />
                </div>
            </div>
            <Breadcrumb value1={title || ""} />
            <section className="my-10">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                        {title || ""}
                    </h2>
                    <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                        {loading ? (
                            <Loader />
                        ) : Array.isArray(products) && products.length ? (
                            products.map((item, index) => (
                                <div
                                    key={item?.id || index}
                                    className="p-4 w-full md:w-1/2 lg:w-1/4"
                                >
                                    <CardProductItem {...item} />
                                </div>
                            ))
                        ) : (
                            <div className="w-full my-10 text-center">
                                Không có sản phẩm nào trên hệ thống
                            </div>
                        )}
                    </div>
                    {products?.length ? (
                        <div className="flex items-center justify-center space-x-2 mt-10">
                            {paginationParam?.range?.map((item, index) => {
                                if (item === "dots") {
                                    return <div key={item + index}>...</div>;
                                }
                                return (
                                    <Link
                                        key={item}
                                        href={{
                                            pathname: `/san-pham/${slug}`,
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
        </>
    );
}

export const getStaticPaths = async () => {
    const productTag = await fetcher(`/product-tag`);

    const paths = Array.isArray(productTag?.data)
        ? productTag.data.flatMap((item) => ({
              params: { tag: item?.slug },
          }))
        : [];

    return {
        paths,
        fallback: "blocking",
    };
};

export async function getStaticProps(context) {
    const tag = context.params?.tag;

    const propductTagPage = await fetcher(`/product-tag?slug=${tag}`).catch(
        () => undefined
    );

    const productTagPageData = propductTagPage
        ? propductTagPage?.data?.[0]
        : {};

    const meta_box = {
        image: {
            url: productTagPageData?.meta_box?.image?.full_url || "",
            alt:
                productTagPageData?.meta_box?.image?.alt ||
                productTagPageData?.meta_box?.image?.title,
        },
        title: productTagPageData?.name || "",
        slug: productTagPageData?.slug || "",
        id: productTagPageData?.id || "",
    };

    return {
        props: meta_box,
        revalidate: REVALIDATE, // In seconds 1h
        notFound:
            propductTagPage === undefined ||
            propductTagPage?.data?.length === 0,
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
