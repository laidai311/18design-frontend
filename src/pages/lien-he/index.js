import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { Banner, Contact, FollowUs, Social } from "@/components/Contact/Banner";
import unfetch from "isomorphic-unfetch";

export default function ContactPage({ ...props }) {
    console.log(props);
  return (
    <>
      <Head>
        <title>18 Design</title>
        <meta name="description" content="CÔNG TY CP KIẾN TRÚC & ĐT XÂY DỰNG 18 DESIGN" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Banner {...props} />
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
      ["/api/property?populate=*", "/api/contact?populate=*"].map(async (url) => {
        const res = await unfetch(NEXT_PUBLIC_API_URL + url);
        return res.json();
      })
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

ContactPage.getLayout = (page, pageProps) => <DefaultLayout {...pageProps}>{page}</DefaultLayout>;
