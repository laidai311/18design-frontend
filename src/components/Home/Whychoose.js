import { styled } from "styled-components";

/* eslint-disable @next/next/no-img-element */
const data = [
    {
        icon: "./images/icon-4.png",
        title: "Đội ngũ thiết kế kinh nghiệm",
        description:
            "Đội ngũ kiến trúc sư có kinh nghiệm lâu năm với tư duy sáng tạo.",
    },
    {
        icon: "./images/icon-5.png",
        title: "ĐỘI NGŨ GIÁM SÁT NĂNG LỰC CAO",
        description:
            "Đội ngũ tư vấn giám sát năng lực cao và tinh thần làm việc nhiệt huyết!",
    },
    {
        icon: "./images/icon-6.png",
        title: "ĐỘI NGŨ CÔNG NHÂN LÀNH NGHỀ",
        description:
            "Đội ngũ công nhân đều có tay nghề cao, đã tham gia nhiều dự án.",
    },
    {
        icon: "./images/icon-7.png",
        title: "SẢN PHẨM NỘI THẤT CHẤT LƯỢNG CAO",
        description:
            "Xưởng sản xuất với cơ sở vật chất hiện đại cho sản phẩm tốt nhất.",
    },
    {
        icon: "./images/icon-8.png",
        title: "ĐƠN GIÁ HỢP LÝ VÀ CẠNH TRANH",
        description:
            "Bảng giá của các sản phẩm và dịch vụ cung cấp cạnh tranh.",
    },
    {
        icon: "./images/icon-9.png",
        title: "DỊCH VỤ SAU BÁN HÀNG HOÀN HẢO",
        description:
            "Cam kết hỗ trợ khách hàng mọi vấn đề về bảo hành, bảo trì sản phẩm trong 05 năm sử dụng.",
    },
];

export default function Whychoose() {
    return (
        <StyledSection className="pt-10 relative text-white">
            <div className="container max-w-7xl mx-auto">
                <div className="bg-black/70 absolute inset-0" />
                <h3 className="relative text-2xl uppercase text-center mb-6 px-6">
                    Tại sao chọn 18 Design
                </h3>
                <div className="relative -mx-4 flex flex-wrap pb-10">
                    {data.map((itm, idx) => (
                        <div
                            key={idx}
                            className="w-full p-4 md:w-1/2 lg:w-1/3 space-y-3"
                        >
                            <div className="flex justify-center">
                                <img
                                    alt="pic-1"
                                    src={itm.icon}
                                    className="w-16 h-16"
                                />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="text-primary uppercase font-semibold">
                                    {itm.title}
                                </h3>
                                <p>{itm.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StyledSection>
    );
}

const StyledSection = styled.section`
    background-image: url("./images/seasion-bg-1.jpg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
`;
