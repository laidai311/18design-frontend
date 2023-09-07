import Head from "next/head";
import DefaultLayout from "@/components/Layout";
import { css, styled } from "styled-components";
import { Container } from "@/components/Styled";
import { CardItem } from "@/components/Common";
import { CardList } from "@/components/Styled/Card";
import ContactForm from "@/components/Layout/ContactForm";
import { Img } from "@/components/UI";
import { media } from "@/components/theme";

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

export default function Page() {
    return (
        <>
            <Head>
                <title>
                    Hoàn Thiện Nội Thất Chung Cư Season Avenue-115m2 | 18 DESIGN
                </title>
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
                                    <h1>
                                        Hoàn Thiện Nội Thất Chung Cư Season
                                        Avenue-115m2
                                    </h1>
                                    <h2>Thông tin dự án:</h2>
                                    <ul>
                                        <li>
                                            Dự án: Hoàn thiện nội thất Season
                                            Avenue
                                        </li>
                                        <li>Tổng diện tích: 115m2</li>
                                        <li>Phong cách: Hiện đại</li>
                                        <li>Vị trí: Hà Nội</li>
                                        <li>Thiết kế & thi công : DreamHome</li>
                                    </ul>
                                    <p>
                                        Video chân thực nhất về hoàn thiện nội
                                        thất căn hộ tiện nghi của anh chị khách
                                        hàng trẻ tuổi, có Gu riêng, thiết kế
                                        không gian sống tối ưu và đẳng cấp.
                                        Dreamhome tự hào đã mang lại ngôi nhà mơ
                                        ước cho khách hàng với sự hài lòng và
                                        tin tưởng.
                                    </p>
                                    <div>
                                        <iframe
                                            title="Choáng Ngợp Trước Sự Lôi Cuốn Của Căn Hộ Phong Cách Hiện Đại 115m2 - DREAMHOME [4K]"
                                            width="100%"
                                            height="480"
                                            src="https://www.youtube.com/embed/jQTVil5nL6I?start=17&amp;feature=oembed"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen=""
                                            __idm_id__="1605633"
                                        ></iframe>
                                    </div>
                                    <h2>Hoàn thiện nội thất phòng khách</h2>
                                    <p>
                                        Khi bước chân vào phòng khách thứ mà thu
                                        hút người nhìn không còn là ghế sofa hay
                                        bàn trà nữa mà đó chính là phần trần
                                        thạch cao. Trần thạch cao của căn hộ này
                                        rất đặc biệt bởi quá trình làm ra nó rất
                                        cầu kỳ, tốn nhiều công sức và thời gian
                                        để tạo ra một chiếc trần đạt đến độ tinh
                                        tế và tỉ mỉ như vậy.
                                    </p>
                                    <Img data-src="https://noithatdreamhome.vn/wp-content/uploads/2023/05/z4389678133148_c0b35e6efce88d942d7be16a89a1ed80_compressed-2048x1303.jpg" />
                                    <p>
                                        Từ trước tới nay Dreamhome chưa từng làm
                                        trần thạch cao có độ khó như vậy nhưng
                                        để đáp ứng yêu cầu và mong muốn của anh
                                        chị chủ thì Dreamhome đã lên phương án
                                        cụ thể, sắp xếp đội ngũ thợ chuyên
                                        nghiệp.
                                    </p>
                                    <p>
                                        Phần trần có những chi tiết bo cong mềm
                                        mại được anh chị chủ nhà yêu thích và đã
                                        chốt luôn phương án đầu tiên về trần mà
                                        chưa quan tâm đến nội thất. Hiện nay
                                        trần thạch cao rất phổ biến đối với mọi
                                        không gian nhà vì nó dễ dàng biến tấu
                                        làm cho ngôi nhà của bạn trở nên sinh
                                        động hơn.
                                    </p>
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

Page.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
