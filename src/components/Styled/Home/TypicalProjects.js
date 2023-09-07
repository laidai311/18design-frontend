import { colors } from "@/components/theme";
import Link from "next/link";
import styled, { css } from "styled-components";

export const Wrapper = styled.section`
    position: relative;
    background-color: white;
    padding-top: 30px;
`;

export const HomeTitle = styled.h2`
    margin-bottom: 50px;
    padding: 0px 25px;
    line-height: 50px;
    position: relative;
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
    color: #333333;

    &::after {
        position: absolute;
        bottom: -10px;
        content: "";
        height: 3px;
        width: 80px;
        left: calc(50% - 40px);
        background: #bd8b1b;
    }
`;

export const TabWrap = styled.div`
    position: relative;
`;

export const NavTabList = styled.ul`
    display: flex;
    justify-content: center;
`;

export const NavTabItem = styled.li`
    padding: 10px 20px;
    border: 1px solid ${colors["actived-bottom"]};
    position: relative;
    display: inline-block;
    font-size: 18px;
    color: ${colors["actived-bottom"]};
    cursor: pointer;

    ${(p) =>
        p.actived
            ? css`
                  background: #bd8b1b;
                  color: #fff;
                  border: 1px solid #bd8b1b;
              `
            : null}
`;

export const TabContent = styled.div`
    position: relative;
    display: ${(p) => (p.actived ? "block" : "none")};
`;

export const ViewMoreLink = styled(Link)`
    background-color: ${colors["actived-bottom"]};
    transition: all 0.3s ease;
    padding: 5px 20px;
    border: 1px solid transparent;
    font-weight: 500;
    color: white;
    display: inline-block;
    margin: 0 auto;

    > svg {
        display: none;
    }
`;
