import styled, { css, keyframes } from "styled-components";
import { media } from "../theme";

const circle = keyframes`
    0%{opacity:1}
    40%{opacity:1}
    100%{width:200%;height:200%;opacity:0}
`;

export const Card = styled.div`
    position: relative;
    border: thin solid #ddd;
    transition: all 0.3s ease-out;

    &:hover {
        box-shadow: 0px 0px 7px rgb(0 0 0 / 30%);
    }
    &:hover > .card-media::after {
        animation: ${circle} 0.75s;
    }
    &:hover img {
        transform: scale(1.1);
    }
`;
export const CardMedia = styled.div`
    position: relative;
    overflow: hidden;
    height: 250px;

    &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        display: block;
        content: "";
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 100%;
        transform: translate(-50%, -50%);
        opacity: 0;
        pointer-events: none;
    }

    * {
        width: 100%;
        height: 100%;
    }

    img {
        transition: filter 0.6s, opacity 0.6s, transform 0.6s, box-shadow 0.3s;
        object-fit: cover;
    }
`;
export const CardDescription = styled.div`
    padding: 15px;

    > * + * {
        margin-top: 8px;
    }

    h5 {
        font-size: 1rem;
        text-transform: uppercase;
    }
`;

export const Space = styled.div`
    ${(p) =>
        p.$center &&
        css`
            display: flex;
            align-items: center;
        `};

    > * + * {
        margin-left: ${(p) =>
            typeof p.size === "number" ? p.size + "px" : "8px"};
    }
`;

export const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;

    > * {
        padding: 12px;
        flex-basis: 100%;
        ${media.sm(css`
            flex-basis: calc(100% / 2);
        `)}
        ${media.lg(css`
            flex-basis: calc(100% / 3);
        `)}
    }
`;
