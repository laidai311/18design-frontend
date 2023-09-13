import { styled } from "styled-components";
import { IconHome } from "../Icons";
import { Container } from "../Styled";

const BreadcrumbList = styled.div`
  padding: 20px 0;
`;
const Breadcrumbs = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  & > li:after {
    content: "${(props) => props.separator || "/"}";
    padding: 0 8px;
  }
`;

const Crumb = styled.li`
  display: flex;
  align-items: center;
  &:last-of-type:after {
    content: "";
    padding: 0;
  }

  a {
    display: flex;
    color: #bd8b1b;
    text-decoration: none;
    &:hover,
    &:active {
      text-decoration: underline;
    }
  }
`;

export function Breadcrumb() {
  return (
    <BreadcrumbList className="breadcrumb">
      <Container>
        <Breadcrumbs>
          <Crumb>
            <a href="#">
              <IconHome />
            </a>
          </Crumb>
          <Crumb>Sản phẩm</Crumb>
        </Breadcrumbs>
      </Container>
    </BreadcrumbList>
  );
}
