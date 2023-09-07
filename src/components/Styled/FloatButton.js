import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { FlxCenter } from "../Css";
import { colors } from "../theme";

export const FloatLeft = styled.div`
    position: fixed;
    left: 20px;
    bottom: ${(p) => (typeof p.bottom === "number" ? p.bottom + "px" : 0)};
    z-index: 9;
`;
export const FloatRight = styled.div`
    position: fixed;
    right: 20px;
    bottom: ${(p) => (typeof p.bottom === "number" ? p.bottom + "px" : 0)};
    z-index: 9;
`;

export const FloatIcon = styled.span`
    ${FlxCenter}
    width: 40px;
    height: 40px;
    border-radius: 99px;
    background-color: ${colors["cta-bottom"]};
    color: white;
    position: relative;
`;

const pulseRing = keyframes`
  0% {
    transform: scale(.33);
  }
  80%, 100% {
    opacity: 0;
  }
`;

export const PulseRing = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 30px;
    height: 30px;

    &:before {
        content: "";
        position: relative;
        display: block;
        width: 300%;
        height: 300%;
        box-sizing: border-box;
        margin-left: -100%;
        margin-top: -100%;
        border-radius: 45px;
        background-color: ${colors["pulse-ring"]};
        animation: ${pulseRing} 1.25s cubic-bezier(0.215, 0.61, 0.355, 1)
            infinite;
    }
`;

export const FloatAdviceButton = styled.button`
    display: flex;
    align-items: center;
    padding: 13px 20px;
    background-color: ${colors["cta-bottom"]};
    border-radius: 8px 8px 0 0;
    font-weight: 600;
    font-size: 1rem;
    color: white;

    > * + * {
        margin-left: 8px;
    }
`;
