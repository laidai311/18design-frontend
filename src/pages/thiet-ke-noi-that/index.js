import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { styled } from "styled-components";
import { Container } from "@/components/Styled";
import { Card } from "@/components/Card";
import { CardList } from "@/components/Styled/Card";
import unfetch from "isomorphic-unfetch";

const Wrapper = styled.div`
    position: relative;
    padding: 30px 0;
`;

const PageTitle = styled.h1`
    text-transform: uppercase;
    margin: 0 0 20px;
    border-bottom: 2px solid #bd8b1b;
    line-height: 35px;
    position: relative;
    font-size: 20px;
    text-align: center;
`;

const PageDescription = styled.div`
    text-align: center;
    padding: 0 12px;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;

    > * {
        margin-bottom: 20px;
    }
`;

const DescriptionList = styled.ul`
    text-align: center;
    padding: 0 12px;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;

    > * {
        margin-bottom: 20px;
        list-style-type: disc;
    }
`;

export default function Page({ posts, pagination, error }) {
    return (
        <>
            <Head>
                <title>Thiết kế nội thất | 18 Design</title>
                <meta
                    name="description"
                    content="CÔNG TY CP KIẾN TRÚC & ĐT XÂY DỰNG 18 DESIGN"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <section className="min-h-screen pt-8">
                <div className="container max-w-7xl mx-auto">
                    <PageTitle>CATEGORY ARCHIVES: THIẾT KẾ NỘI THẤT</PageTitle>
                    <PageDescription>
                        <p>
                            Thiết kế nội thất là một khâu vô cùng quan trọng và
                            không thể tách rời trong ngành kiến trúc. Nội thất
                            bao hàm không gian bên trong của ngôi nhà để phục vụ
                            cho nhu cầu làm việc, sinh hoạt và giải trí của gia
                            chủ. Điều này quyết định đến yếu tố thẩm mỹ cho ngôi
                            nhà của chúng ta.
                        </p>
                        <p>
                            Bộ sưu tập những mẫu thiết kế nội thất chung cư,
                            biệt thự, nhà phố, khách sạn, showroom, nhà hàng,
                            quán cafe,… theo nhiều phong cách như: phong cách
                            hiện đại, phong cách Cổ Điển, Tân Cổ Điển, Bán Cổ
                            Điển, phong cách Á Đông, phong cách Châu Âu, phong
                            cách Scandinavian, phong cách Indochine…tại nhiều dự
                            án và khắp các tỉnh thành trên cả nước do DreamHome
                            thiết kế.
                        </p>
                        <p>
                            Khi thiết kế nội thất tại Dreamhome, chúng tôi cam
                            kết:
                        </p>
                        <DescriptionList>
                            <li>
                                Đảm bảo tiến độ 100% giao bản thiết kế đến tay
                                khách hàng đúng hạn
                            </li>
                            <li>
                                Đội ngũ kiến trúc sư giàu kinh nghiệm, chuyên
                                sâu
                            </li>
                            <li>
                                Từng thiết kế hàng nghìn công trình lớn nhỏ từ
                                biệt thự, nhà phố đến chung cư
                            </li>
                            <li>
                                Đáp ứng nhu cầu của khách hàng về các phòng cách
                                như Hiện đại, Tân cổ điển, Indochine, Luxury,…
                            </li>
                            <li>
                                Miễn phí 100% tiền thiết kế khi khách hàng
                                chuyển sang giai đoạn thi công công trình
                            </li>
                            <li>
                                Giá thành cạnh tranh nhất trên thị trường nội
                                thất hiện nay
                            </li>
                        </DescriptionList>
                    </PageDescription>
                    {posts?.length ? (
                        <div className="-m-4 flex flex-wrap">
                            {posts.map((itm) => (
                                <Card
                                    {...itm.attributes}
                                    key={itm.id}
                                    className="w-full p-4 md:w-1/2 lg:w-1/3"
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps() {
    const { NEXT_PUBLIC_API_URL } = process.env;

    const res = await unfetch(NEXT_PUBLIC_API_URL + "/api/posts?populate=*");
    const data = await res.json();

    const posts = data.data ? data.data : null;
    const pagination = data.meta ? data.meta.pagination : null;
    const error = data.error ? data.error : null;

    return {
        props: {
            posts,
            pagination,
            error,
        },
    };
}

Page.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
