import DefaultLayout from "@/components/Layout";
import { AboutUs } from "@/components/AboutUs";
import Component404 from "@/components/404";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";
import { updateImgSrc } from "@/utils";

export default function Page({
    site_name,
    message,
    seo_body,
    title,
    ...props
}) {
    return (
        <>
            <NextSeo
                title={
                    (seo_body?.meta_title || title || "") + " - " + site_name
                }
                description={seo_body?.meta_description || ""}
            />
            {message ? (
                <Component404 message={message} />
            ) : (
                <AboutUs {...props} />
            )}
        </>
    );
}

export async function getServerSideProps() {
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;

    try {
        const [property, about] = await Promise.all(
            ["/api/property?populate=*", "/api/about?populate=*"].map(
                async (url) => {
                    const res = await unfetch(NEXT_PUBLIC_API_URL + url);
                    return res.json();
                }
            )
        );

        const propertyAttr = property?.data?.attributes || {};
        const aboutAttr = about?.data?.attributes || {};

        // aboutAttr.content = updateImgSrc(aboutAttr?.content);

        return {
            props: {
                ...aboutAttr,
                property: propertyAttr,
                meta: aboutAttr?.meta || {},
                message: aboutAttr?.error?.message || "",
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
