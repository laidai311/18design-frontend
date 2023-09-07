import styled, { css, keyframes } from "styled-components";
import { Form, Img } from "@/components/UI";
import { screens, spacing, media, colors } from "@/components/theme";
import Link from "next/link";
import { AbsCenterY } from "../../Css";
import { IconHome } from "../../Icons";

export const Wrapper = styled.header`
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

export const Main = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    z-index: 10;
    width: 100%;
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    transition: all 0.3s ease-out;
    background-color: white;
    ${media.lg(css`
        background-color: transparent;
    `)}
    ${(p) =>
        p.$sticky &&
        css`
            position: fixed;
            animation: ${stuckMoveDown} 0.6s;
            box-shadow: 0 0 10px rgb(0 0 0 / 15%);
            background-color: white !important;
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
    padding-inline: ${spacing["4"]};
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
// Navigation
export const Nav = styled.nav`
    height: ${spacing.full};
    width: 100%;
    padding: 30px 0;
    text-transform: uppercase;
    font-weight: 400;
    line-height: 1.5;

    ${media.lg(css`
        font-weight: 600;
        padding: 0;
    `)}
`;
//list
export const NavList = styled.ul`
    height: ${spacing.full};
    width: ${spacing.full};

    > * + * {
        border-top: thin solid #ececec;
    }

    ${media.lg(css`
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        > *:not(:last-child) {
            margin-right: ${spacing["2.5"]};
        }
        > *:not(:first-child) {
            margin-left: ${spacing["2.5"]};
        }

        > * + * {
            border-top: unset;
        }
    `)}
`;

const navItemHover = css`
    &:hover {
        background-color: #0000000d;
    }
    ${media.lg(css`
        &:hover {
            color: ${colors.primary};
            background-color: unset;
        }
    `)}
`;

const invisible = css`
    display: none;
    ${media.lg(css`
        display: block;
        opacity: 0;
        pointer-events: none;
        left: 9999px;
    `)}
`;

const visible = css`
    display: block;
    background-color: #0000000d;
    ${media.lg(css`
        opacity: 1;
        pointer-events: unset;
        left: 0;
        background-color: white;
    `)}
`;
// item
export const NavItem = styled.li`
    position: relative;
    ${navItemHover}
    > *:first-child {
        height: ${spacing.full};
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 15px 20px;
        ${media.lg(css`
            padding: ${spacing["2.5"]} 0;
        `)}
    }
    ul {
        ${(p) => (p.$open ? visible : invisible)}
    }
    ${media.lg(css`
        &:hover > ul {
            ${visible}
        }
    `)}
`;

export const NavItemWrap = styled.label`
    width: 100%;
    display: flex;
    justify-content: space-between;
    ${media.lg(css`
        justify-content: flex-start;
    `)}
    > * + * {
        margin-left: ${spacing["1"]};
    }
`;

export const NavItemLink = styled(Link)``;

export const NavItemButton = styled.button``;

export const NavSearchButton = styled.button`
    display: none !important;
    ${media.lg(css`
        display: flex !important;
    `)}
`;
// children
export const NavChildList = styled.ul`
    ${media.lg(css`
        min-width: ${spacing["64"]}; // width
        position: absolute;
        left: 0;
        top: ${spacing.full};
        color: initial;
        background-color: ${colors.white};
        padding: ${spacing["1.5"]} 0;
        font-weight: 400;
        font-size: 14px;
        transition: opacity 0.3s ease-out;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
        border-bottom-left-radius: ${spacing["2"]};
        border-bottom-right-radius: ${spacing["2"]};
        ${(p) =>
            !p.$sticky &&
            css`
                border-top-left-radius: ${spacing["2"]};
                border-top-right-radius: ${spacing["2"]};
            `}
    `)}
`;

export const NavChildItem = styled.li`
    text-transform: capitalize;
    font-weight: 400;
    padding-left: 20px;

    ${navItemHover}
    > *:first-child {
        height: ${spacing.full};
        display: flex;
        align-items: center;
        padding: ${spacing["2"]} ${spacing["4"]};
        cursor: pointer;
    }
    ${media.lg(css`
        padding-left: 0;
        text-transform: inherit;
    `)}
`;

export const NavIconHome = styled(IconHome)`
    vertical-align: text-bottom;
    display: none;
    ${media.lg(css`
        display: block;
    `)}
`;
export const NavTextHome = styled.span`
    ${media.lg(css`
        display: none;
    `)}
`;
// end navigation
// mở
export const OpenMenuWrap = styled.div`
    position: absolute;
    left: ${spacing["5"]};
    color: ${(p) =>
        "$sticky" in p
            ? p.$sticky
                ? colors["text-header-sticky"]
                : colors["text-header-top"]
            : "inherit"};

    ${AbsCenterY}
    ${navItemHover}

    ${media.lg(css`
        display: none;
    `)}
`;
// đóng close
export const CloseMenuWrap = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;

    ${media.lg(css`
        display: none;
    `)}

    button {
        padding: 5px;
        color: #ffffff99;

        &:hover {
            background: #0000000d;
            border-radius: 99px;
        }
    }
`;
// Draw
export const Drawer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: ${(p) => (p.$open ? 0 : "-280px")};
    width: 280px;
    transition: left 0.15s ease-out;
    z-index: 100;
    overflow-y: auto;
    background-color: ${colors["bg-sidebar"]};
    color: ${colors["text-sidebar"]};

    ${media.md(css`
        color: #666666d9;
        background-color: #ffffff;
    `)}
    ${media.lg(css`
        position: relative;
        width: unset;
        left: 0;
        bottom: unset;
        background-color: transparent;
        color: ${(p) =>
            "$sticky" in p
                ? p.$sticky
                    ? colors["text-header-sticky"]
                    : p.$transparent
                    ? colors["text-header-top"]
                    : colors["text-header-sticky"]
                : "inherit"};
        overflow-y: unset;
    `)}
`;
// bóng mờ - overlay
export const DrawerOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 99;
    display: ${(p) => (p.$open ? "block" : "none")};
    background-color: ${colors.overlay};

    ${media.lg(css`
        display: none;
    `)}
`;
// wrap search
export const SearchWrap = styled.div`
    max-width: ${screens.xl};
    margin-inline: auto;
    ${media.lg(css`
        display: ${(p) => (p.$open ? "flex" : "none")};
        justify-content: flex-end;
    `)}
`;
export const SearchForm = styled(Form)`
    border-top: thin solid #ccc;
    background-color: white;
    padding: ${spacing[3]} ${spacing[5]};
    display: flex;
    align-items: center;
    ${media.lg(css`
        padding: 0;
        border-radius: 8px;
        background-color: transparent;
    `)}
`;
export const SearchInput = styled.input`
    padding: 5px 8px;
    border: thin solid #ccc;
    width: 100%;
    height: 39px;
    border-radius: 8px 0 0 8px;
    background-color: white;
`;
export const SearchButton = styled.button`
    padding: 0px 11px;
    border-left: none;
    height: 39px;
    border-radius: 0 8px 8px 0;
    background-color: #333;
    color: white;
`;

export const NavItemInput = styled.input.attrs(() => ({
    type: "checkbox",
}))`
    display: none;
    ${media.maxlg(css`
        &:checked + ul {
            ${visible}
        }
    `)}
`;
