import styled, { css, keyframes } from "styled-components";
import { Button, Img, Link } from "@/components/UI";
import { screens, spacing, media } from "@/components/theme";
import { AbsCenterY } from "@/components/Css";

export const Wrapper = styled.header.attrs(() => ({
    id: "header",
}))`
    position: relative;
`;

const stuckMoveDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const color = "#E6BC67";

const NavItemHover = css`
    &:hover {
        color: ${color};
    }
`;

export const Main = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    z-index: 10;
    width: 100%;
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    color: white;
    background-color: transparent;
    transition: all 0.3s ease-out;

    ${({ sticky }) =>
        sticky &&
        css`
            position: fixed;
            animation: ${stuckMoveDown} 0.6s;
            box-shadow: 0 0 10px rgb(0 0 0 / 15%);
            background-color: #fff;
            color: #000;
        `}

    & .header_inner {
        position: relative;
        height: 100%;
        padding-inline: 15px;
        max-width: ${screens.xl};
        margin-inline: auto;

        display: flex;
        align-items: stretch;
        justify-content: center;

        ${media.lg(css`
            justify-content: space-between;
        `)}
    }
`;

export const Inner = styled.div`
    position: relative;
    height: 100%;
    padding-inline: 15px;
    max-width: ${screens.xl};
    margin-inline: auto;

    display: flex;
    align-items: stretch;
    justify-content: center;

    ${media.lg(css`
        justify-content: space-between;
    `)}
`;

export const LogoLink = styled(Link)`
    display: flex;
    padding: 5px 0;
    width: 150px;
    align-items: center;
`;

export const LogoImg = styled(Img)`
    display: block;
    height: 100%;
    object-fit: contain;
`;

export const NavList = styled.ul`
    display: none;
    text-transform: uppercase;
    font-weight: 600;

    > * + * {
        margin-left: ${spacing["4"]};
    }

    ${media.lg(css`
        display: flex;
        align-items: stretch;
    `)}
`;

export const NavItem = styled.li`
    display: flex !important;
    align-items: center;

    ${NavItemHover}
`;

export const NavItemLink = styled(Link)`
    display: flex !important;
    align-items: center;

    ${NavItemHover}
`;

export const NavItemButton = styled(Button)`
    ${NavItemHover}
`;

export const MenuWrap = styled.div`
    position: absolute;
    left: ${spacing["5"]};

    ${AbsCenterY}
    ${NavItemHover}
    
    ${media.lg(css`
        display: none;
    `)}
`;

const InvisiblePopover = css`
    opacity: 1;
    pointer-events: unset;
    left: 0;
`;

export const NavListChild = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    ${NavItemHover}
    > * + * {
        margin-left: ${spacing["1"]};
    }

    &:hover {
        .header-nav-popover {
            ${InvisiblePopover}
        }
    }
`;

export const NavChild = styled.ul`
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 100%;
    left: -999px;
    transition: opacity 0.3s ease-out;
    color: #000;
    min-width: 200px;
    background-color: #fff;
    padding: 8px 0;
    font-weight: 400;

    > * {
        padding: 8px 20px;
    }

    ${(p) => p.open && InvisiblePopover}
`;
