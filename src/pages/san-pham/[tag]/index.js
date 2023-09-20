import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategorySection, CategoryTitle } from "@/components/CategoryProduct";
import { Quote } from "@/components/Home";
import { CardProductItem } from "@/components/CardProduct";
import { styled } from "styled-components";
import { Container } from "@/components/Styled";
import unfetch from "isomorphic-unfetch";
import { getArrayStrapi, getMenu } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";

const Card = styled.div`
    padding: 10px 0;
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

export default function Page({ seo_body, title, site_name, products_list }) {
    return (
        <>
            <NextSeo
                title={(seo_body?.meta_title || title) + " - " + site_name}
                description={seo_body?.meta_description || ""}
            />
            <Breadcrumb value1={title || ""} />
            <Card>
                <div className="container mx-auto max-w-7xl">
                    <CategoryTitle>
                        <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                            Sản phẩm
                        </h2>
                    </CategoryTitle>
                    <div className="-mx-4 flex flex-wrap">
                        {Array.isArray(products_list) &&
                        products_list.length ? (
                            products_list.map((item, index) => (
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
                </div>
            </Card>
        </>
    );
}

export const getStaticPaths = async (context) => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export async function getStaticProps(context) {
    const {
        NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_USER_NAME,
        NEXT_PUBLIC_PASSWORD,
        NEXT_PUBLIC_GRAVITY_FORMS_URL,
    } = process.env;
    const tag = context.params?.tag;

    try {
        const [menuData, defaulPageData, productTagData] = await Promise.all(
            [
                "/menu-items",
                "/pages?slug=mac-dinh",
                `/product-tag?slug=${tag}`,
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

        const productsRes = await unfetch(
            NEXT_PUBLIC_API_URL +
                `/product?product-tag=${productTagData[0]?.id}&per_page=30`,
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

        const productsData = await productsRes.json();

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
                menu,
                default_page: default_meta_box,
                form_data,
                products_list: productsData || [],
                product_tag: productTagData[0],
                title: productTagData[0]?.name,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                form_url: NEXT_PUBLIC_GRAVITY_FORMS_URL || "",
                revalidate: 3600, // In seconds 1h
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                message: error.message,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                form_url: NEXT_PUBLIC_GRAVITY_FORMS_URL || "",
            },
        };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
