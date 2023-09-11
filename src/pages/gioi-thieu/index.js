import DefaultLayout from "@/components/Layout";
import { AboutUs } from "@/components/AboutUs";
import Component404 from "@/components/404";
import unfetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";

export default function Page({ site_name, message, seo_body, ...props }) {
    return (
        <>
            <NextSeo
                title={seo_body?.meta_title + " - " + site_name}
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
        const res = await unfetch(
            NEXT_PUBLIC_API_URL + "/api/about?populate=*"
        );
        const data = await res.json();

        const attributes = data?.data?.attributes || {};

        return {
            props: {
                ...attributes,
                meta: data?.meta || {},
                message: data?.error?.message || "",
                site_name: NEXT_PUBLIC_SITE_NAME || "",
            },
        };
    } catch (error) {
        return {
            props: {
                message: error.message,
                site_name: NEXT_PUBLIC_SITE_NAME || "",
            },
        };
    }
}

Page.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
