import { Breadcrumb } from "@/components/Breadcrumb";
import { CardProductItem } from "@/components/CardProduct";
import { fetcher, range } from "@/utils";
import { Img } from "@/components/UI";
import { NextSeo } from "next-seo";
import { ProductTagsList } from "@/components/ProductTagsList";
import { Quote } from "@/components/Home";
import { REVALIDATE } from "@/constant/setting";
import { useEffect, useState } from "react";
import { useStore } from "@/stores";
import DefaultLayout from "@/components/Layout";

export default function Page({ title, banner_background, seo }) {
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
                title={`${seo?.seo_title || title || ""} - ${site_name}`}
                description={seo?.seo_description || ""}
                noindex={seo?.seo_noindex || ""}
                titleTemplate={seo?.seo_title_template || ""}
                defaultTitle={seo?.seo_default_title || ""}
                canonical={seo?.seo_canonical || ""}
                openGraph={{
                    url: seo?.seo_openGraph_url || "",
                    title: seo?.seo_openGraph_title || "",
                    description: seo?.seo_openGraph_description || "",
                    images: seo?.seo_openGraph_images || [],
                    siteName: seo?.seo_openGraph_siteName || "",
                }}
                twitter={{
                    handle: seo?.seo_twitter_handle || "",
                    site: seo?.seo_twitter_site || "",
                    cardType: seo?.seo_twitter_cardType || "",
                }}
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
                        {productLoading
                            ? range(1, 8).map((key) => (
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
                              ))
                            : Array.isArray(product)
                            ? product.map((item, index) => (
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
    const propductPage = await fetcher("/pages?slug=san-pham").catch(
        () => undefined
    );
    const productPageData = propductPage ? propductPage?.data?.[0] : {};

    const seo_opengraph_images = productPageData?.meta_box?.seo_opengraph_images
        ?.length
        ? productPageData?.meta_box?.seo_opengraph_images?.map((item) => ({
              alt: item?.alt || item?.title || "",
              url: item?.sizes?.medium_large?.url || item?.full_url || "#",
              width: item?.sizes?.medium_large?.width || "",
              height: item?.sizes?.medium_large?.height || "",
          }))
        : [];

    const meta_box = {
        banner_background: {
            url: productPageData?.meta_box?.banner_background?.full_url || "",
            alt:
                productPageData?.meta_box?.banner_background?.alt ||
                productPageData?.meta_box?.banner_background?.title,
        },
        title: productPageData?.title?.rendered || "",
        content: productPageData?.content?.rendered || "",
        seo: {
            seo_title: productPageData?.meta_box?.seo_title || "",
            seo_description: productPageData?.meta_box?.seo_description || "",
            seo_noindex: productPageData?.meta_box?.seo_noindex || "",
            seo_title_template:
                productPageData?.meta_box?.seo_title_template || "",
            seo_default_title:
                productPageData?.meta_box?.seo_default_title || "",
            seo_canonical: productPageData?.meta_box?.seo_canonical || "",
            seo_openGraph_url:
                productPageData?.meta_box?.seo_openGraph_url || "",
            seo_openGraph_title:
                productPageData?.meta_box?.seo_openGraph_title || "",
            seo_openGraph_description:
                productPageData?.meta_box?.seo_openGraph_description || "",
            seo_openGraph_images: seo_opengraph_images,
            seo_openGraph_siteName:
                productPageData?.meta_box?.seo_openGraph_siteName || "",
            seo_twitter_handle:
                productPageData?.meta_box?.seo_twitter_handle || "",
            seo_twitter_site: productPageData?.meta_box?.seo_twitter_site || "",
            seo_twitter_cardType:
                productPageData?.meta_box?.seo_twitter_cardType || "",
        },
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
