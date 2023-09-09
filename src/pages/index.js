import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import {
    Introduct,
    Seasion1,
    Seasion2,
    TypicalProject,
} from "@/components/Home";
import { Slide } from "@/components/Home/Slide";
import { Pricing } from "@/components/Home/Pricing";
import { Partner } from "@/components/Home/Partner";
import Whychoose from "@/components/Home/Whychoose";
import { NextSeo } from "next-seo";

export default function Home({ title }) {
    return (
        <>
            <NextSeo
                title={title}
                description="A short description goes here."
            />
            <Slide />
            <Seasion1 />
            <Seasion2 />
            <TypicalProject />
            <Pricing />
            <Whychoose />
            <Partner />
        </>
    );
}

export async function getServerSideProps() {
    const { NEXT_PUBLIC_SITE_NAME } = process.env;

    // const res = await unfetch(NEXT_PUBLIC_API_URL + "/api/posts?populate=*");
    // const data = await res.json();

    // const posts = data.data ? data.data : null;
    // const pagination = data.meta ? data.meta.pagination : null;
    // const error = data.error ? data.error : null;

    return {
        props: {
            // posts,
            // pagination,
            // error,
            title: NEXT_PUBLIC_SITE_NAME || "",
        },
    };
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
