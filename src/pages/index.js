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

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
