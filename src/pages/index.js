import Head from 'next/head'
import DefaultLayout from "@/components/Layout";

export default function Home() {
    return (
        <>
            <Head>
                <title>CÔNG TY CP KIẾN TRÚC & ĐT XÂY DỰNG 18 DESIGN</title>
                <meta name="description" content="CÔNG TY CP KIẾN TRÚC & ĐT XÂY DỰNG 18 DESIGN"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div style={{height: 3000}}>

            </div>
        </>
    )
}

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>