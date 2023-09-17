import DefaultLayout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import ReadOnlyEditor from "@/components/ReadOnlyEditor";
import { IconEye } from "@/components/Icons";
import { useEffect } from "react";
import { getArrayStrapi, getMenu, updateImgSrc } from "@/utils";
import { useStore } from "@/stores";
import { Img } from "@/components/UI";
import Link from "next/link";
import { fakePost, fakePosts, fakeProperty } from "@/stores/fakeData";

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
    default_image,
    tag_name,
    tag,
    category,
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
                console.error(error.message);
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
                        <div className="p-4 w-full lg:w-2/3">
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
                        <div className="p-4 w-full lg:w-1/3 space-y-8">
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
                                <div className="py-4 bg-[#e5b9364a]">
                                    {Array.isArray(posts)
                                        ? posts.map((item, index) => (
                                              <CardItem
                                                  key={item?.id || index}
                                                  slug={slug}
                                                  category={category}
                                                  default_image={default_image}
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

const CardItem = ({ title, meta_box, slug, category, default_image }) => {
    const image_link = meta_box?.image?.full_url || default_image?.full_url;

    const image_name = meta_box?.image?.name || "18 design";

    const url = category && slug ? `/${category}/${slug}` : "";

    return (
        <Link href={url} className="block">
            <div className="flex space-x-3 hover:bg-black/5 rounded-xl transition-colors px-3 py-3">
                <div className="w-24 h-24 overflow-hidden rounded-lg shrink-0">
                    <Img
                        src={image_link}
                        alt={image_name}
                        className="transition-transform duration-300 group-hover:scale-110 h-full w-full object-cover"
                    />
                </div>
                <h3 className="">{title?.rendered || ""}</h3>
            </div>
        </Link>
    );
};

export async function getServerSideProps(context) {
    const {
        NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_USER_NAME,
        NEXT_PUBLIC_PASSWORD,
    } = process.env;
    const { slug, category } = context.params;

    try {
        const [menuData, defaulPageData, postPageData] = await Promise.all(
            ["/menu-items", "/pages?slug=mac-dinh", `/posts?slug=${slug}`].map(
                async (url) => {
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
                }
            )
        );

        const menu = getMenu(menuData);
        const meta_box = defaulPageData[0]?.meta_box || {};
        const post_meta_box = postPageData[0]?.meta_box || {};

        const [postsData] = await Promise.all(
            [`/posts?categories=${postPageData[0]?.categories[0]}`].map(
                async (url) => {
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
                }
            )
        );

        return {
            props: {
                ...meta_box,
                menu,
                post: post_meta_box || {},
                posts: postsData,
                category: category || "",
                title: postPageData[0]?.title?.rendered || "",
                content: postPageData[0]?.content?.rendered || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                status: true,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                message: error.message,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
                api_url: NEXT_PUBLIC_API_URL || "",
                status: false,
            },
        };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
