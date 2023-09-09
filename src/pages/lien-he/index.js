import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { Banner, Contact, FollowUs, Social } from "@/components/Contact/Banner";

export default function Home() {
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
            <Banner />
            <Contact />
            <FollowUs />
            <Social />
        </>
    );
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
