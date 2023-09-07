import { useState } from "react";
import { Container } from "../Styled/Common";
import {
    NavTabList,
    HomeTitle,
    Wrapper,
    TabWrap,
    TabContent,
    NavTabItem,
    ViewMoreLink,
    ContentBottom,
} from "../Styled/Home/TypicalProjects";
import { IconChevronRight } from "../Icons";
import { CardItem } from "../Common";
import { CardList } from "../Styled/Card";

const data1 = {
    image_link:
        "https://noithatdreamhome.vn/wp-content/uploads/2023/05/z4389761188843_6f7f985f1f3ef8c0c72da06dee551b7e.jpg",
    title: "Hoàn Thiện Nội Thất Chung Cư Season Avenue-115m2",
    total_view: 20474,
    location: "/",
};
const data2 = {
    image_link:
        "https://noithatdreamhome.vn/wp-content/uploads/2023/08/z4643700286040_9467a37736687d9e7c40f3f29de894aa_compressed.jpg",
    title: "Thiết Kế Kiến Trúc Biệt thự Sơn Tây-210m2",
    total_view: 30746,
    location: "/",
};
export const TypicalProject = () => {
    const [activedTab, setActivedTab] = useState(1);

    return (
        <Wrapper>
            <Container>
                <HomeTitle>Công trình tiêu biểu</HomeTitle>
                <TabWrap>
                    <NavTabList>
                        <NavTabItem
                            actived={activedTab === 1}
                            onClick={() => setActivedTab(1)}
                        >
                            <span>Thiết kế nội thất</span>
                        </NavTabItem>
                        <NavTabItem
                            actived={activedTab === 2}
                            onClick={() => setActivedTab(2)}
                        >
                            <span>Thiết kế kiến trúc</span>
                        </NavTabItem>
                    </NavTabList>
                    <TabContent actived={activedTab === 1}>
                        <CardList>
                            <CardItem {...data1} />
                            <CardItem {...data1} />
                            <CardItem {...data1} />
                            <CardItem {...data1} />
                            <CardItem {...data1} />
                            <CardItem {...data1} />
                        </CardList>
                        <ContentBottom>
                            <ViewMoreLink href={"/thiet-ke-noi-that"}>
                                <span>Xem thêm</span>
                                <IconChevronRight />
                            </ViewMoreLink>
                        </ContentBottom>
                    </TabContent>
                    <TabContent actived={activedTab === 2}>
                        <CardList>
                            <CardItem {...data2} />
                            <CardItem {...data2} />
                            <CardItem {...data2} />
                            <CardItem {...data2} />
                            <CardItem {...data2} />
                            <CardItem {...data2} />
                        </CardList>
                        <ContentBottom>
                            <ViewMoreLink href={"/thiet-ke-kien-truc"}>
                                <span>Xem thêm</span>
                                <IconChevronRight />
                            </ViewMoreLink>
                        </ContentBottom>
                    </TabContent>
                </TabWrap>
            </Container>
        </Wrapper>
    );
};
