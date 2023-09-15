import { useState } from "react";
import { NavTabList, TabWrap, TabContent, NavTabItem } from "../Styled/Home/TypicalProjects";

import styled, { css } from "styled-components";
import ReadOnlyEditor from "../ReadOnlyEditor";

const NavTabItemCustom = styled(NavTabItem)`
  border: none;
  color: #000;
  ${(p) =>
    p.$actived
      ? css`
          background: #eaeaea;
        `
      : null}
`;
const NavTabListCustom = styled(NavTabList)`
  justify-content: start;
  background: #f7f7f7;
  margin: 30px 0 0;
`;
const TileOption = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;
const TabContentCustom = styled(TabContent)`
  border: 1px solid #ccc;
  padding: 20px;

  & .description__detail {
    line-height: 1.6;
  }
`;
export function SpecificationTab({description_detail,description_policy,description_maintain}) {
  const [activedTab, setActivedTab] = useState(1);

  return (
    <div className="bg-white pt-10 relative pb-10">
      <div className="container max-w-7xl mx-auto">
        <TileOption>Thông số khác</TileOption>
        <TabWrap>
          <NavTabListCustom>
            <NavTabItemCustom $actived={activedTab === 1} onClick={() => setActivedTab(1)}>
              <span>Mô tả</span>
            </NavTabItemCustom>
            <NavTabItemCustom $actived={activedTab === 2} onClick={() => setActivedTab(2)}>
              <span>Chính sách</span>
            </NavTabItemCustom>
            <NavTabItemCustom $actived={activedTab === 3} onClick={() => setActivedTab(3)}>
              <span>Bảo quản</span>
            </NavTabItemCustom>
          </NavTabListCustom>
          <TabContentCustom $actived={activedTab === 1}>
            <div className=" flex flex-wrap">
              <div className="description__detail">
                <ReadOnlyEditor content={description_detail || ""} />
              </div>
            </div>
          </TabContentCustom>
          <TabContentCustom $actived={activedTab === 2}>
            <div className=" flex flex-wrap">
              <div className="description__detail">
               <ReadOnlyEditor content={description_policy || ""} />
              </div>
            </div>
          </TabContentCustom>
          <TabContentCustom $actived={activedTab === 3}>
            <div className=" flex flex-wrap">
              <div className="description__detail">
              <ReadOnlyEditor content={description_maintain || ""} />
              </div>
            </div>
          </TabContentCustom>
        </TabWrap>
      </div>
    </div>
  );
}
