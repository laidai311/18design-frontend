import { Breadcrumb } from "@/components/Breadcrumb";
import { CardProductItem } from "@/components/CardProduct";
import { fetcher } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { ProductTagsList } from "@/components/ProductTagsList";
import { Quote } from "@/components/Home";
import { REVALIDATE } from "@/constant/setting";
import { useEffect, useState } from "react";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";
import Loader from "@/components/Loader";

export default function Page({
    title,
    banner_background,
    seo_title,
    seo_description,
}) {
    const { formfieldsLoading, defaultPage, site_name } = useStore();
    const [productTagLoading, setProductTagLoading] = useState(true);
    const [productTag, setProductTag] = useState();

    useEffect(() => {
        const fetchProductTag = async () => {
            const _productTag = await fetcher(`/product-tag?per_page=7`).catch(
                () => {}
            );
            setProductTag(_productTag?.data);
            setProductTagLoading(false);
        };
        if (!formfieldsLoading) {
            fetchProductTag();
        }
    }, [formfieldsLoading]);

    const [productLoading, setProductLoading] = useState(true);
    const [product, setProduct] = useState();

    useEffect(() => {
        const fetchProduct = async () => {
            const _product = await fetcher(`/product?per_page=8`).catch(
                () => {}
            );
            setProduct(_product?.data);
            setProductLoading(false);
        };
        if (!productTagLoading) {
            fetchProduct();
        }
    }, [productTagLoading]);

    const image_link =
        banner_background?.url || defaultPage?.default_image?.full_url;
    const image_name = banner_background?.name || site_name;

    return (
        <>
            <NextSeo
                title={`${seo_title || title} - ${site_name}`}
                description={seo_description || ""}
            />
            <div className="w-full relative pt-[52%] h-auto lg:pt-[40%]">
                <div className="absolute inset-0">
                    <Img
                        alt={image_name || ""}
                        src={image_link || ""}
                        className={"w-full h-full object-cover"}
                    />
                </div>
            </div>
            <Breadcrumb />
            <ProductTagsList
                loading={productTagLoading}
                product_tag_list={productTag}
            />
            <Quote />
            <div className="py-12">
                <div className="container mx-auto max-w-7xl px-3">
                    <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                        Sản phẩm nổi bật
                    </h2>
                    <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                        {productLoading ? (
                            <Loader />
                        ) : Array.isArray(product) ? (
                            product.map((item, index) => (
                                <div
                                    key={item?.id || index}
                                    className="p-4 w-full md:w-1/2 lg:w-1/4"
                                >
                                    <CardProductItem {...item} />
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const propductPage = await fetcher("/pages?slug=san-pham").catch(
        () => undefined
    );
    const productPageData = propductPage ? propductPage?.data?.[0] : {};

    const meta_box = {
        banner_background: {
            url: productPageData?.meta_box?.banner_background?.full_url || "",
            alt:
                productPageData?.meta_box?.banner_background?.alt ||
                productPageData?.meta_box?.banner_background?.title,
        },
        title: productPageData?.title?.rendered || "",
        content: productPageData?.content?.rendered || "",
    };

    return {
        props: meta_box,
        revalidate: REVALIDATE, // In seconds 1h
        notFound:
            propductPage === undefined || propductPage?.data?.length === 0,
    };
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
