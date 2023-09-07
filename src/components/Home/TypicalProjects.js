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
} from "../Styled/Home/TypicalProjects";
import { IconChevronRight } from "../Icons";

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
                        <div>abc</div>
                        <ViewMoreLink href={"/thiet-ke-noi-that"}>
                            <span>Xem thêm</span>
                            <IconChevronRight />
                        </ViewMoreLink>
                    </TabContent>
                    <TabContent actived={activedTab === 2}>
                        <div>edf</div>
                        <ViewMoreLink href={"/thiet-ke-kien-truc"}>
                            <span>Xem thêm</span>
                            <IconChevronRight />
                        </ViewMoreLink>
                    </TabContent>
                </TabWrap>
            </Container>
        </Wrapper>
    );
};
