import DefaultLayout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";
import { IconEye } from "@/components/Icons";
import { useEffect } from "react";
import { getArrayStrapi, updateImgSrc } from "@/utils";
import { useStore } from "@/stores";
import { Img } from "@/components/UI";
import Link from "next/link";

export default function Page({
    seo_body,
    site_name,
    error,
    title,
    content,
    total_view,
    id,
    api_url,
    posts,
    slug,
    property,
    tag_name,
    tag,
}) {
    useEffect(() => {
        const fn = async () => {
            try {
                // Default options are marked with *
                await fetch(api_url + `/api/posts/${id || ""}`, {
                    method: "PUT", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                        data: { total_view: +total_view + 1 },
                    }), // body data type must match "Content-Type" header
                });
            } catch (error) {
                console.log(error.message);
            }
        };
        fn();
    }, []);

    return (
        <>
            <NextSeo
                title={(seo_body?.meta_title || title) + " - " + site_name}
                description={seo_body?.meta_description || ""}
            />
            <section className="py-10 min-h-[80vh]">
                <div className="container mx-auto max-w-7xl">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="p-4 basis-full lg:basis-2/3">
                            <div className="p-8 shadow-lg rounded-lg">
                                {tag_name ? (
                                    <Link href={`/${tag}`}>
                                        <div className="inline-block opacity-80 border rounded-full px-2 mb-2 text-sm hover:bg-black/5 transition-colors">
                                            {tag_name || ""}
                                        </div>
                                    </Link>
                                ) : null}
                                <h1 className="font-semibold text-2xl pb-5">
                                    {title || ""}
                                </h1>
                                <div className="flex items-center space-x-2 pb-3">
                                    <IconEye />
                                    <div>{total_view || 0}</div>
                                </div>
                                <ReadOnlyEditor content={content || ""} />
                            </div>
                        </div>
                        <div className="p-4 basis-full lg:basis-1/3 space-y-8">
                            <div className="shadow-lg p-4 bg-white rounded-lg">
                                <h3 className="font-semibold uppercase text-center text-lg mb-1">
                                    Miễn phí 100% <br /> phí thiết kế nội thất
                                </h3>
                                <h4 className="uppercase text-center font-semibold mb-5">
                                    Trong duy nhất hôm nay
                                </h4>
                                <ContactForm closeButton={false} />
                            </div>
                            <div className="overflow-hidden rounded-lg">
                                <h3 className="uppercase bg-[#e5b936] px-6 py-4 font-semibold text-white">
                                    Bài viết mới nhất
                                </h3>
                                <div className="p-4 bg-[#e5b9364a]">
                                    {Array.isArray(posts)
                                        ? posts.map((item, index) => (
                                              <CardItem
                                                  key={item?.id || index}
                                                  slug={slug}
                                                  property={property}
                                                  {...item}
                                              />
                                          ))
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

const CardItem = ({ title, cover, tag, slug, property }) => {
    const { api_url } = useStore();

    const image_link = cover?.data
        ? api_url + cover?.data?.attributes?.formats?.small?.url || ""
        : null;

    const image_name = cover?.data
        ? cover?.data?.attributes?.formats?.small?.name || ""
        : "18 design";

    const default_image = property?.default_image?.data
        ? api_url +
              property?.default_image?.data?.attributes?.formats?.small?.url ||
          "./images/Gold-18-design.jpg"
        : "./images/Gold-18-design.jpg";

    const url = tag && slug ? `/${tag}/${slug}` : "#";

    return (
        <Link href={url} className="block mb-4">
            <div className="flex space-x-3 hover:bg-black/5 rounded-xl transition-colors">
                <div className="w-24 h-24 overflow-hidden rounded-lg shrink-0">
                    {image_link ? (
                        <Img
                            src={image_link}
                            alt={image_name}
                            className="transition-transform duration-300 group-hover:scale-110 h-full w-full object-cover"
                        />
                    ) : (
                        <Img
                            src={default_image}
                            alt={"logo 18 design"}
                            className="transition-transform duration-300 group-hover:scale-110 h-full w-full object-cover"
                        />
                    )}
                </div>
                <h3 className="">{title || ""}</h3>
            </div>
        </Link>
    );
};

export async function getServerSideProps(context) {
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;
    const { slug } = context.params;

    try {
        const [property, post] = await Promise.all(
            [
                "/api/property?populate=*",
                `/api/posts/${slug}?populate=cover`,
            ].map(async (url) => {
                const res = await unfetch(NEXT_PUBLIC_API_URL + url);
                return res.json();
            })
        );

        const propertyAttr = property?.data?.attributes || {};
        const postAttr = post?.data?.attributes || {};

        postAttr.content = updateImgSrc(postAttr?.content);

        const res = await unfetch(
            NEXT_PUBLIC_API_URL +
                `/api/posts?populate=*&filters[tag][$eq]=${postAttr?.tag}&pagination[limit]=10`
        );
        const posts = await res.json();

        const postArr = getArrayStrapi(posts?.data, []);

        return {
            props: {
                ...postAttr,
                id: post?.data?.id,
                property: propertyAttr,
                posts: postArr,
                slug: slug,
                meta: postAttr?.meta || {},
                message: postAttr?.error?.message || "",
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
