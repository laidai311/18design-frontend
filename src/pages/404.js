import DefaultLayout from "@/components/Layout";
import Component404 from "@/components/404";
import { NextSeo } from "next-seo";
import { useStore } from "@/stores";

export default function Page({ title }) {
  const { site_name } = useStore();

  return (
    <>
      <NextSeo
        title={`${title || ""} - ${site_name}`}
        description={"Không thể tìm thấy trang bạn yêu cầu."}
      />
      <Component404 message={"Không thể tìm thấy trang bạn yêu cầu."} />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      title: "404",
    },
  };
}

Page.getLayout = (page, pageProps) => (
  <DefaultLayout {...pageProps}>{page}</DefaultLayout>
);
