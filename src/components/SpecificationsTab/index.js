import { useState } from "react";
import { NavTabList, TabWrap, TabContent, NavTabItem } from "../Styled/Home/TypicalProjects";

import styled, { css } from "styled-components";

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
export function SpecificationTab() {
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
                Fredericia tọa lạc ở phía đông nam của bán đảo Jutland, nằm trong khu vực tam giác với Kolding và Vejle. Fredericia là địa danh cho ra đời những thiết kế nội thất tuyệt vời của Đan
                Mạch. Ghế sofa Fredericia được thiết theo xu hướng nguyên bản của thập niên 70, đây là dòng xu hướng vượt thời gian của loại ghế sofa này. Thiết kế xuất phát từ khi thời đại của Đan
                Mạch bùng nổ, khi những người nổi tiếng trên khắp thế giới yêu thích loại ghế sofa này và vẫn còn ưa chuộng cho đến ngày nay.
              </div>
            </div>
          </TabContentCustom>
          <TabContentCustom $actived={activedTab === 2}>
            <div className=" flex flex-wrap">
              <div className="description__detail">
                . Ghế sofa Fredericia được thiết theo xu hướng nguyên bản của thập niên 70, đây là dòng xu hướng vượt thời gian của loại ghế sofa này. Thiết kế xuất phát từ khi thời đại của Đan
                Mạch bùng nổ, khi những người nổi tiếng trên khắp thế giới yêu thích loại ghế sofa này và vẫn còn ưa chuộng cho đến ngày nay.
              </div>
            </div>
          </TabContentCustom>
          <TabContentCustom $actived={activedTab === 3}>
            <div className=" flex flex-wrap">
              <div className="description__detail">
                Fredericia tọa lạc ở phía đông nam của bán đảo Jutland, nằm trong khu vực tam giác với Kolding và Vejle. Fredericia là địa danh cho ra đời những thiết kế nội thất tuyệt vời của Đan
                Mạch. , khi những người nổi tiếng trên khắp thế giới yêu thích loại ghế sofa này và vẫn còn ưa chuộng cho đến ngày nay.
              </div>
            </div>
          </TabContentCustom>
        </TabWrap>
      </div>
    </div>
  );
}
