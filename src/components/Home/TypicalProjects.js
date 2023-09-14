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

export const TypicalProject = ({ post_group, post_tab, property }) => {
    const [activedTab, setActivedTab] = useState(post_tab?.[0]?.key);

    return (
        <div className="bg-white pt-10 relative">
            <div className="container max-w-7xl mx-auto">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    Công trình tiêu biểu
                </h2>
                <TabWrap>
                    <NavTabList>
                        {Array.isArray(post_tab)
                            ? post_tab.map((item, index) => (
                                  <NavTabItem
                                      key={index}
                                      $actived={activedTab === item?.key}
                                      onClick={() => setActivedTab(item?.key)}
                                  >
                                      <span>{item?.title || ""}</span>
                                  </NavTabItem>
                              ))
                            : null}
                    </NavTabList>
                    {Array.isArray(post_group)
                        ? post_group.map((post) => (
                              <TabContent
                                  key={post?.key}
                                  $actived={activedTab === post?.key}
                              >
                                  <div className="-m-4 flex flex-wrap">
                                      {Array.isArray(post?.items)
                                          ? post?.items.map((item) => (
                                                <Card
                                                    key={item?.id}
                                                    {...item}
                                                    property={property}
                                                    className="w-full p-4 md:w-1/2 lg:w-1/3"
                                                />
                                            ))
                                          : null}
                                  </div>
                                  <ContentBottom>
                                      <ViewMoreLink href={post?.url}>
                                          <span>Xem thêm</span>
                                          <IconChevronRight />
                                      </ViewMoreLink>
                                  </ContentBottom>
                              </TabContent>
                          ))
                        : null}
                </TabWrap>
            </div>
        </div>
    );
};
