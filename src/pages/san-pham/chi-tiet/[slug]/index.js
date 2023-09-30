import { Breadcrumb } from "@/components/Breadcrumb";
import { fetcher, formatCurrency, range } from "@/utils";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { SpecificationTab } from "@/components/SpecificationsTab";
import { styled } from "styled-components";
import { ThumbDetail } from "@/components/ThumbDetail";
import { useEffect, useState } from "react";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";
import ProductOther from "@/components/ProductOther";

export default function Page({
    seo_title,
    seo_description,
    title,
    slug,
    images,
    new_price,
    old_price,
    maintain,
    policy,
    size,
    content,
    material,
    productTag,
    id,
}) {
    const [productsLoading, setProductsLoading] = useState(true);
    const [products, setProducts] = useState();
    const { formfieldsLoading, site_name, setOpenContactForm } = useStore();

    useEffect(() => {
        const fetchProducts = async () => {
            const _products = productTag?.length
                ? await fetcher(`/product?product-tag=${productTag[0]}`).catch(
                      () => {}
                  )
                : {};

            setProductsLoading(false);

            if (_products?.data?.length) {
                setProducts(_products?.data?.filter((item) => item?.id !== id));
            }
        };
        if (!formfieldsLoading) {
            fetchProducts();
        }
    }, [formfieldsLoading, productTag, id]);

    return (
        <>
            <NextSeo
                title={`${title || seo_title || ""} - ${site_name}`}
                description={seo_description || ""}
            />
            <ProductDetail key={id + slug}>
                <div className="container mx-auto max-w-7xl my-10 px-3">
                    <Breadcrumb
                        value1={{
                            label: title || "",
                            url: `/chi-tiet/${slug}`,
                        }}
                    />
                    <div className="detail px-4 md:px-0">
                        <ThumbDetail images={images} />
                        <ProductDescription>
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <div className="price__group">
                                <p className="price">
                                    {formatCurrency(new_price)}
                                </p>
                                {old_price ? (
                                    <p className="old__price">
                                        {formatCurrency(old_price)}
                                    </p>
                                ) : null}
                            </div>
                            <div className="materials">
                                <span>Vật liệu</span>

                                <div className="option__name">
                                    <p>{material || ""}</p>
                                </div>
                            </div>
                            <div className="size">
                                <span>Kích thước</span>

                                <div className="option__name">
                                    <p>{size || ""}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setOpenContactForm(true)}
                                className="contact-btn more-btn"
                            >
                                Liên hệ
                            </button>
                        </ProductDescription>
                    </div>
                    <SpecificationTab
                        maintain={maintain}
                        policy={policy}
                        content={content || ""}
                    />
                    {productsLoading ? (
                        <>
                            <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                                Sản phẩm khác
                            </h2>
                            <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                                {range(1, 4).map((key) => (
                                    <div
                                        key={key}
                                        className="p-4 w-full md:w-1/2 lg:w-1/4"
                                    >
                                        <div className="relative pt-[100%]">
                                            <div class="absolute inset-0 animate-pulse flex flex-col space-y-5">
                                                <div class="rounded-lg bg-black/10 h-72"></div>
                                                <div className="space-y-2">
                                                    <div class="rounded-lg bg-black/10 h-5"></div>
                                                    <div class="rounded-lg bg-black/10 h-5 w-1/2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : Array.isArray(products) && products?.length > 0 ? (
                        <>
                            <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                                Sản phẩm khác
                            </h2>
                            <ProductOther products_list={products} />
                        </>
                    ) : null}
                </div>
            </ProductDetail>
        </>
    );
}

export const getStaticPaths = async () => {
    const propduct = await fetcher(`/product`).catch(() => undefined);

    const paths = Array.isArray(propduct?.data)
        ? propduct.data.map((item) => ({
              params: { slug: item?.slug },
          }))
        : [];

    return {
        paths,
        fallback: "blocking",
    };
};

export async function getStaticProps(context) {
    const slug = context.params?.slug;

    const propductPage = await fetcher(`/product?slug=${slug}`).catch(
        () => undefined
    );

    const productPageData = propductPage ? propductPage?.data?.[0] : {};

    const images = productPageData?.meta_box?.images?.length
        ? productPageData?.meta_box?.images.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.full_url || "",
          }))
        : [];

    const meta_box = {
        seo_title: productPageData?.meta_box?.seo_title || "",
        seo_description: productPageData?.meta_box?.seo_description || "",
        size: productPageData?.meta_box?.size || "",
        new_price: productPageData?.meta_box?.new_price || "",
        old_price: productPageData?.meta_box?.old_price || "",
        content: productPageData?.content?.rendered || "",
        policy: productPageData?.meta_box?.policy || "",
        maintain: productPageData?.meta_box?.maintain || "",
        material: productPageData?.meta_box?.material || "",
        images,
        slug: productPageData?.slug || "",
        id: productPageData?.id || "",
        title: productPageData?.title?.rendered || "",
        productTag: productPageData?.["product-tag"],
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

const ProductDetail = styled.div`
    & .detail {
        display: grid;
        grid-template-columns: repeat(2, 49%);
        gap: 20px;
        @media (max-width: 992px) {
            grid-template-columns: repeat(1, 100%);
        }
    }
`;
const ProductDescription = styled.div`
    padding: 0 20px;
    line-height: 0.8;
    & .price__group {
        margin: 40px 0 20px;
        display: flex;
        gap: 40px;
        align-items: center;
        & .price {
            font-size: 24px;
            font-weight: 700;
        }
        & .old__price {
            text-decoration-line: line-through;
            color: #a9a9b2;
            font-size: 16px;
        }
    }
    & .materials,
    & .size,
    & .tag__category {
        display: flex;
        gap: 30px;
        align-items: center;
        margin-top: 20px;
        letter-spacing: 0.8;
        & span {
            font-size: 18px;
            font-weight: 600;
        }
        & .option__name {
            & p {
                border: 1px solid #dfdfe2;
                padding: 10px;
                font-size: 12px;
                font-style: normal;
                font-weight: 300;
                line-height: 100%;
                letter-spacing: 0.5px;
            }
        }
    }
    & .contact-btn {
        margin-top: 30px;
        color: white;
        background-color: black;
        font-weight: 700;
        width: 120px;
        line-height: 45px;
        margin-bottom: 40px;
        text-transform: uppercase;
        text-align: center;
        position: relative;
        z-index: 1;
        transition: 0.5s;
        font-size: 12px;
        &:before {
            content: "";
            position: absolute;
            z-index: -1;
            background-color: #bd8b1b;
        }
    }
    & .more-btn {
        &:before {
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            transition: width 0.25s linear;
        }
        &:hover:before {
            width: 100%;
        }
    }
`;
