import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { Banner, Contact, FollowUs, Social } from "@/components/Contact/Banner";
import unfetch from "isomorphic-unfetch";
import { Img } from "@/components/UI";
import { useStore } from "@/stores";

export default function ContactPage({ banner_img, ...props }) {
    const { api_url } = useStore();
    return (
        <>
            <Head>
                <title>Liên hệ - 18 Design</title>
                <meta
                    name="description"
                    content="CÔNG TY CP KIẾN TRÚC & ĐT XÂY DỰNG 18 DESIGN"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            {/* <Banner {...props} /> */}
            <div className="w-full relative pt-[52%] h-auto lg:pt-0 lg:h-[80vh] bg-[#d4e1e7]">
                <div className="absolute inset-0 py-32 px-20">
                    <Img
                        // alt={image_name || ""}
                        src={api_url + banner_img?.data?.attributes?.url}
                        className={"w-full h-full object-cover"}
                    />
                </div>
            </div>
            <Contact {...props} />
            <FollowUs {...props} />
            <Social {...props} />
        </>
    );
}

export async function getServerSideProps() {
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;

    try {
        const [property, contact] = await Promise.all(
            ["/api/property?populate=*", "/api/contact?populate=*"].map(
                async (url) => {
                    const res = await unfetch(NEXT_PUBLIC_API_URL + url);
                    return res.json();
                }
            )
        );
        const propertyAttr = property?.data?.attributes || {};
        const contactAttr = contact?.data?.attributes || {};
        return {
            props: {
                ...contactAttr,
                property: propertyAttr,
                meta: contact?.meta || {},
                message: contact?.error?.message || "",
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

ContactPage.getLayout = (page, pageProps) => (
    <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
