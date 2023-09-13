import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { css, styled } from "styled-components";
import { Container } from "@/components/Styled";
import ContactForm from "@/components/ContactForm";
import { Img } from "@/components/UI";
import { media } from "@/components/theme";
import unfetch from "isomorphic-unfetch";

const Wrapper = styled.div`
    position: relative;
    padding: 30px 0;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;

    ${media.lg(css`
        flex-direction: row;
    `)}
`;
const MainContent = styled.div`
    flex-basis: calc(200% / 3);
    padding: 12px;
    flex-grow: 0;
`;

const SideContent = styled.div`
    display: flex;
    flex-basis: calc(100% / 3);
    padding: 12px;
    flex-grow: 0;

    justify-content: center;
`;

const ContentContainer = styled.div`
    width: 100%;
    background-color: white;
    padding: 15px;
    box-shadow: 0px 0px 30px -10px rgb(0 0 0 / 30%);
    margin-bottom: 20px;
    border-radius: 5px;
`;

const ContentWrap = styled.div`
    width: 100%;
    font-size: 1rem;
    line-height: 1.6;

    > * + * {
        margin-top: 12px;
    }
`;

export default function Page({ post = {}, error }) {
    return (
        <>
            <Head>
                <title>{post.title} | 18 Design</title>
                <meta
                    name="description"
                    content="CÔNG TY CP KIẾN TRÚC & ĐT XÂY DỰNG 18 DESIGN"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Wrapper>
                <Container>
                    <Content>
                        <MainContent>
                            <ContentContainer>
                                <ContentWrap>
                                    <h1 className="">{post.title}</h1>

                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: post.content,
                                        }}
                                    />
                                </ContentWrap>
                            </ContentContainer>
                        </MainContent>
                        <SideContent>
                            <ContactForm closeButton={false} />
                        </SideContent>
                    </Content>
                </Container>
            </Wrapper>
        </>
    );
}

export async function getServerSideProps(context) {
    const { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_API_URL } = process.env;
    const { slug } = context.params;
console.log(context.params);
    try {
        const [property] = await Promise.all(
            ["/api/property?populate=*"].map(async (url) => {
                const res = await unfetch(NEXT_PUBLIC_API_URL + url);
                return res.json();
            })
        );

        const propertyAttr = property?.data?.attributes || {};

        return {
            props: {
                // ...aboutAttr,
                property: propertyAttr,
                // meta: aboutAttr?.meta || {},
                // message: aboutAttr?.error?.message || "",
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
