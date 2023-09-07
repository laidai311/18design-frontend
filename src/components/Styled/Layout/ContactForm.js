import styled, { css } from "styled-components";
import { colors, media } from "../../theme";

export const Modal = styled.div`
    position: fixed;
    inset: 0;
    z-index: 100;

    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    transition: all 0.3s ease-out;
    opacity: ${(p) => (p.open ? "1" : "0")};
    pointer-events: ${(p) => (p.open ? "all" : "none")};
`;
/* display: ${(p) => (p.open ? "flex" : "none")}; */

export const ModalOverlay = styled.div`
    position: absolute;
    inset: 0;
    background-color: ${colors.overlay};
    transition: all 0.3s ease-out;
    opacity: ${(p) => (p.open ? "1" : "0")};
    pointer-events: ${(p) => (p.open ? "all" : "none")};
`;
// display: ${(p) => (p.open ? "block" : "none")};

export const ModalContent = styled.div`
    position: relative;
    transition: all 0.15s ease-out;
    transform: ${(p) => (p.open ? "translateY(0px)" : "translateY(-100px)")};
    opacity: ${(p) => (p.open ? "1" : "0")};
`;

export const Wrapper = styled.div`
    position: relative;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 12px;
    padding: 24px;
    width: 100vw;
    overflow-y: auto;
    overscroll-behavior: contain;
    max-height: 100vh;

    ${media.md(css`
        width: auto;
    `)}
`;

export const Main = styled.div`
    display: flex;
    flex-flow: column;
    padding: 12px 0;
    width: 100%;
    height: 100%;

    ${media.md(css`
        min-width: 420px;
        height: auto;
        width: auto;
    `)}

    > * + * {
        margin-top: 18px;
    }

    h3,
    p {
        text-align: center;
    }

    p {
        font-weight: 600;
        font-size: 17px;
        margin-bottom: 12px;
    }

    button {
        padding: 12px 12px;
        color: white;
        text-transform: uppercase;
        font-size: 17px;
        font-weight: 600;
        border-radius: 8px;
        background: linear-gradient(
            90deg,
            rgba(189, 139, 27, 1) 6%,
            rgba(235, 206, 100, 1) 50%,
            rgba(189, 139, 27, 1) 100%
        );
    }

    input,
    select {
        border: thin solid #ccc;
        border-radius: 8px;
        padding: 12px 12px;
    }
`;

// đóng close
export const CloseWrap = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;

    button {
        padding: 5px;

        &:hover {
            background: #0000000d;
            border-radius: 99px;
        }
    }
`;
