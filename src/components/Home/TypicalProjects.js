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
import { POST_TAB } from "@/constant/post_tab";

export const TypicalProject = ({
    post_group,
    default_image,
    category,
    posts,
}) => {
    const [activedTab, setActivedTab] = useState(POST_TAB?.[0]?.key);
    console.log(posts);
    return (
        <div className="bg-white pt-10 relative">
            <div className="container max-w-7xl mx-auto">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    Công trình tiêu biểu
                </h2>
                <TabWrap>
                    <NavTabList>
                        {POST_TAB.map((item, index) => (
                            <NavTabItem
                                key={index}
                                $actived={activedTab === item?.key}
                                onClick={() => setActivedTab(item?.key)}
                            >
                                <span>{item?.title || ""}</span>
                            </NavTabItem>
                        ))}
                    </NavTabList>
                    {Array.isArray(POST_TAB)
                        ? POST_TAB.map((post) => (
                              <TabContent
                                  key={post?.key}
                                  $actived={activedTab === post?.key}
                              >
                                  <div className="-mx-4 flex flex-wrap">
                                      {Array.isArray(posts)
                                          ? posts.map((item, index) => {
                                                if (index >= 6) return;
                                                return (
                                                    <Card
                                                        key={item?.id}
                                                        {...item}
                                                        category={category}
                                                        default_image={
                                                            default_image
                                                        }
                                                        className="w-full p-4 md:w-1/2 lg:w-1/3"
                                                    />
                                                );
                                            })
                                          : null}
                                  </div>
                                  <ContentBottom>
                                      <ViewMoreLink
                                          href={post?.url}
                                          className="mt-5"
                                      >
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
