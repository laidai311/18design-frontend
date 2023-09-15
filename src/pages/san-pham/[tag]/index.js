import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategorySection, CategoryTitle } from "@/components/CategoryProduct";
import { Quote } from "@/components/Home";
import { CardProductItem } from "@/components/CardProduct";
import { styled } from "styled-components";
import { Container } from "@/components/Styled";
import unfetch from "isomorphic-unfetch";
import { getArrayStrapi } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";

const Card = styled.div`
    padding: 80px 0;
`;
const CardList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 30px;
    @media (max-width: 992px) {
        grid-template-columns: repeat(2, auto);
    }
    @media (max-width: 456px) {
        grid-template-columns: repeat(1, auto);
    }
`;

export default function Page({
    seo_body,
    title,
    site_name,
    cover_image,
    api_url,
    propducts,
    category_images,
    category_list,
}) {
    const image_link = cover_image?.data
        ? api_url + cover_image?.data?.attributes?.url || ""
        : null;

    const image_name = cover_image?.data
        ? cover_image?.data?.attributes?.name || ""
        : "18 design";

    return (
        <>
            <NextSeo
                title={(seo_body?.meta_title || title) + " - " + site_name}
                description={seo_body?.meta_description || ""}
            />
            <div className="w-full relative pt-[52%] h-auto lg:pt-0 lg:h-[80vh]">
                <div className="absolute inset-0">
                    <Img
                        alt={image_name || ""}
                        src={image_link || ""}
                        className={"w-full h-full object-cover"}
                    />
                </div>
            </div>
            <Breadcrumb />
            <Card>
                <div className="container mx-auto max-w-7xl">
                    <CategoryTitle>
                        <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                            Sản phẩm
                        </h2>
                    </CategoryTitle>
                    <div className="-mx-4 flex flex-wrap">
                        {Array.isArray(propducts)
                            ? propducts.map((item, index) => (
                                  <div
                                      key={item?.id || index}
                                      className="p-4 w-full md:w-1/2 lg:w-1/4"
                                  >
                                      <CardProductItem {...item} />
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </Card>
        </>
    );
}

export async function getServerSideProps(context) {
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;
    // const { tag, page: currentPage = 1 } = context.query;

    try {
        const [property, productPage, products] = await Promise.all(
            [
                "/api/property?populate=*",
                "/api/product-page?populate=*",
                "/api/products?populate=*",
            ].map(async (url) => {
                const res = await unfetch(NEXT_PUBLIC_API_URL + url);
                return res.json();
            })
        );

        const propertyAttr = property?.data?.attributes || {};
        const productPageAttr = productPage?.data?.attributes || {};
        const productsArr = getArrayStrapi(products?.data, []);

        return {
            props: {
                ...productPageAttr,
                property: propertyAttr,
                propducts: productsArr,
                // currentPage: currentPage - 1,
                // tag: tag,
                // pagination: posts.meta?.pagination || {},
                meta: productPageAttr?.meta || {},
                message: productPageAttr?.error?.message || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
            },
        };
    } catch (error) {
        return {
            props: {
                message: error.message,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
            },
        };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
