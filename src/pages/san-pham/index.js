import { Breadcrumb } from "@/components/Breadcrumb";
import { CardProductItem } from "@/components/CardProduct";
import { ProductTagsList } from "@/components/ProductTagsList";
import { getMenu } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { Quote } from "@/components/Home";
import { REVALIDATE } from "@/constant/setting";
import DefaultLayout from "@/components/Layout";
import unfetch from "isomorphic-unfetch";

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
            <ProductTagsList product_tag_list={product_tag_list} />
            <Quote />
            <div className="py-12">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                        Sản phẩm nổi bật
                    </h2>
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
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const {
        NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_USER_NAME,
        NEXT_PUBLIC_PASSWORD,
        NEXT_PUBLIC_GRAVITY_FORMS_URL,
    } = process.env;

    try {
        const [
            menuData,
            defaulPageData,
            productPageData,
            productTagData,
            productData,
        ] = await Promise.all(
            [
                "/menu-items",
                "/pages?slug=mac-dinh",
                "/pages?slug=san-pham",
                "/product-tag?per_page=7",
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

        const default_meta_box = defaulPageData[0]?.meta_box || {};

        const meta_box = productPageData[0]?.meta_box
            ? productPageData[0]?.meta_box
            : {};

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
                ...meta_box,
                menu,
                default_page: default_meta_box,
                form_data,
                product_tag_list: productTagData || [],
                product_list: productData || [],
                title: productPageData[0]?.title?.rendered || "",
                content: productPageData[0]?.content?.rendered || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                form_url: NEXT_PUBLIC_GRAVITY_FORMS_URL || "",
            },
            revalidate: REVALIDATE, // In seconds 1h
        };
    } catch (error) {
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
