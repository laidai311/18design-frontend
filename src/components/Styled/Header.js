import styled, { css, keyframes } from "styled-components";
import { Button, Img, Link } from "@/components/UI";
import { screens, spacing, media } from "@/components/theme";
import { AbsCenterY } from "@/components/Css";

export const HeaderContainer = styled.header.attrs(() => ({
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

const HoverNavItem = css`
    &:hover {
        color: ${color};
    }
`;

export const HeaderMain = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    z-index: 10;
    width: 100%;
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    //color: white;
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
`;

export const HeaderInner = styled.div`
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

export const HeaderLogoLink = styled(Link)`
    display: block;
    padding: 5px 0;
    width: 150px;
`;

export const HeaderLogoImg = styled(Img)`
    display: block;
    height: 100%;
    object-fit: contain;
`;

export const HeaderNavWrapper = styled.div`
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

export const HeaderNavLink = styled(Link)`
    display: flex !important;
    align-items: center;

    ${HoverNavItem}
`;

export const HeaderNavLinks = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    ${HoverNavItem}
    > * + * {
        margin-left: ${spacing["1"]};
    }

    &:hover {
        .header-nav-popover {
            opacity: 1;
            pointer-events: auto;
        }
    }
`;

export const HeaderNavButton = styled(Button)`
    ${HoverNavItem}
`;

export const HeaderIconMenu = styled.div`
    position: absolute;
    left: ${spacing["5"]};

    ${AbsCenterY}
    ${HoverNavItem}
    
    ${media.lg(css`
        display: none;
    `)}
`;

export const HeaderNavPopover = styled.div`
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 100%;
    left: 0;
    transition: visibility 0.3s ease-out;
    color: #000;
    min-width: 190px;
    background-color: #fff;
    padding: 20px;

    > * + * {
        margin-top: ${spacing["1"]};
    }
`;
