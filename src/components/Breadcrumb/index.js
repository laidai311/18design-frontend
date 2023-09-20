import { styled } from "styled-components";
import { IconHome } from "../Icons";
import { Container } from "../Styled";
import Link from "next/link";

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

export function Breadcrumb({ value1, value2 }) {
    return (
        <BreadcrumbList className="breadcrumb">
            <Container>
                <Breadcrumbs>
                    <Crumb>
                        <Link href="/">
                            <IconHome />
                        </Link>
                    </Crumb>
                    <Crumb>Sản phẩm</Crumb>
                    {value1 && <Crumb>{value1}</Crumb>}
                    {value2 && <Crumb>{value2}</Crumb>}
                </Breadcrumbs>
            </Container>
        </BreadcrumbList>
    );
}
