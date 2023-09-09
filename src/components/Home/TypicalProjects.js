import { useState } from "react";
import {
    NavTabList,
    TabWrap,
    TabContent,
    NavTabItem,
    ViewMoreLink,
    ContentBottom,
} from "../Styled/Home/TypicalProjects";
import { IconChevronRight } from "../Icons";
import { Card } from "../Card";

const data1 = {
    image_link:
        "https://noithatdreamhome.vn/wp-content/uploads/2023/05/z4389761188843_6f7f985f1f3ef8c0c72da06dee551b7e.jpg",
    title: "Hoàn Thiện Nội Thất Chung Cư Season Avenue-115m2",
    total_view: 20474,
    location: "/thiet-ke-noi-that/hoan-thien-noi-that-chung-cu",
};
const data2 = {
    image_link:
        "https://noithatdreamhome.vn/wp-content/uploads/2023/08/z4643700286040_9467a37736687d9e7c40f3f29de894aa_compressed.jpg",
    title: "Thiết Kế Kiến Trúc Biệt thự Sơn Tây-210m2",
    total_view: 30746,
    location: "/thiet-ke-noi-that/hoan-thien-noi-that-chung-cu",
};
export const TypicalProject = () => {
    const [activedTab, setActivedTab] = useState(1);

    return (
        <div className="bg-white pt-10 relative">
            <div className="container max-w-7xl mx-auto">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    Công trình tiêu biểu
                </h2>
                <TabWrap>
                    <NavTabList>
                        <NavTabItem
                            $actived={activedTab === 1}
                            onClick={() => setActivedTab(1)}
                        >
                            <span>Thiết kế nội thất</span>
                        </NavTabItem>
                        <NavTabItem
                            $actived={activedTab === 2}
                            onClick={() => setActivedTab(2)}
                        >
                            <span>Thiết kế kiến trúc</span>
                        </NavTabItem>
                    </NavTabList>
                    <TabContent $actived={activedTab === 1}>
                        <div className="-m-4 flex flex-wrap">
                            <Card
                                {...data1}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data1}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data1}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data1}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data1}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data1}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                        </div>
                        <ContentBottom>
                            <ViewMoreLink href={"/thiet-ke-noi-that"}>
                                <span>Xem thêm</span>
                                <IconChevronRight />
                            </ViewMoreLink>
                        </ContentBottom>
                    </TabContent>
                    <TabContent $actived={activedTab === 2}>
                        <div className="-m-4 flex flex-wrap">
                            <Card
                                {...data2}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data2}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data2}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data2}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data2}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                            <Card
                                {...data2}
                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                            />
                        </div>
                        <ContentBottom>
                            <ViewMoreLink href={"/thiet-ke-noi-that"}>
                                <span>Xem thêm</span>
                                <IconChevronRight />
                            </ViewMoreLink>
                        </ContentBottom>
                    </TabContent>
                </TabWrap>
            </div>
        </div>
    );
};
