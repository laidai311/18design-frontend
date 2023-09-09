import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { AboutUs } from "@/components/AboutUs";
import fetch from "isomorphic-unfetch";
import Component404 from "@/components/404";

export default function Page({ introduction, error }) {
    return (
        <>
            <Head>
                <title>18 Design</title>
                <meta
                    name="description"
                    content="CÔNG TY CP KIẾN TRÚC & ĐT XÂY DỰNG 18 DESIGN"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            {error ? (
                <Component404 {...error} />
            ) : (
                <AboutUs {...introduction} />
            )}
        </>
    );
}

export async function getServerSideProps() {
    const { NEXT_PUBLIC_API_URL } = process.env;

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/about`);
    const data = await res.json();

    const introduction = data.data ? data.data.attributes : null;
    const error = data.error ? data.error : null;

    return {
        props: {
            introduction,
            error,
        },
    };
}

Page.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
