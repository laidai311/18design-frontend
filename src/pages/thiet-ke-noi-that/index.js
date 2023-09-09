import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { styled } from "styled-components";
import { Container } from "@/components/Styled";
import { CardItem } from "@/components/Common";
import { CardList } from "@/components/Styled/Card";

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

const data1 = {
    image_link:
        "https://noithatdreamhome.vn/wp-content/uploads/2023/05/z4389761188843_6f7f985f1f3ef8c0c72da06dee551b7e.jpg",
    title: "Hoàn Thiện Nội Thất Chung Cư Season Avenue-115m2",
    total_view: 20474,
    location: "/thiet-ke-noi-that/hoan-thien-noi-that-chung-cu",
};

export default function Page() {
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
            <Wrapper>
                <Container>
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
                    <CardList>
                        <CardItem {...data1} />
                        <CardItem {...data1} />
                        <CardItem {...data1} />
                        <CardItem {...data1} />
                        <CardItem {...data1} />
                        <CardItem {...data1} />
                    </CardList>
                </Container>
            </Wrapper>
        </>
    );
}

Page.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
