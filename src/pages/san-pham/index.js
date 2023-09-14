import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CategorySection, CategoryTitle } from "@/components/CategoryProduct";
import { Quote } from "@/components/Home";
import { CardProductItem } from "@/components/CardProduct";
import { styled } from "styled-components";
import { Container } from "@/components/Styled";
import unfetch from "isomorphic-unfetch";

const Card = styled.div`
    padding: 80px 0;
`;
const CardList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 30px;
    @media (max-width: 992px) {
        grid-template-columns: repeat(2, auto);
    }
    @media (max-width: 456px) {
        grid-template-columns: repeat(1, auto);
    }
`;

export default function Page() {
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
            <img src="https://img.freepik.com/-photo/stylish-scandinavian-living-room-with-design-mint-sofa-furnitures-mock-up-poster-map-plants-eleg_1258-152155.jpg?w=1800&t=st=1694598264~exp=1694598864~hmac=a8ba1aef84538545f49d24057796937b6f87262f81c9b687e36c925d56b28b22" />
            <Breadcrumb />
            <CategorySection />
            <Quote />
            <Card>
                <Container>
                    <CategoryTitle>
                        <h3>Sản phẩm nổi bật</h3>
                    </CategoryTitle>
                    <CardList>
                        <CardProductItem />
                        <CardProductItem />
                        <CardProductItem />
                        <CardProductItem />
                        <CardProductItem />
                        <CardProductItem />
                        <CardProductItem />
                        <CardProductItem />
                    </CardList>
                </Container>
            </Card>
        </>
    );
}

export async function getServerSideProps(context) {
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;
    // const { tag, page: currentPage = 1 } = context.query;

    try {
        const [property] = await Promise.all(
            ["/api/property?populate=*", ,].map(async (url) => {
                const res = await unfetch(NEXT_PUBLIC_API_URL + url);
                return res.json();
            })
        );

        const propertyAttr = property?.data?.attributes || {};
        // const tagPageAttr = tagPage?.data?.attributes || {};
        // const postArr = getArrayStrapi(posts?.data, []);

        return {
            props: {
                // ...tagPageAttr,
                property: propertyAttr,
                // posts: postArr,
                // currentPage: currentPage - 1,
                // tag: tag,
                // pagination: posts.meta?.pagination || {},
                // meta: tagPageAttr?.meta || {},
                // message: tagPageAttr?.error?.message || "",
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
