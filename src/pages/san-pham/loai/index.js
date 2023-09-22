import { getMenu } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { REVALIDATE } from "@/constant/setting";
import { styled } from "styled-components";
import DefaultLayout from "@/components/Layout";
import Link from "next/link";
import unfetch from "isomorphic-unfetch";

export default function Page({
    title,
    site_name,
    seo_title,
    seo_description,
    product_tag_list,
}) {
    return (
        <>
            <NextSeo
                title={(seo_title || title) + " - " + site_name}
                description={seo_description || ""}
            />
            <div className="container mx-auto max-w-7xl my-10">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    Các loại sản phẩm
                </h2>

                <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                    {Array.isArray(product_tag_list)
                        ? product_tag_list.map((item, index) => (
                              <div
                                  key={index}
                                  className="w-full p-4 md:w-1/2 lg:w-1/4"
                              >
                                  <CategoryItem>
                                      <div className="category__card">
                                          <Link
                                              href={`/san-pham/${
                                                  item?.slug || ""
                                              }`}
                                          >
                                              <Img
                                                  alt={
                                                      item?.meta_box?.image
                                                          ?.name || ""
                                                  }
                                                  src={
                                                      item?.meta_box?.image
                                                          ?.full_url || ""
                                                  }
                                              />
                                              <span>{item?.name || ""}</span>
                                          </Link>
                                      </div>
                                  </CategoryItem>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const {
            NEXT_PUBLIC_SITE_NAME,
            NEXT_PUBLIC_API_URL,
            NEXT_PUBLIC_USER_NAME,
            NEXT_PUBLIC_PASSWORD,
            NEXT_PUBLIC_GRAVITY_FORMS_URL,
        } = process.env;

        const [menuData, defaulPageData, productTagData] = await Promise.all(
            [
                "/menu-items",
                "/pages?slug=mac-dinh",
                "/product-tag?per_page=30",
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
                product_tag_list: productTagData || [],
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                form_url: NEXT_PUBLIC_GRAVITY_FORMS_URL || "",
            },
            // revalidate: REVALIDATE, // In seconds 1h
        };
    } catch (error) {
        return { props: { error: error?.message }, notFound: true };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);

const CategoryItem = styled.div`
    & .category__card {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
    }
    & a {
        position: relative;
        display: block;
        &:before {
            content: "";
            position: absolute;
            top: 0;
            border-radius: 8px;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            opacity: 0.7;
            z-index: 1;
            transition: opacity 0.3s ease;
        }
    }
    & img {
        border-radius: 8px;
        transition: transform 0.3s ease;
    }
    & :hover img {
        transform: scale(1.1);
    }

    & span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        color: white;
        font-size: 18px;
        letter-spacing: 2.4px;
        font-weight: 700;
        white-space: nowrap;
        text-transform: capitalize;
    }
`;
