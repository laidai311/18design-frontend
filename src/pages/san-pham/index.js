import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategorySection, CategoryTitle } from "@/components/CategoryProduct";
import { Quote } from "@/components/Home";
import { CardProductItem } from "@/components/CardProduct";
import { styled } from "styled-components";
import { Container } from "@/components/Styled";
import unfetch from "isomorphic-unfetch";
import { get, getArrayStrapi, getMenu } from "@/utils";
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
    title,
    site_name,
    banner_background,
    product_list,
    default_image,
    seo_title,
    seo_description,
    product_tag_list,
}) {
    const image_link = banner_background?.full_url || default_image?.full_url;

    const image_name = banner_background?.name || site_name;

    return (
        <>
            <NextSeo
                title={(seo_title || title) + " - " + site_name}
                description={seo_description || ""}
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
            <CategorySection product_tag_list={product_tag_list} />
            <Quote />
            <Card>
                <Container>
                    <CategoryTitle>
                        <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                            Sản phẩm nổi bật
                        </h2>
                    </CategoryTitle>
                    <div className="-mx-4 flex flex-wrap">
                        {Array.isArray(product_list)
                            ? product_list.map((item, index) => (
                                  <div
                                      key={item?.id || index}
                                      className="p-4 w-full md:w-1/2 lg:w-1/4"
                                  >
                                      <CardProductItem {...item} />
                                  </div>
                              ))
                            : null}
                    </div>
                </Container>
            </Card>
        </>
    );
}

export async function getServerSideProps() {
    const {
        NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_USER_NAME,
        NEXT_PUBLIC_PASSWORD,
    } = process.env;

    try {
        const [menuData, productPageData, productTagData, productData] =
            await Promise.all(
                [
                    "/menu-items",
                    "/pages?slug=san-pham",
                    "/product-tag?per_page=8",
                    "/product?per_page=8",
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

        const meta_box = productPageData[0]?.meta_box
            ? productPageData[0]?.meta_box
            : {};

        return {
            props: {
                ...meta_box,
                product_tag_list: productTagData || [],
                product_list: productData || [],
                menu,
                title: productPageData[0]?.title?.rendered || "",
                content: productPageData[0]?.content?.rendered || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
            },
        };
    } catch (error) {
        console.error(error);
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
