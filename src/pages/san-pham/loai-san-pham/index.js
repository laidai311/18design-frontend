import { fetcher } from "@/utils";
import { NextSeo } from "next-seo";
import { ProductTagCard } from "@/components/ProductTagsList";
import { useEffect, useState } from "react";
import { usePagination } from "@/hooks";
import { useRouter } from "next/router";
import { useStore } from "@/stores";
import clsx from "clsx";
import DefaultLayout from "@/components/Layout";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function Page({ title, seo_title, seo_description }) {
    const [loading, setLoading] = useState(true);
    const [productTag, setProductTag] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);

    const router = useRouter();
    const { formfieldsLoading, site_name } = useStore();

    useEffect(() => {
        const fetchProductTag = async () => {
            const curr_page = router.query?.page ? +router.query.page : 1;
            setPage(curr_page);

            const _productTag = await fetcher(
                `/product-tag?per_page=${limit}&offset=${
                    limit * (curr_page - 1)
                }`
            ).catch(() => {});

            setTotal(_productTag?.total || 0);
            setProductTag(_productTag?.data);
            setLoading(false);
        };
        if (!formfieldsLoading) {
            fetchProductTag();
        }
    }, [formfieldsLoading, router.query, limit]);

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
                title={`${title || seo_title || ""} - ${site_name}`}
                description={seo_description || ""}
            />
            <div className="container mx-auto max-w-7xl my-10">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    {title || ""}
                </h2>

                <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                    {loading ? (
                        <Loader />
                    ) : Array.isArray(productTag) ? (
                        productTag.map((item, index) => (
                            <ProductTagCard
                                key={item?.id + index}
                                {...item}
                                className="p-4 w-full md:w-1/2 lg:w-1/4"
                            />
                        ))
                    ) : (
                        <div className="w-full my-10 text-center">
                            Không có loại sản phẩm nào trên hệ thống
                        </div>
                    )}
                </div>
                {productTag?.length ? (
                    <div className="flex items-center justify-center space-x-2 mt-10">
                        {paginationParam?.range?.map((item, index) => {
                            if (item === "dots") {
                                return <div key={item + index}>...</div>;
                            }
                            return (
                                <Link
                                    key={item}
                                    href={{
                                        pathname: `/san-pham/loai-san-pham`,
                                        query: { page: item },
                                    }}
                                    onClick={() => {
                                        paginationParam.setPage(item);
                                    }}
                                    className={clsx(
                                        "border h-8 w-8 flex items-center justify-center rounded-full transition-all hover:bg-primary/70 hover:text-white",
                                        {
                                            "bg-primary/70 text-white":
                                                paginationParam?.active == item,
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
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            title: "Các loại sản phẩm",
        },
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
