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
import { range } from "@/utils";

export const TypicalProject = ({
    postsTab,
    isFetching,
    activedTab,
    setActivedTab,
}) => {
    return (
        <div className="bg-white pt-10 relative">
            <div className="container max-w-7xl mx-auto px-3">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    Công trình tiêu biểu
                </h2>
                <TabWrap>
                    <NavTabList>
                        {Array.isArray(postsTab)
                            ? postsTab.map((item, index) => (
                                  <NavTabItem
                                      key={index}
                                      $actived={
                                          activedTab === item?.category_id
                                      }
                                      onClick={() =>
                                          setActivedTab(item?.category_id)
                                      }
                                  >
                                      <span>{item?.label || ""}</span>
                                  </NavTabItem>
                              ))
                            : null}
                    </NavTabList>
                    {Array.isArray(postsTab)
                        ? postsTab.map((item) => (
                              <TabContent
                                  key={item?.category_id}
                                  $actived={activedTab === item?.category_id}
                              >
                                  {isFetching ? (
                                      <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                                          {range(1, 6).map((key) => (
                                              <div
                                                  key={key}
                                                  className="w-full p-4 md:w-1/2 lg:w-1/3"
                                              >
                                                  <div className="relative pt-[100%]">
                                                      <div className="absolute inset-0 animate-pulse flex flex-col space-y-5">
                                                          <div className="rounded-lg bg-black/10 h-72"></div>
                                                          <div className="space-y-2">
                                                              <div className="rounded-lg bg-black/10 h-5"></div>
                                                              <div className="rounded-lg bg-black/10 h-5 w-1/2"></div>
                                                          </div>
                                                          <div className="rounded-lg bg-black/10 h-14"></div>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  ) : (
                                      <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                                          {Array.isArray(item?.posts_list)
                                              ? item.posts_list.map(
                                                    (itm, index) => {
                                                        if (index >= 6) return;
                                                        return (
                                                            <Card
                                                                key={itm?.id}
                                                                {...itm}
                                                                category={
                                                                    item?.category
                                                                }
                                                                className="w-full p-4 md:w-1/2 lg:w-1/3"
                                                            />
                                                        );
                                                    }
                                                )
                                              : null}
                                      </div>
                                  )}
                                  <ContentBottom>
                                      <ViewMoreLink
                                          href={`/danh-muc/${
                                              item?.category?.slug ||
                                              item?.category_id
                                          }`}
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
