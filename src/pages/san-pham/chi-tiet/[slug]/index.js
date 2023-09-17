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
    product_list,
    content,
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
                    <BreadcrumbDetail />
                    <div className="detail">
                        <ThumbDetail images={product?.images} />
                        <ProductDescription>
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <div className="price__group">
                                <p className="price">
                                    {formatCurrency(product?.new_price)}
                                </p>
                                {product?.old_price ? (
                                    <p className="old__price">
                                        {formatCurrency(product?.old_price)}
                                    </p>
                                ) : null}
                            </div>
                            <div className="materials">
                                <span>Vật liệu</span>

                                <div className="option__name">
                                    <p>{product?.material || ""}</p>
                                </div>
                            </div>
                            <div className="size">
                                <span>Kích thước</span>

                                <div className="option__name">
                                    <p>{product?.size || ""}</p>
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
                    <SpecificationTab {...product} content={content} />
                    <CategoryTitle>
                        <h3>Sản phẩm khác</h3>
                    </CategoryTitle>
                    <ProductOther product_list={product_list} />
                </div>
            </ProductDetail>
        </>
    );
}

export async function getServerSideProps(context) {
    const {
        NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_USER_NAME,
        NEXT_PUBLIC_PASSWORD,
    } = process.env;
    const { slug } = context.params;

    try {
        const [menuData, pageData, productData, productsData] =
            await Promise.all(
                [
                    "/menu-items",
                    "/pages?slug=mac-dinh",
                    `/product?slug=${slug}`,
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

        const page_meta_box = pageData[0]?.meta_box || {};
        const meta_box = productData[0]?.meta_box || {};

        return {
            props: {
                ...page_meta_box,
                product: meta_box,
                product_list: productsData || [],
                menu,
                title: productData[0]?.title?.rendered || "",
                content: productData[0]?.content?.rendered || "",
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
