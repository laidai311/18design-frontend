import styled, { css, keyframes } from "styled-components";
import { Form, Img } from "@/components/UI";
import { screens, spacing, media, colors } from "@/components/theme";
import Link from "next/link";
import { AbsCenterY } from "../Css";
import { IconHome } from "../Icons";
import { Container } from "./Core";

export const Wrapper = styled.footer`
    position: relative;
`;
export const Seasion = styled.section`
    background-color: #666;
`;
export const FooterBG = styled.div`
    position: absolute;
    inset: 0;
    background-image: url(./images/footer-bg.png);
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
`;
export const FooterBGOverlay = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
`;

export const Inner = styled.div`
    position: relative;
`;

export const Content = styled.div`
    color: white;
    display: flex;
    flex-direction: column;

    ${media.lg(css`
        flex-direction: row;
    `)}
`;

export const ContentItem = styled.div`
    flex: 1;
    padding: 30px 15px;

    h3 {
        margin-bottom: 20px;
    }
    h4 {
        margin-bottom: 16px;
    }

    ${(p) =>
        p.center
            ? css`
                  display: flex;
                  flex-flow: column;
                  align-items: center;
              `
            : null}
`;

export const FooterLogo = styled.div`
    padding: 20px;

    img {
        width: 180px;
    }
`;

export const FooterDescription = styled.p`
    text-align: center;
    margin-bottom: 20px;
    line-height: 1.5;
`;

export const FooterAdviceButton = styled.button`
    display: flex;
    align-items: center;
    padding: 13px 20px;
    background-color: ${colors["cta-bottom"]};
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3 ease-out;
    &:active {
        transform: scale(0.95);
    }

    > * + * {
        margin-left: 8px;
    }
`;

export const FooterContactWrap = styled.div`
    > * {
        display: flex;
        margin-bottom: 8px;

        > * + * {
            margin-left: 8px;
        }
    }

    a:hover {
        text-decoration: underline;
    }
`;

export const FooterBottom = styled.section`
    position: relative;
    padding-inline: ${spacing["4"]};
    background-color: black;
    color: white;
    padding: 12px 0;
    font-size: 14px;

    p {
        padding: 0 12px;
    }
`;
