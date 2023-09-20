import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbDetail } from "@/components/BreadcrumbDetail";
import { CategoryTitle } from "@/components/CategoryProduct";
import DefaultLayout from "@/components/Layout";
import ProductOther from "@/components/ProductOther";
import { SpecificationTab } from "@/components/SpecificationsTab";
import { Container } from "@/components/Styled";
import { ThumbDetail } from "@/components/ThumbDetail";
import { Img } from "@/components/UI";
import { useStore } from "@/stores";
import { formatCurrency, getArrayStrapi, getMenu } from "@/utils";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import { styled } from "styled-components";

export default function Page({
    title,
    seo_title,
    seo_description,
    site_name,
    product,
    products_list,
}) {
    const { setOpenContactForm } = useStore();

    return (
        <>
            <NextSeo
                title={(seo_title || title || "") + " - " + site_name}
                description={seo_description || ""}
            />
            <ProductDetail key={product?.slug}>
                <div className="container mx-auto max-w-7xl my-10">
                    <Breadcrumb value1={product?.title?.rendered || ""} />
                    <div className="detail">
                        <ThumbDetail images={product?.meta_box?.images} />
                        <ProductDescription>
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <div className="price__group">
                                <p className="price">
                                    {formatCurrency(
                                        product?.meta_box?.new_price
                                    )}
                                </p>
                                {product?.meta_box?.old_price ? (
                                    <p className="old__price">
                                        {formatCurrency(
                                            product?.meta_box?.old_price
                                        )}
                                    </p>
                                ) : null}
                            </div>
                            <div className="materials">
                                <span>Vật liệu</span>

                                <div className="option__name">
                                    <p>{product?.meta_box?.material || ""}</p>
                                </div>
                            </div>
                            <div className="size">
                                <span>Kích thước</span>

                                <div className="option__name">
                                    <p>{product?.meta_box?.size || ""}</p>
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
                        {...product?.meta_box}
                        content={product?.content.rendered || ""}
                    />
                    <CategoryTitle>
                        <h3>Sản phẩm khác</h3>
                    </CategoryTitle>
                    <ProductOther products_list={products_list} />
                </div>
            </ProductDetail>
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
    const slug = context.params?.slug;

    try {
        const [menuData, defaulPageData, productData] = await Promise.all(
            [
                "/menu-items",
                "/pages?slug=mac-dinh",
                `/product?slug=${slug}`,
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
                `/product?product-tag=${productData[0]?.["product-tag"]?.[0]}&per_page=10`,
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
                products_list: productsData,
                product: productData?.[0] || {},
                title: productData?.[0]?.title?.rendered || "",
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
    & h3 {
        &:after {
            content: "";
            position: absolute;
            bottom: -25%;
            left: 0;
            width: 100px;
            height: 2px;
            background-color: #d0b247;
        }
    }
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
